import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, InfiniteScroll, Refresher, ToastController, normalizeURL, ActionSheetController, AlertController } from 'ionic-angular';
import { InvitePeopleModalComponent } from '../../../modals/invite-people-modal/invite-people-modal';
import { ContentProvider } from '../../../providers/content'
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { CommentModalComponent } from '../../../components/comment-modal/comment-modal';
import { SingleContentLikeComponent } from '../../../components/single-content-like/single-content-like';
import { TapticEngine } from '@ionic-native/taptic-engine'; 
import { Vibration } from '@ionic-native/vibration'; 
import { Platform } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { TranslateService } from '@ngx-translate/core';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File, FileEntry, IFile } from '@ionic-native/file';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileOpener } from '@ionic-native/file-opener';
import { FolderSelectModalComponent } from '../../../modals/folder-select-modal/folder-select';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@IonicPage({
  name: 'files',
  segment: 'files/:id'
})
@Component({
  selector: 'page-file-detail',
  templateUrl: 'file-detail.html',
})
export class FileDetailPage implements OnInit {

  private contentId = this.navParams.get('id');
  contentDetail;
  likesCount: any;
  isRefreshing: boolean = false;
  infiniteScroll: InfiniteScroll;
  communityUrl: string;
  icon:string =  'assets/images/jpg-2.png';
  isLoadingImage : boolean= false;
  p_downLoad: boolean = false;
  isPdf: boolean = false;
  pdfLink: SafeResourceUrl;

