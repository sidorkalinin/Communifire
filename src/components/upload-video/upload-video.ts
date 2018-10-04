import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { Device } from '@ionic-native/device';
import { FileChooser } from "@ionic-native/file-chooser";
import { IOSFilePicker } from '@ionic-native/file-picker';
import { ActionSheetController, Platform } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoEditor } from '@ionic-native/video-editor';

declare var DocumentPickerSwift: any;
/**
 * Generated class for the UploadVideoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'upload-video',
  templateUrl: 'upload-video.html'
})
export class UploadVideoComponent {

  @Output() featurefile = new EventEmitter<any>();
  file:any = {
    isImage: false,
    filename: "",
    path: 'assets/images/space-default.png',
    icon: "image"
  };
  thumburl: any;
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
    private videoEditor: VideoEditor
  ) {
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
      mediaType: this.camera.MediaType.VIDEO,
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
      let array = imageURI.split("/");
      temp.filename = array[array.length - 1].split('.')[0] + '.mp4';
      self.file = temp;
      this.featurefile.emit(this.file);

      this.createThumb(imageURI);

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

      let array = imageURI.split("/");
      temp.filename = array[array.length - 1];
      self.file = temp;
      this.featurefile.emit(this.file);
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
          this.file = temp;
          this.featurefile.emit(this.file);

          this.createThumb(data[0].fullPath);
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
            temp.filename = array[array.length - 1].split('.')[0] + '.mp4';
            this.file = temp;
            this.featurefile.emit(this.file);

            this.createThumb(uri);
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
        temp.filename = array[array.length - 1].split('.')[0] + '.mp4';
        this.file = temp;
        this.featurefile.emit(this.file);

        this.createThumb(uri);
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
          text: 'Capture Video',
          handler: () => {
            this.captureVideo();
          }
        },
        {
          text: 'Open Gallery',
          handler: () => {
            this.openGallery();
          }
        },
        {
          text: 'Choose File',
          handler: () => {
            this.chooseFile();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  createThumb(path){
    // this.videoEditor.getVideoInfo({fileUri: path}).then((data)=>{
    //   console.log(data);
    // })
    this.videoEditor.createThumbnail(      
      {
          fileUri: path, // the path to the video on the device
          outputFileName: Math.random().toString(), // the file name for the JPEG image
          atTime: 2, // optional, location in the video to create the thumbnail (in seconds)
          //width: 480, // optional, width of the thumbnail
          //height: 320, // optional, height of the thumbnail
          quality: 100 // optional, quality of the thumbnail (between 1 and 100)
      }
    ).then((data)=>{      
      this.thumburl = data;
    });
  }

  createThumbnailSuccess(result) {
    // result is the path to the jpeg image on the device
    console.log('createThumbnailSuccess, result: ' + result);
  }

  createThumbnailError(result) {
    // result is the path to the jpeg image on the device
    console.log('createThumbnailSuccess, result: ' + result);
  }
}
