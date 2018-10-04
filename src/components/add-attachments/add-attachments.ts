import { Component, EventEmitter, Output, Input, NgZone } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { Device } from '@ionic-native/device';
import { FileChooser } from "@ionic-native/file-chooser";
import { FilePath } from '@ionic-native/file-path';
import { ActionSheetController, Platform, normalizeURL } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { TranslateService } from '@ngx-translate/core';

//declare var DocumentPickerSwift: any;

@Component({
  selector: 'add-attachments',
  templateUrl: 'add-attachments.html'
})
export class AddAttachmentsComponent {

  @Input() isForum: boolean = false;
  @Output() files = new EventEmitter<any>();
  filesArray: any = [];


  constructor(
    private translate: TranslateService,
    public camera: Camera,
    private mediaCapture: MediaCapture,
    private actionSheetCtrl: ActionSheetController,
    public device: Device,
    public platform: Platform,
    public fileChooser: FileChooser,    
    private DomSanitizer: DomSanitizer,
    private zone: NgZone,
    private filePicker: IOSFilePicker,    
    private filePath: FilePath,
  ) {
  }

  mynormalizeURL(src){
    return normalizeURL(src);
  }

  returnFiles(){
    this.files.emit(this.filesArray);
  }

  openGallery() {
    let self = this;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      targetHeight: 1000,
      targetWidth: 1000
    }

    if (this.platform.is('android')) {
      options.destinationType = this.camera.DestinationType.NATIVE_URI
    }

    this.camera.getPicture(options).then(imageURI => {
      console.log(imageURI);
      let temp = imageURI.split("?");
      if (temp.length && temp.length > 1) {
        temp.pop();
      }
      imageURI = temp.join("?");
      imageURI.replace(/unsafe:/i, '');
      temp = {
        isImage: true,
        filename: "",
        path: imageURI,
        icon: "image"
      }
      let array = imageURI.split("/");
      temp.filename = array[array.length - 1];
      self.filesArray.push(temp);
      this.files.emit(this.filesArray);

    }, error => {
      console.log(error);
    })
  }

  openVideoGallery() {
    let self = this;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.VIDEO,
      saveToPhotoAlbum: false,
      targetHeight: 1000,
      targetWidth: 1000
    }

    if (this.platform.is('android')) {
      options.destinationType = this.camera.DestinationType.NATIVE_URI
    }

    this.camera.getPicture(options).then(imageURI => {
      console.log(imageURI);
      let temp = imageURI.split("?");
      if (temp.length && temp.length > 1) {
        temp.pop();
      }
      imageURI = temp.join("?");
      imageURI.replace(/unsafe:/i, '');
      temp = {
        isImage: false,
        filename: "",
        path: imageURI,
        icon: "videocam"
      }
      let array = imageURI.split("/");
      temp.filename = array[array.length - 1];
      temp.filename = temp.filename.split('.')[0] + '.mp4';
      self.filesArray.push(temp);
      this.files.emit(this.filesArray);

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

      let temp = {
        isImage: true,
        filename: "",
        path: imageURI,
        icon: "image"
      }

      let array = imageURI.split("/");
      temp.filename = array[array.length - 1];
      self.filesArray.push(temp);
      this.files.emit(this.filesArray);

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
            filename: data[0].name.split('.')[0] + '.mp4',
            path: data[0].fullPath,
            icon: "videocam"
          }
          this.filesArray.push(temp);
          this.files.emit(this.filesArray);
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
    this.filePicker.pickFile()
    .then(uri => {
      console.log(uri);
      this.zone.run(() => {
        let temp = {
          isImage: false,
          filename: "",
          path: uri,
          icon: "document"
        }
  
        let array = uri.split("/");
        temp.filename = array[array.length - 1];
        this.filesArray.push(temp);
        this.files.emit(this.filesArray);
      });
    })
    .catch(err => console.log('Error', err));
    
  }

  chooseFileAndroid() {
    this.fileChooser.open()
      .then((uri) => {
        this.filePath.resolveNativePath(uri)
        .then(filePath => {
          let temp = {
            isImage: false,
            filename: "",
            path: uri,
            icon: "document"
          }
    
          let array = filePath.split("/");
          let filename = array[array.length - 1];
          array = filename.split('%2F');
          if(array.length > 0){
            temp.filename = array[array.length - 1];
          } else {
            temp.filename = filename;
          }
          
          this.filesArray.push(temp);
          this.files.emit(this.filesArray);
        })
        .catch(err => console.log(err));        
      })
      .catch(e => {
      })
  }

  presentActionSheet() {
    this.translate.get(["COMPONENT.CHANGETYPE", "COMPONENT.CAPTUREIMAGE", "COMPONENT.CAPTUREVIDEO",
        "COMPONENT.IMAGEGALLERY", "COMPONENT.VIDEOGALLERY", "COMPONENT.CHOOSEFILE", "COMPONENT.CANCEL"]).subscribe((res) => {
      let actionSheet = this.actionSheetCtrl.create({
        title: res['COMPONENT.CHANGETYPE'],
        buttons: [
          {
            text: res['COMPONENT.CAPTUREIMAGE'],
            handler: () => {
              this.captureImage();
            }
          },
          {
            text: res['COMPONENT.CAPTUREVIDEO'],
            handler: () => {
              this.captureVideo();
            }
          },
          {
            text: res['COMPONENT.IMAGEGALLERY'],
            handler: () => {
              this.openGallery();
            }
          },
          {
            text: res['COMPONENT.VIDEOGALLERY'],
            handler: () => {
              this.openVideoGallery();
            }
          },
          {
            text: res['COMPONENT.CHOOSEFILE'],
            handler: () => {
              this.chooseFile();
            }
          },
          {
            text: res['COMPONENT.CANCEL'],
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    });
  }

  presentActionSheetSmall(){
    this.translate.get(["COMPONENT.CHANGETYPE", "COMPONENT.CAPTUREIMAGE", "COMPONENT.CAPTUREVIDEO", "COMPONENT.CANCEL"]).subscribe((res) => {
      let actionSheet = this.actionSheetCtrl.create({
        title: res['COMPONENT.CHANGETYPE'],
        buttons: [
          {
            text: res['COMPONENT.CAPTUREIMAGE'],
            handler: () => {
              this.captureImage();
            }
          },
          {
            text: res['COMPONENT.CAPTUREVIDEO'],
            handler: () => {
              this.captureVideo();
            }
          },
          {
            text: res['COMPONENT.CANCEL'],
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    })
  }

}
