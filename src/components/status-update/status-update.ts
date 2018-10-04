import { Component, ViewChild, ElementRef } from '@angular/core';
import { ViewController, NavParams, LoadingController, ToastController, ActionSheetController, Platform } from 'ionic-angular';
import { ContentProvider } from '../../providers/content';
import { SpacesProvider } from '../../providers/spaces';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { Device } from '@ionic-native/device';
import { FileChooser } from "@ionic-native/file-chooser";
import { IOSFilePicker } from '@ionic-native/file-picker';
import { TranslateService } from '@ngx-translate/core';

declare var DocumentPickerSwift: any;

@Component({
  selector: 'status-update',
  templateUrl: 'status-update.html'
})

export class StatusUpdateComponent {

  public content: string;
  public spaceId: any;
  public toUser: any;
  public fileUpload: Array<any> = [];
  public currentFolder: any;
  public isText: boolean;
  public wallWasCreated: boolean = false;
  isIphoneX: boolean = false;
  hasPermission: boolean = true;
  hasPermissionShow: boolean = true;

  constructor(
    public viewCtrl: ViewController,
    public contentProvider: ContentProvider,
    public spacesProvider: SpacesProvider,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public camera: Camera,
    private mediaCapture: MediaCapture,
    private actionSheetCtrl: ActionSheetController,
    public device: Device,
    public platform: Platform,
    public fileChooser: FileChooser,
    private filePicker: IOSFilePicker, 
    public translate: TranslateService
  ) {
    this.spaceId = this.navParams.get('spaceId');
    this.toUser = this.navParams.get('toUser');
    this.isText = this.navParams.get('isText');
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
  }

  cancel() {
    this.viewCtrl.dismiss({ content: this.content, directory: this.currentFolder, files: this.fileUpload, created: this.wallWasCreated, wallId: this.wallId });
  }

  wallId: number;

  postStatus() {
    console.log();
    if (this.content === "" || this.content.match(/ |\n/g) && this.content.match(/ |\n/g).length === this.content.length) {
      let toast = this.toastCtrl.create({
        message: 'You must include a message to post',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      return 0;
    }
    const loading = this.loadingCtrl.create();
    loading.present();
    let spaceId = this.spaceId ? this.spaceId : null;
    let toUser = this.toUser ? this.toUser : null;
    this.contentProvider.createWallPost(toUser, spaceId, this.content).finally(() => {
      loading.dismiss()
    }).subscribe(res => {
      if (!res.IsError) {
        this.wallWasCreated = true;
        this.wallId = res.ResponseData;
        if(this.fileUpload.length > 0){
          this.translate.get('COMMONS.FILES_BEING_UPLOADED').subscribe((res: string) => {
            let toast = this.toastCtrl.create({
              message: res,
              duration: 3000
            });
            toast.present();
          });
          this.fileUpload.forEach(item => {
            this.spacesProvider.attachFileToWall(item, this.spaceId, this.currentFolder.DirectoryID, res.ResponseData);
          });
        }
        this.cancel();
      } else {
        console.log(res);
        const alert = this.toastCtrl.create({
          message: 'Error',
          duration: 3000,
          position: 'bottom' 
        });
        alert.present();
      }
    });
  }

  changeCurrent($event) {
    this.hasPermission = true;
    this.hasPermissionShow = false;
    this.currentFolder = $event;
  }

  openGallery() {
    let self = this;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.ALLMEDIA,
      saveToPhotoAlbum: false,
      targetHeight: 1000,
      targetWidth: 1000
    }

    if (this.platform.is('android')) {
      options.destinationType = this.camera.DestinationType.NATIVE_URI
    }

    this.camera.getPicture(options).then(imageURI => {
      let temp = imageURI.split("?");
      if (temp.length && temp.length > 1) {
        temp.pop();
      }
      imageURI = temp.join("?");
      console.log(imageURI);
      self.fileUpload.push(imageURI);

    }, error => {
      console.log(error);
    })
  }

  captureImage() {
    // this.mediaCapture.captureImage({ limit: 1 })
    // .then(
    //   (data: MediaFile[]) => {
    //     console.log(data);
    //     this.fileUpload.push(data[0]);
    //   },
    //   (err: CaptureError) => console.error(err)
    // );
    let self = this;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then(imageURI => {
      console.log(imageURI);
      self.fileUpload.push(imageURI);

    }, error => {
      console.log(error);
    })
  }

  captureVideo() {
    this.mediaCapture.captureVideo({ limit: 1 })
      .then(
        (data: MediaFile[]) => {
          console.log(data);
          this.fileUpload.push(data[0]);
        },
        (err: CaptureError) => console.error(err)
      );
  }

  chooseFile(){
    if(this.platform.is("ios")){
      this.chooseFileIos();
    } else if (this.platform.is("android")){
      this.chooseFileAndroid();
    }
  }

  chooseFileIos() {
    var utis = ["public.image", "public.data", "com.adobe.pdf"];
    this.filePicker.pickFile()
      .then(uri => {
        console.log(uri);
            console.log("successfully picked a file " + uri);
            this.fileUpload.push(uri);
          })
          .catch(err => console.log('Error', err));
        
      }

  chooseFileAndroid() {
    this.fileChooser.open()
      .then((uri) => {
        this.fileUpload.push(uri)
      })
      .catch(e => {
        console.log(e);
      })
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Change type',
      buttons: [
        {
          text: 'Capture image',
          handler: () => {
            this.captureImage()
          }
        },
        {
          text: 'Capture video',
          handler: () => {
            this.captureVideo()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    actionSheet.present();
  }

  @ViewChild('caseComment') myInput: ElementRef;
  resize() {
    var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

}