  @ViewChild (SingleContentLikeComponent) singleComponentLikeComponent: SingleContentLikeComponent;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private contentProvider: ContentProvider,
    public loadingCtrl: LoadingController,
    public taptic: TapticEngine,
    public iab: InAppBrowser,
    public vibration: Vibration,
    public platform: Platform,
    public translate: TranslateService,
    private appCenterAnalytics: AppCenterAnalytics,
    private transfer: FileTransfer,
    private file: File,
    private toastCtrl: ToastController,
    private zone: NgZone,
    private document: DocumentViewer,
    private fileOpener: FileOpener,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private photoLibrary: PhotoLibrary,
    private domSanitizer: DomSanitizer
  ) {
    this.communityUrl = localStorage.getItem("community_url");
  }

  vibrate(){
    if(this.platform.is("android")){
      this.vibration.vibrate(50);
    }
  }

  ngOnInit() {
    this.getUserByContentId();
    this.getComments();    
  }

  setCount($event){
    this.likesCount = $event;
  }

  adduser() {
    let modal = this.modalCtrl.create(InvitePeopleModalComponent);
    modal.present();
  }

  getUserByContentId() {
    this.translate.get("COMMONS.LOADING_FILE").subscribe(res => {
      let loading = this.loadingCtrl.create({
        content: res
      });
      loading.present();
  
      this.contentProvider.getContentByID(this.contentId)
      .finally(() => loading.dismiss())
      .subscribe(res => {
        this.zone.run(() => {
          this.contentDetail = res.ResponseData;
          console.log(this.contentDetail);
          if(this.isImage()) this.showImage(this.contentDetail.ContentMediaUrl);
          if(this.checkPdf()) {
            this.isPdf = true;
            let tmp = "http://docs.google.com/gview?url="; //http://remote.url.tld/path/to/document.doc&embedded=true
            tmp += localStorage.getItem("community_url") + '/' + this.contentDetail.ContentMediaUrl + '&embedded=true';
            // console.log(tmp);
            this.pdfLink = this.domSanitizer.bypassSecurityTrustResourceUrl(tmp);
          }
          this.contentProvider.checkPermission({
            entitytype: 14,
            spaceid: this.contentDetail.SpaceID,
          })
          .finally(()=>{
          })
          .subscribe(res =>{
            this.p_downLoad = res.ResponseData.Download;
          })
        });
        
        this.appCenterAnalytics.isEnabled().then( (b) => {
          if(b){
            this.appCenterAnalytics.trackEvent('File Detail Load.', { id: this.contentId, userid: localStorage.getItem('UserID') }).then(() => {
              console.log('File Detail Load Event tracked');
            });
          }
        })
      })
    });
  }

  dest = '';
  i_url = '';
  showImage(link) {
    let fileTransfer: FileTransferObject = this.transfer.create();
    let domain = localStorage.getItem("community_url");
    let tmp;
    console.log('showimage');
    if(this.platform.is("android")){
      tmp = this.file.externalDataDirectory + "/tmp/" + this.contentDetail.ContentTitle;
    } else if(this.platform.is("ios")) {
      tmp = this.file.documentsDirectory+  "/tmp/" + this.contentDetail.ContentTitle;
    }

    let url = localStorage.getItem('community_url');
    let apiKey = localStorage.getItem('communifire_token');
    let options = {
      headers: {
        "Rest-Api-Key": apiKey        
      }
    }
    this.isLoadingImage = true;
    fileTransfer.download(encodeURI(domain + link), tmp, true, options).then((entry) => {            
      this.zone.run(() => {
        this.i_url = normalizeURL(tmp);
        this.isLoadingImage = false;
      });
    }, (error) => {
    });    
  }

  moveToGallery(dest: any) {
    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.saveImage(dest, "Communifire").then((entry=>{
        console.log('download complete: ' + entry.photoURL);
        this.translate.get("EXTRA.GALLERYMOVED").subscribe(res => {
          this.presentToast(res);
        });
      }),
      (error) => {
        // handle error
        console.log('err' + error);
        throw new Error(error);
      });
    })
    .catch(err => console.log('permissions weren\'t granted'));
  }

  downloadFile(link){
    let fileTransfer: FileTransferObject = this.transfer.create();
    let domain = localStorage.getItem("community_url");
    
    if(this.platform.is("android")){
      this.dest = this.file.externalDataDirectory + '/Downloads/'+this.contentDetail.SpaceName+'/'+ this.contentDetail.ContentTitle;
    } else if(this.platform.is("ios")) {
      this.dest = this.file.documentsDirectory + '/Downloads/'+this.contentDetail.SpaceName+'/'+ this.contentDetail.ContentTitle;
    }
    
    this.translate.get("COMMONS.DOWNLOADSTART").subscribe(res => {
      this.presentToast(this.contentDetail.ContentTitle + ' ' + res);
    });

    let url = localStorage.getItem('community_url');
    let apiKey = localStorage.getItem('communifire_token');
    let options = {
      headers: {
        "Rest-Api-Key": apiKey        
      }
    }

    fileTransfer.download(encodeURI(domain + link), this.dest, true, options).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.translate.get("COMMONS.DOWNLOADED").subscribe(res => {
        this.presentToast(this.contentDetail.ContentTitle + ' ' + res);
      });
      if(this.isImage()) this.moveToGallery(this.dest);
      const options: DocumentViewerOptions = {
        title: this.contentDetail.ContentTitle
      }
      const onShow = () => {
        console.log('show');
      }
      const onClose = () => {
        console.log('close');
      }
      const onMissingApp = (appId, installer) => {
        this.translate.get("COMMONS.INSTALLWARNING").subscribe(res => {
          if(confirm("Do you want to install to Viewer App "
            + appId + " ?"))
          {
              installer();
          }
        });        
      }
      const onError = (err) => {
        console.log(err);
      }
      let m_type;
      this.file.resolveLocalFilesystemUrl(this.dest)
      .then((entry: FileEntry) => {
        return new Promise((resolve, reject) => {
          entry.file(meta => resolve(meta), error => reject(error));
        });
      })
      .then((meta: IFile) => {        
        m_type = meta.type; // This is a value compatible with the 'Content-Type' HTTP header
        console.log(m_type);
        this.fileOpener.open(this.dest, m_type)
        .then(() => console.log('File is opened'))
        .catch(e => console.log('Error opening file', e));
        // this.document.viewDocument(this.dest, m_type, options, onShow, onClose, onMissingApp, onError);
      })      
    }, (error) => {
      this.translate.get("COMMONS.DOWNLOADERROR").subscribe(res => {
        this.presentToast(this.contentDetail.ContentTitle + ' ' + res);
      });
    })
    .catch(err => {
      this.translate.get("COMMONS.DOWNLOADERROR").subscribe(res => {
        this.presentToast(this.contentDetail.ContentTitle + ' ' + res);
      });
    });
  }

  page: number = 0;
  comments: any = [];

  doRefresh(refresher?: Refresher){
    if(this.infiniteScroll){
      this.infiniteScroll.enable(true);
    }
    this.taptic.impact({ style: 'light' }); 
    this.vibrate();
    this.contentProvider.getContentByID(this.contentId)
    .finally(() => refresher.complete())
    .subscribe(res => {
      this.contentDetail = res.ResponseData;
      this.singleComponentLikeComponent.getLikeCount();
    })
    this.page = 1;
    this.comments = [];
    this.contentProvider.getContentComments(this.contentId, this.page)
      .subscribe(res => {
        this.handleComments(res);
      })
  }

  getComments(infiniteScroll?: InfiniteScroll){
    if(infiniteScroll){
      this.infiniteScroll = infiniteScroll;
    }
    if (this.comments.length == 0 && infiniteScroll){
      infiniteScroll.enable(false);
    }
    if (this.comments.length >= 0 && this.comments.length < 10 && infiniteScroll){
      infiniteScroll.enable(false);
    }
    this.page++;

    this.contentProvider.getContentComments(this.contentId, this.page)
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
      .do(response => {
        if (!response.ResponseData && infiniteScroll) {
          infiniteScroll.enable(false);
          this.page--; // Restore page back to the last correct page
        }
      })
      .subscribe(res => {
        this.handleComments(res);
        if (res.ResponseData && res.ResponseData.length < 10 && infiniteScroll){
          infiniteScroll.enable(false);
        }
      })
  }

  private handleComments(response) {
    if (response.ResponseData){
      this.comments = this.comments.concat(response.ResponseData);
      this.comments = this.contentProvider.getNestedChildren(this.comments, 0);
    }
  }

  getTitle(){
    return "TITLES.File";
  }

  openModal($event?) {
    let data = {
      entity: this.contentDetail,
    };
    if ($event){
      data['parentComment'] = $event;
    }
    let modal = this.modalCtrl.create(CommentModalComponent, data);
    modal.present();
    modal.onDidDismiss(data => {
      this.comments = data.comments;
      this.contentDetail.CommentCount += data.count;
    });
  }

  openMoveModal() {
    let data = {
      SpaceID: this.contentDetail.SpaceID,
    };
    console.log(data);
    let modal = this.modalCtrl.create(FolderSelectModalComponent, data);
    modal.present();
    modal.onDidDismiss(data => {
      if(data != undefined) {
        const saveloader = this.loadingCtrl.create({      
        });      
        saveloader.present();
        this.contentProvider.move(this.contentId, data.ID)
        .finally(()=>{
          saveloader.dismiss();
        })
        .subscribe((res)=>{
          if(res.IsError == false) {
            this.translate.get("EXTRA.MOVED").subscribe(res => {
              this.presentToast(res);
              this.navCtrl.pop();
            });
          } else {
            this.translate.get("EXTRA.MOVEFAILED").subscribe(res => {
              this.presentToast(res);
            });
          }
        })
      }
    });
  }

  isImage(){
    if(!this.contentDetail){
      return false;
    }
    let extArr = ["jpg", "jpeg", "png", "svg", "ico"];
    let ext = this.contentDetail.ContentTitle.split(".");
    ext = ext[ext.length - 1];
    for (let i = 0; i < extArr.length; ++i){
      if(ext.toLowerCase() === extArr[i].toLowerCase()){
        return true;
      }
    }
    return false;
  }
  
  checkPdf() {
    let ext = this.contentDetail.ContentTitle.split(".");
    ext = ext[ext.length - 1];
    if(ext.toLowerCase() === 'pdf') {
      return true;
    }
    return false;
  }

  deleteFile() {
    this.translate.get(["EXTRA.DELETEFILE", "EXTRA.AREYOUSURETODELETE", "COMPONENT.CANCEL", "TOAST.OK"]).subscribe((res) => {
      let alert = this.alertCtrl.create({
        title: res['EXTRA.DELETEFILE'],
        message: res['EXTRA.AREYOUSURETODELETE'],
        buttons: [
          {
            text: res['COMPONENT.CANCEL'],
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: res['TOAST.OK'],
            handler: () => {
              const saveloader = this.loadingCtrl.create({      
              });      
              saveloader.present();
              this.contentProvider.deleteFile(this.contentId)
              .finally(()=>{
                saveloader.dismiss();
              })
              .subscribe((res) => {
                if(res.IsError == false) {
                  this.translate.get("EXTRA.FILEDELETED").subscribe(res => {
                    this.presentToast(res);
                    this.navCtrl.pop();
                  });
                } else {
                  this.translate.get("EXTRA.FILEDELETEDFAILED").subscribe(res => {
                    this.presentToast(res);
                  });
                }
              })
            }
          },
        ]
      });
      alert.present();
    });
    
  }

  navToList(){
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();
    if(this.contentDetail.SpaceID === 0){
      this.navCtrl.push("file-list", {
        title: this.contentDetail.ReportedByUserName,
        UserID: this.contentDetail.UserID
      }, {
        direction: "back"
      });
    } else {
      this.navCtrl.push("file-list", {
        title: this.contentDetail.SpaceName,
        SpaceID: this.contentDetail.SpaceID
      }, {
        direction: "back"
      });
    }
    this.navCtrl.removeView(active);
    this.navCtrl.removeView(parent);
  }

  clickOption() {
    this.translate.get(["EXTRA.DOWNLOAD", "EXTRA.DELETE", "EXTRA.COMMENT", "EXTRA.MOVE", "COMPONENT.CANCEL"]).subscribe((res) => {
      let buttons = [];
      if(this.p_downLoad) {
        buttons.push({
          text: res['EXTRA.DOWNLOAD'],
          handler: () => {
            this.downloadFile(this.contentDetail.ContentMediaUrl);
          }
        })
      }
      buttons.push({
        text: res['EXTRA.COMMENT'],
        handler: () => {
          this.openModal();
        }
      })
      buttons.push({
        text: res['EXTRA.MOVE'],
        handler: () => {
          this.openMoveModal();
        }
      })
      buttons.push({
        text: res['EXTRA.DELETE'],
        handler: () => {
          this.deleteFile();
        }
      })
      buttons.push({
        text: res['COMPONENT.CANCEL'],
        role: 'cancel'
      })

      let actionSheet = this.actionSheetCtrl.create({
        title: this.contentDetail.ContentTitle,
        buttons: buttons
      });

      actionSheet.present();
    });
  }

  private presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  getIconName(name: any) {
    if(name == null) return;
    let ext = name.split(".");
    ext = ext[ext.length - 1];
    switch(ext.toLowerCase()) {
      case 'jpg':
        return 'jpg.png';
      case 'pdf':
        return 'pdf.jpg';
      case 'doc':
        return 'doc.png';
      case 'docx':
        return 'doc.jpg';
      case 'xsl':
        return 'xsl.jpg';
      case 'ppt':
        return 'ppt.png';
      default:
        return 'other.png';
    }    
  }
}
