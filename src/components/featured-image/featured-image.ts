import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { Device } from '@ionic-native/device';
import { FileChooser } from "@ionic-native/file-chooser";
import { IOSFilePicker } from '@ionic-native/file-picker';
import { ActionSheetController, Platform, normalizeURL, ModalController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { CroppingPageModal } from '../../modals/cropping-page-modal/cropping-page-modal';

declare var DocumentPickerSwift: any;
/**
 * Generated class for the FeaturedImageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'featured-image',
  templateUrl: 'featured-image.html'
})
export class FeaturedImageComponent {

  @Output() featurefile = new EventEmitter<any>();
  file:any = {
    isImage: false,
    filename: "",
    path: 'assets/images/space-default.png',
    icon: "image"
  };
  isFeaturedImage: boolean = true;

  constructor(
    public camera: Camera,
    private mediaCapture: MediaCapture,
    private actionSheetCtrl: ActionSheetController,
    public device: Device,
    public platform: Platform,
    public fileChooser: FileChooser,
    private filePicker: IOSFilePicker, 
    private DomSanitizer: DomSanitizer,
    public modalCtrl: ModalController,
  ) {
  }

  mynormalizeURL(src){
    return normalizeURL(src);
  }

  @Input()
  set entity(entity: any) {
    if(entity.url != undefined)
      this.file.path = entity.url;
  }

  returnFiles(){
    this.featurefile.emit(this.file);
  }

  showUpload(){
    this.isFeaturedImage = !this.isFeaturedImage;
  }

  openGallery() {
    let self = this;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      targetHeight: 1000,
      targetWidth: 1000
    }

    if (this.platform.is('android')) {
      options.destinationType = this.camera.DestinationType.NATIVE_URI
    }

    this.camera.getPicture(options).then(imageURI => {
      let modal = this.modalCtrl.create(CroppingPageModal, {imageuri: this.mynormalizeURL(imageURI)});
      modal.present();
      modal.onDidDismiss((data) =>{
        if(data == undefined){
          let temp = imageURI.split("?");
          if (temp.length && temp.length > 1) {
            temp.pop();
          }
          imageURI = temp.join("?");
          imageURI.replace(/unsafe:/i, '');
          temp = {
            isImage: false,
            isCrop: false,
            filename: "",
            path: imageURI,
            icon: "image"
          }
          let array = imageURI.split("/");
          temp.filename = array[array.length - 1];
          self.file = temp;
          this.featurefile.emit(this.file);     
        } else{          
          let temp = {
            isImage: false,
            isCrop: true,
            filename: "",
            path: data.url,
            icon: "image"
          }
          temp.filename = "";
          self.file = temp;
          this.featurefile.emit(this.file);     
        }
        
      });

    }, error => {
      console.log(error);
    })
  }

  captureImage() {
    let self = this;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then(imageURI => {

      let modal = this.modalCtrl.create(CroppingPageModal, {imageuri: this.mynormalizeURL(imageURI)});
      modal.present();
      modal.onDidDismiss((data) =>{
        if(data == undefined){
          let temp = {
            isImage: false,
            filename: "",
            isCrop: false,
            path: imageURI,
            icon: "image"
          }
    
          let array = imageURI.split("/");
          temp.filename = array[array.length - 1];
          self.file = temp;
          this.featurefile.emit(this.file);    
        } else {
          let temp = {
            isImage: false,
            isCrop: true,
            filename: "",
            path: data.url,
            icon: "image"
          }
          temp.filename = "";
          self.file = temp;
          this.featurefile.emit(this.file);     
        }
      });
      
    }, error => {
      console.log(error);
    })
  }

  captureVideo() {
    this.mediaCapture.captureVideo({ limit: 1 })
      .then(
        (data: MediaFile[]) => {
          console.log(data);
          let temp = {
            isImage: false,
            filename: data[0].name,
            path: data[0].fullPath,
            icon: "videocam"
          }
          this.file = temp;
          this.featurefile.emit(this.file);
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
            let temp = {
              isImage: false,
              filename: "",
              path: uri,
              icon: "document"
            }
      
            let array = uri.split("/");
            temp.filename = array[array.length - 1];
            this.file = temp;
            this.featurefile.emit(this.file);
          })
          .catch(err => console.log('Error', err));
  }

  chooseFileAndroid() {
    this.fileChooser.open()
      .then((uri) => {
        let temp = {
          isImage: false,
          filename: "",
          path: uri,
          icon: "document"
        }
  
        let array = uri.split("/");
        temp.filename = array[array.length - 1];
        this.file = temp;
        this.featurefile.emit(this.file);
      })
      .catch(e => {
        console.log(e);
      })
  }

  presentActionSheet() {
    event.stopPropagation();
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Change type',
      buttons: [
        {
          text: 'Capture Image',
          handler: () => {
            this.captureImage();
          }
        },
        // {
        //   text: 'Capture Video',
        //   handler: () => {
        //     this.captureVideo();
        //   }
        // },
        {
          text: 'Open Gallery',
          handler: () => {
            this.openGallery();
          }
        },
        // {
        //   text: 'Choose File',
        //   handler: () => {
        //     this.chooseFile();
        //   }
        // },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
}
