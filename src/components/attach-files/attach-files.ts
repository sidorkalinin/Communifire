import { Component, EventEmitter, Output } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { Device } from '@ionic-native/device';
import { FileChooser } from "@ionic-native/file-chooser";
import { IOSFilePicker } from '@ionic-native/file-picker';
import { FilePath } from '@ionic-native/file-path';
import { ActionSheetController, Platform } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

declare var DocumentPickerSwift: any;

/**
 * Generated class for the AttachFilesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 **/
@Component({
  selector: 'attach-files',
  templateUrl: 'attach-files.html'
})
export class AttachFilesComponent {

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
    private filePicker: IOSFilePicker,
    private filePath: FilePath,
    private DomSanitizer: DomSanitizer
  ) {
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
      imageURI.replace(/unsafe:/i, '');
      temp = {
        isImage: false,
        filename: "",
        path: imageURI,
        icon: "image"
      }
      if(this.platform.is('android')){
        this.filePath.resolveNativePath(imageURI)
        .then(filePath => {
          let array = filePath.split("/");
          temp.filename = array[array.length - 1];
          this.filesArray.push(temp);
          this.files.emit(this.filesArray);
        })
        .catch(err => console.log(err));
      }else{
        let array = imageURI.split("/");
        temp.filename = array[array.length - 1];
        self.filesArray.push(temp);
        this.files.emit(this.filesArray);
      }
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
        isImage: false,
        filename: "",
        path: imageURI,
        icon: "image"
      }

      if(this.platform.is('android')){
        this.filePath.resolveNativePath(imageURI)
        .then(filePath => {
          let array = filePath.split("/");
          temp.filename = array[array.length - 1];
          this.filesArray.push(temp);
          this.files.emit(this.filesArray);
        })
        .catch(err => console.log(err));
      }else{
        let array = imageURI.split("/");
        temp.filename = array[array.length - 1];
        self.filesArray.push(temp);
        this.files.emit(this.filesArray);
      }
      
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
            this.filesArray.push(temp);
            this.files.emit(this.filesArray);
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
        
        this.filePath.resolveNativePath(uri)
        .then(filePath => {
          let array = filePath.split("/");
          temp.filename = array[array.length - 1];
          this.filesArray.push(temp);
          this.files.emit(this.filesArray);
        })
        .catch(err => console.log(err));        
      })
      .catch(e => {
        console.log(e);
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
    })    
  }

  removeAttachFile(path){
    for(var i = 0; i < this.filesArray.length; i++){
      if(this.filesArray[i].path == path){
        this.filesArray.splice(i , 1);
        this.filesArray.splice(i, 1);
        break;
      }
    }
    this.returnFiles();
  }
}
