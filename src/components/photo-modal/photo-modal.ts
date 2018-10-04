import { Component, ViewChild } from '@angular/core';
import { NavParams, ViewController, Slides, ToastController } from "ionic-angular";
import { Device } from '@ionic-native/device';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File, FileEntry, IFile } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { resolveDep } from '../../../node_modules/@angular/core/src/view/provider';
import { ContentProvider } from '../../providers/content';

@Component({
  selector: 'photo-modal',
  templateUrl: 'photo-modal.html'
})
export class PhotoModalComponent {

  @ViewChild(Slides) slides: Slides;

  ngAfterViewInit() {
    if(this.index && this.index > 0){
      setTimeout(() => {
        this.slides.slideTo(this.index, 0);
      }, 100);
    }
  }

  index: any = {};
  photos: any = {};
  dest: any;
  isIphoneX: boolean = false;  
  p_download: boolean = false;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public device: Device,    
    public platform: Platform,
    public translate: TranslateService,
    private transfer: FileTransfer,
    private file: File,
    private toastCtrl: ToastController,    
    private photoLibrary: PhotoLibrary,
    private contentProvier: ContentProvider
  ) {
    this.index = this.navParams.get('index');
    this.photos = this.navParams.get('photos');
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
    this.contentProvier.checkPermission({spaceId: this.photos[0].SpaceID, entitytype: 6})
    .subscribe(res => {
      console.log(res);
      if(!res.IsError) {
        this.p_download = res.ResponseData.Download
      }
    })
  }

  close(){
    this.viewCtrl.dismiss();
  }

  moveToGallery(dest: any) {
    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.saveImage(encodeURI(dest), "Communifire").then((entry=>{
        console.log('download complete: ' + entry.photoURL);
        // this.translate.get("EXTRA.GALLERYMOVED").subscribe(res => {
        //   this.presentToast(res);
        // });
      }),
      (error) => {
        // handle error
        console.log('err' + error);
        throw new Error(error);
      });
    })
    .catch(err => console.log('permissions weren\'t granted'));
  }

  isImage(contentDetail: any){
    if(!contentDetail){
      return false;
    }
    let extArr = ["jpg", "jpeg", "png", "svg", "ico"];
    let ext = contentDetail.ContentMediaUrl.split(".");
    ext = ext[ext.length - 1];
    for (let i = 0; i < extArr.length; ++i){
      if(ext.toLowerCase() === extArr[i].toLowerCase()){
        return true;
      }
    }
    return false;
  }

  download() {
    let p = [];
    for(let i = 0; i < this.photos.length; i++) {
      p.push(new Promise((resolve, reject) => {
        let contentDetail = this.photos[i];
        let fileTransfer: FileTransferObject = this.transfer.create();
        let domain = localStorage.getItem("community_url");
        let ext = contentDetail.ContentMediaUrl.split(".");
        let filename = contentDetail.ContentTitle.replace(/ /g,'') + "." + contentDetail.ContentMediaUrl.split(".")[ext.length - 1];
        if(this.platform.is("android")){
          this.dest = this.file.externalDataDirectory + '/Downloads/'+contentDetail.SpaceName+'/'+ filename;
        } else if(this.platform.is("ios")) {
          this.dest = this.file.documentsDirectory + '/Downloads/'+contentDetail.SpaceName+'/'+ filename;
        }
        let url = localStorage.getItem('community_url');
        let apiKey = localStorage.getItem('communifire_token');
        let options = {
          headers: {
            "Rest-Api-Key": apiKey        
          }
        }

        fileTransfer.download(encodeURI(contentDetail.ContentMediaUrl), this.dest, true, options).then((entry) => {
          console.log('download complete: ' + entry.toURL());
          if(this.isImage(contentDetail)) this.moveToGallery(this.dest);
          resolve();
        }, (error) => {
          this.translate.get("COMMONS.DOWNLOADERROR").subscribe(res => {
            this.presentToast(contentDetail.ContentTitle + ' ' + res);
          });
          reject();
        })
        .catch(err => {
          this.translate.get("COMMONS.DOWNLOADERROR").subscribe(res => {
            this.presentToast(contentDetail.ContentTitle + ' ' + res);
          });
          reject();
        });
      }))
    }

    this.translate.get("COMMONS.DOWNLOADSTART").subscribe(res => {
      this.presentToast(res);
    });
    Promise.all(p)
    .then(() => {
      this.translate.get("COMMONS.DOWNLOADED").subscribe(res => {
        this.presentToast(res);
      });
    })
  }

  private presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
