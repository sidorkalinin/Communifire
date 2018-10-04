import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Refresher, ActionSheetController, AlertController, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { ContentProvider } from '../../../providers/content';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { TapticEngine } from '@ionic-native/taptic-engine'; 
import { Vibration } from '@ionic-native/vibration'; 
import { Platform } from 'ionic-angular';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError } from '@ionic-native/media-capture';
import { FileChooser } from '@ionic-native/file-chooser';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { Device } from '@ionic-native/device';
import { File, FileEntry, IFile } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { CommentModalComponent } from '../../../components/comment-modal/comment-modal';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FolderSelectModalComponent } from '../../../modals/folder-select-modal/folder-select';
import { PhotoLibrary } from '@ionic-native/photo-library';
@IonicPage({
  name: 'file-list',
  segment: 'file-list/:id'
})
@Component({
  selector: 'page-file-list',
  templateUrl: 'file-list.html',
})
export class FileListPage {
  title: string = this.navParams.get('title');
  subTitle: string = this.navParams.get('subTitle');
  entityType: number = 14;
  userId: number = Number(localStorage.getItem('UserID'));
  spaceId: number = this.navParams.get('SpaceID')?this.navParams.get('SpaceID'): localStorage.getItem('SpaceID');
  parentId: number = this.navParams.get('ParentID')?this.navParams.get('ParentID'): 0;
  profile: any = this.navParams.get('profile');
  searchfilter: string = "";
  page: number = 0;
  isLoadingFolders: boolean = false;
  isLoadingFiles: boolean = false;
  files: any = [];
  folders: any = [];
  infinteScroll: InfiniteScroll;
  p_downLoad: boolean = false;
  p_directory: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public content: ContentProvider,
    public taptic: TapticEngine,
    public vibration: Vibration,
    public platform: Platform,
    private appCenterAnalytics: AppCenterAnalytics,
    private translate: TranslateService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public camera: Camera,
    private mediaCapture: MediaCapture,
    public fileChooser: FileChooser,    
    private filePicker: IOSFilePicker,
    public device: Device,
    public modalCtrl: ModalController,
    private transfer: FileTransfer,
    private file: File,
    private filePath: FilePath,
    private photoLibrary: PhotoLibrary
  ) {
    this.appCenterAnalytics.isEnabled().then( (b) => {
      if(b){
        this.appCenterAnalytics.trackEvent('File List Load Event.', { spaceId: this.spaceId.toString(), userid: localStorage.getItem('UserID') }).then(() => {
          console.log('File List Load Event tracked');
        });
      }
    })
  }

  vibrate(){
    if(this.platform.is("android")){
      this.vibration.vibrate(50);
    }
  }

  isImage(name: any){
    let extArr = ["jpg", "jpeg", "png", "svg", "ico"];
    let ext = name.split(".");
    ext = ext[ext.length - 1];
    for (let i = 0; i < extArr.length; ++i){
      if(ext.toLowerCase() === extArr[i].toLowerCase()){
        return true;
      }
    }
    return false;
  }

  ionViewWillEnter() {
    
  }

  ionViewDidLoad() {
    this.files = [];
    this.folders = [];
    let options = {
      EntityType: this.entityType,
    }    
    options['parentid'] = this.parentId;
    if (this.spaceId) {
      options['spaceid'] = this.spaceId;
    }
    this.isLoadingFolders = true;
    this.isLoadingFiles = true;
    new Promise((resolve, reject) => {
      if(this.parentId == 0) {
        this.content.getDirectories(options)      
        .subscribe(response => {        
          resolve(response.ResponseData[0].DirectoryID)
        }, err => {
          reject(err);
        });
      } else {
        resolve(this.parentId);
      }      
    }).then((parentid: any) => {
      this.parentId = parentid;
      let options1 = options;
      options1['parentid'] = parentid;
      this.content.getDirectories(options1)
      .finally(() => {
        this.isLoadingFolders = false;        
      })
      .subscribe(response => {
        console.log(response);
        for(var i = 0; i < response.ResponseData.length; i++) {
          this.folders.push({
            title: response.ResponseData[i].DirectoryName,
            ID: response.ResponseData[i].DirectoryID
          })
        }
      })
      this.content.getFiles(options1)
      .finally(() => {
        this.isLoadingFiles = false;
      })
      .subscribe(response => {
        console.log(response.ResponseData);
        for(var i = 0; i < response.ResponseData.length; i++) {
          this.files.push({
            title: response.ResponseData[i].ContentTitle,
            ID: response.ResponseData[i].ContentID,
            type: response.ResponseData[i].EntityType,
            icon: 'assets/icon/'+this.getIconName(response.ResponseData[i].ContentTitle)
          })
        }
      })
    })

    this.checkPermission();
  }
  doRefresh(refresher?: Refresher){
    this.searchfilter = "";
    this.files = [];
    this.folders = [];
    this.vibrate();
    if (refresher) {
      refresher.complete();
    }
    let options = {
      EntityType: this.entityType,
    }    
    options['parentid'] = this.parentId;
    if (this.spaceId) {
      options['spaceid'] = this.spaceId;
    }
    this.isLoadingFolders = true;
    this.isLoadingFiles = true;
    new Promise((resolve, reject) => {
      if(this.parentId == 0) {
        this.content.getDirectories(options)      
        .subscribe(response => {        
          resolve(response.ResponseData[0].DirectoryID)
        }, err => {
          reject(err);
        });
      } else {
        resolve(this.parentId);
      }      
    }).then((parentid) => {
      let options1 = options;
      options1['parentid'] = parentid;      
      this.content.getDirectories(options1)
      .finally(() => {
        this.isLoadingFolders = false;        
      })
      .subscribe(response => {
        for(var i = 0; i < response.ResponseData.length; i++) {
          this.folders.push({
            title: response.ResponseData[i].DirectoryName,
            ID: response.ResponseData[i].DirectoryID
          })
        }
      })

      this.content.getFiles(options1)
      .finally(() => {
        this.isLoadingFiles = false;        
      })
      .subscribe(response => {
        for(var i = 0; i < response.ResponseData.length; i++) {
          this.files.push({
            title: response.ResponseData[i].ContentTitle,
            ID: response.ResponseData[i].ContentID,
            type: response.ResponseData[i].EntityType,
            icon: 'assets/icon/'+this.getIconName(response.ResponseData[i].ContentTitle)
          })
        }
      })      
    })
  }

  isLoadingSearch: boolean = false;
  doInfinite(infiniteScroll?: InfiniteScroll) {
    if(this.searchfilter.length === 0){
      this.files = [];
      this.folders = [];
      this.doRefresh();
      return 0;
    }
    if(infiniteScroll){
      this.infinteScroll = infiniteScroll;
    } else {
      this.page = 0;
      this.files = [];
    }
    if (this.files.length != 0 && this.files.length < 10){
      infiniteScroll.enable(false);
      return 0;
    }
    ++this.page;

    if (!infiniteScroll) {
      this.isLoadingSearch = true;
    }

    let options = {
      EntityType: this.entityType,
      page: this.page,
    }

    if (this.userId) {
      options['UserID'] = this.userId;
    }

    if (this.spaceId) {
      options['SpaceID'] = this.spaceId;
    }

    this.content.search(this.searchfilter, this.entityType, this.page, this.spaceId, this.userId)
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        } else {
          this.isLoadingSearch = false;
        }
      })
      .do((response: any) => {
        if (!response.ResponseData.length && infiniteScroll) {
          infiniteScroll.enable(false);
        }
      })
      .subscribe(response => {
        this.files = this.files.concat(response.ResponseData);
        if (infiniteScroll && response.ResponseData.length < 10){
          infiniteScroll.enable(false);
        }
      }, err => {
        if (infiniteScroll) {
          infiniteScroll.enable(false)
        }
      });

  }
  search(infiniteScroll?: InfiniteScroll){    
    if(this.searchfilter.length === 0){
      this.files = [];
      this.folders = [];
      this.doRefresh();
      return 0;
    }
    if(infiniteScroll){
      this.infinteScroll = infiniteScroll;
    } else {
      this.page = 0;
      this.folders = [];
      this.files = [];
    }
    if (this.files.length != 0 && this.files.length < 10){
      infiniteScroll.enable(false);
      return 0;
    }
    ++this.page;

    if (!infiniteScroll) {
      this.isLoadingSearch = true;
    }

    let options = {
      EntityType: this.entityType,
      page: this.page,
    }

    if (this.userId) {
      options['UserID'] = this.userId;
    }

    if (this.spaceId) {
      options['SpaceID'] = this.spaceId;
    }
    // File Search
    this.content.search(this.searchfilter, this.entityType, this.page, this.spaceId, this.userId, this.parentId)
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        } else {
          this.isLoadingSearch = false;
        }
      })
      .do((response: any) => {
        if (!response.ResponseData.length && infiniteScroll) {
          infiniteScroll.enable(false);
        }
      })
      .subscribe(response => {
        console.log(response);
        for(var i = 0; i < response.ResponseData.length; i++) {          
          this.files.push({
            ID: response.ResponseData[i].ContentID,
            title: response.ResponseData[i].Title,
            type: 14,
            icon: 'assets/icon/'+this.getIconName(response.ResponseData[i].Title)
          })
        }
        if (infiniteScroll && response.ResponseData.length < 10){
          infiniteScroll.enable(false);
        }
      }, err => {
        if (infiniteScroll) {
          infiniteScroll.enable(false)
        }
      });
    
    // Folder Search
    /*
    this.content.search(this.searchfilter, 40, this.page, this.spaceId, this.userId, this.parentId)
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        } else {
          this.isLoadingSearch = false;
        }
      })
      .do((response: any) => {
        if (!response.ResponseData.length && infiniteScroll) {
          infiniteScroll.enable(false);
        }
      })
      .subscribe(response => {
        console.log(response);
        for(var i = 0; i < response.ResponseData.length; i++) {          
          this.folders.push({
            title: response.ResponseData[i].Title,
            ID: response.ResponseData[i].ContentID
          })          
        }
        if (infiniteScroll && response.ResponseData.length < 10){
          infiniteScroll.enable(false);
        }
      }, err => {
        if (infiniteScroll) {
          infiniteScroll.enable(false)
        }
      });
      */
  }
  // GoTo folder
  gotoFolder(item: any) {
    this.navCtrl.push("file-list", {
      title: item.title,
      SpaceID: this.spaceId,
      ParentID: item.ID
    });
  }
  gotoFile(item: any) {
    this.navCtrl.push('files', {
      id: item.ID
    });
  }
  download(item: any) {    
  }
  createFolder() {
    this.translate.get(["EXTRA.CREATEFOLDER", "EXTRA.FOLDERNAME", "COMPONENT.CANCEL", "TOAST.OK"]).subscribe((res) => {
      let alert = this.alertCtrl.create({
        title: res['EXTRA.CREATEFOLDER'],
        inputs: [
          {
            name: 'folder',
            placeholder: res['EXTRA.FOLDERNAME']
          }
        ],
        buttons: [
          {
            text: res['COMPONENT.CANCEL'],
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: res['TOAST.OK'],
            handler: data => {
              let foldername = data.folder;

              const saveloader = this.loadingCtrl.create({      
              });      
              saveloader.present();

              this.content.createDirectory({
                ParentID: this.parentId,
                DirectoryName: foldername,
                SpaceID: this.spaceId
              })
              .finally(() => {
                saveloader.dismiss();
              })
              .subscribe(res => {
                if(res.IsError == false) {
                  this.folders.push({
                    title: foldername,
                    ID: res.ResponseData
                  })
                } else {
                  this.translate.get("EXTRA.FOLDERFAILED").subscribe(res => {
                    this.presentToast(res);
                  });
                }
              })
            }
          }
        ]
      });
      alert.present();
    });
  }

  newfile: any;

  uploadFile() {
    this.translate.get(["EXTRA.CONFIRMUPLOAD", "EXTRA.AREYOUSURE", "COMPONENT.CANCEL", "TOAST.OK"]).subscribe((res) => {
      let alert = this.alertCtrl.create({
        title: res['EXTRA.CONFIRMUPLOAD'],
        message: res['EXTRA.AREYOUSURE'],
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
              console.log(this.newfile);
              this.content.uploadFileToDirectory({
                fullPath: this.newfile.path,
                directoryID: this.parentId,
                spaceID: this.spaceId,
                name: this.newfile.filename
              }).then((res:any) => {
                saveloader.dismiss();
                console.log(res);
                if (JSON.parse(res.response).ResponseMessage == 'ToBePublished') {
                  this.translate.get("TOAST.PENDING").subscribe(res => {
                    this.presentToast(res);
                  });
                } else if(JSON.parse(res.response).IsError == false) {
                  this.files.push({
                    title: this.newfile.filename,
                    ID: JSON.parse(res.response).ResponseData,
                    type: 14,
                    icon: 'assets/icon/'+this.getIconName(this.newfile.filename)
                  })
                  this.translate.get("EXTRA.FILECREATESUCCESS").subscribe(res => {
                    this.presentToast(res);
                  });
                } else {
                  this.translate.get("EXTRA.FILECREATEFAILED").subscribe(res => {
                    this.presentToast(res);
                  });
                }
              })
            }
          }
        ]
      });
      alert.present();
    });        
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
      let temp = imageURI.split("?");
      if (temp.length && temp.length > 1) {
        temp.pop();
      }
      imageURI = temp.join("?");
      imageURI.replace(/unsafe:/i, '');
      temp = {
        filename: "",
        path: imageURI,
      }
      let array = imageURI.split("/");
      temp.filename = array[array.length - 1];
      this.newfile = temp;
      this.uploadFile();
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
        filename: "",
        path: imageURI,
      }
      let array = imageURI.split("/");
      temp.filename = array[array.length - 1];
      temp.filename = temp.filename.split('.')[0] + '.mp4';
      this.newfile = temp;
      this.uploadFile();
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
        filename: "",
        path: imageURI,
      }

      let array = imageURI.split("/");
      temp.filename = array[array.length - 1];
      this.newfile = temp;
      this.uploadFile();

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
            filename: data[0].name.split('.')[0] + '.mp4',
            path: data[0].fullPath,
          }
          this.newfile = temp;
          this.uploadFile();
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
      let temp = {
        filename: "",
        path: uri,
      }
      let array = uri.split("/");
      temp.filename = array[array.length - 1];
      this.newfile = temp;
      this.uploadFile();
    })
    .catch(err => console.log('Error', err));    
  }

  chooseFileAndroid() {
    this.fileChooser.open()
      .then((uri) => {
        this.filePath.resolveNativePath(uri)
        .then(filePath => {
          let temp = {
            filename: "",
            path: uri,
          }
    
          let array = filePath.split("/");
          let filename = array[array.length - 1];
          array = filename.split('%2F');
          if(array.length > 0){
            temp.filename = array[array.length - 1];
          } else {
            temp.filename = filename;
          }
          
          this.newfile = temp;
          this.uploadFile();
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

  checkPermission() {
    this.content.checkPermission({spaceid: this.spaceId, entitytype: 14, entityid: this.parentId})
    .finally(() => {
    })
    .subscribe(response => {
      if(!response.IsError) {
        this.p_directory = response.ResponseData.CreateDirectory
        console.log(this.p_directory)
      }
    })
  }

  addClick() {
    this.translate.get(["TITLES.FILES", "EXTRA.CREATEFOLDER", "EXTRA.UPLOADFILE", "COMPONENT.CANCEL"]).subscribe((res) => {
      let buttons = [];
      if(this.p_directory) {
        buttons.push({
          text: res['EXTRA.CREATEFOLDER'],
          handler: () => {
            this.createFolder();
          }
        })
      }
      buttons.push({
        text: res['EXTRA.UPLOADFILE'],
        handler: () => {
          this.presentActionSheet();
        }
      })
      buttons.push({
        text: res['COMPONENT.CANCEL'],
        role: 'cancel'
      })
      let actionSheet = this.actionSheetCtrl.create({
        title: res['TITLES.FILES'],
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

  getIconName(name: any) {
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

  downloadFile(item: any) {
    this.content.getContentByID(item.ID)
    .finally(()=>{})
    .subscribe(res => {
      let dest;
      let contentDetail = res.ResponseData;
      let fileTransfer: FileTransferObject = this.transfer.create();
      let domain = localStorage.getItem("community_url");
      let link = contentDetail.ContentMediaUrl;
      if(this.platform.is("android")){
        dest = this.file.externalDataDirectory + '/Downloads/'+contentDetail.SpaceName+'/'+ contentDetail.ContentTitle;
      } else if(this.platform.is("ios")) {
        dest = this.file.syncedDataDirectory + '/Downloads/'+contentDetail.SpaceName+'/'+ contentDetail.ContentTitle;
      }
      this.translate.get("COMMONS.DOWNLOADSTART").subscribe(res => {
        this.presentToast(contentDetail.ContentTitle + ' ' + res);
      });
      let url = localStorage.getItem('community_url');
      let apiKey = localStorage.getItem('communifire_token');
      let options = {
        headers: {
          "Rest-Api-Key": apiKey
        }
      }
      fileTransfer.download(encodeURI(domain + link), dest, true, options).then((entry) => {
        console.log('download complete: ' + entry.toURL());
        if(this.isImage(contentDetail.ContentTitle)) this.moveToGallery(dest);
        this.translate.get("COMMONS.DOWNLOADED").subscribe(res => {
          this.presentToast(contentDetail.ContentTitle + ' ' + res);
        });
      }, (error) => {
        this.translate.get("COMMONS.DOWNLOADERROR").subscribe(res => {
          this.presentToast(contentDetail.ContentTitle + ' ' + res);
        });
      })
      .catch(err => {
        this.translate.get("COMMONS.DOWNLOADERROR").subscribe(res => {
          this.presentToast(contentDetail.ContentTitle + ' ' + res);
        });
      });
    })
  }
  deleteFile(item: any) {
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
              this.content.deleteFile(item.ID)
              .finally(()=>{
                saveloader.dismiss();
              })
              .subscribe((res) => {
                if(res.IsError == false) {
                  this.translate.get("EXTRA.FILEDELETED").subscribe(res => {
                    this.presentToast(res);                    
                  });
                  this.files = this.files.filter(v => {
                    return v.ID != item.ID;
                  })
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
  moveFile(item: any) {
    let data = {
      SpaceID: this.spaceId,
    };
    let modal = this.modalCtrl.create(FolderSelectModalComponent, data);
    modal.present();
    modal.onDidDismiss(data => {
      if(data != undefined) {
        const saveloader = this.loadingCtrl.create({      
        });      
        saveloader.present();
        this.content.move(item.ID, data.ID)
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
  downloadFile2(contentDetail: any) {
    let fileTransfer: FileTransferObject = this.transfer.create();
    let domain = localStorage.getItem("community_url");
    let link = contentDetail.ContentMediaUrl;
    let dest;
    if(this.platform.is("android")){
      dest = this.file.externalDataDirectory + '/Downloads/'+contentDetail.SpaceName+'/'+ contentDetail.ContentTitle;
    } else if(this.platform.is("ios")) {
      dest = this.file.documentsDirectory + '/Downloads/'+contentDetail.SpaceName+'/' + contentDetail.ContentTitle;
    }
    this.translate.get("COMMONS.DOWNLOADSTART").subscribe(res => {
      this.presentToast(contentDetail.ContentTitle + ' ' + res);
    });
    let url = localStorage.getItem('community_url');
    let apiKey = localStorage.getItem('communifire_token');
    let options = {
      headers: {
        "Rest-Api-Key": apiKey        
      }
    }
    fileTransfer.download(encodeURI(domain + link), dest, true, options).then((entry) => {
      if(this.isImage(contentDetail.ContentTitle)) this.moveToGallery(dest);
      console.log('download complete: ' + entry.toURL());
      this.translate.get("COMMONS.DOWNLOADED").subscribe(res => {
        this.presentToast(contentDetail.ContentTitle + ' ' + res);
      });        
    }, (error) => {
      this.translate.get("COMMONS.DOWNLOADERROR").subscribe(res => {
        this.presentToast(contentDetail.ContentTitle + ' ' + res);
      });
    })
    .catch(err => {
      this.translate.get("COMMONS.DOWNLOADERROR").subscribe(res => {
        this.presentToast(contentDetail.ContentTitle + ' ' + res);
      });
    });
  }

  downloadFile_promise(contentDetail: any) {
    return new Promise((resolve, reject) => {
      let fileTransfer: FileTransferObject = this.transfer.create();
      let domain = localStorage.getItem("community_url");
      let link = contentDetail.ContentMediaUrl;
      let dest;
      if(this.platform.is("android")){
        dest = this.file.externalDataDirectory + '/Downloads/'+contentDetail.SpaceName+'/'+ contentDetail.ContentTitle;
      } else if(this.platform.is("ios")) {
        dest = this.file.documentsDirectory + '/Downloads/'+contentDetail.SpaceName+'/' + contentDetail.ContentTitle;
      }
      let url = localStorage.getItem('community_url');
      let apiKey = localStorage.getItem('communifire_token');
      let options = {
        headers: {
          "Rest-Api-Key": apiKey        
        }
      }
      fileTransfer.download(encodeURI(domain + link), dest, true, options).then((entry) => {
        if(this.isImage(contentDetail.ContentTitle)) this.moveToGallery(dest);
        // console.log('download complete: ' + entry.toURL());
        resolve();
        // this.translate.get("COMMONS.DOWNLOADED").subscribe(res => {
        //   this.presentToast(contentDetail.ContentTitle + ' ' + res);
        // });        
      }, (error) => {
        reject(error);
        // this.translate.get("COMMONS.DOWNLOADERROR").subscribe(res => {
        //   this.presentToast(contentDetail.ContentTitle + ' ' + res);
        // });
      })
      .catch(err => {
        reject(err);
        // this.translate.get("COMMONS.DOWNLOADERROR").subscribe(res => {
        //   this.presentToast(contentDetail.ContentTitle + ' ' + res);
        // });
      });
    })    
  }

  downloadFolder(item: any) {
    let options = {
      'parentid': item.ID
    };
    this.content.getFiles(options)
    .finally(() => {      
    })
    .subscribe(response => {
      console.log(response);
      var promise_all = [];
      for(var i = 0; i < response.ResponseData.length; i++) {
        promise_all.push(this.downloadFile_promise(response.ResponseData[i]));
      }
      this.translate.get("EXTRA.DOWNLOADSTART").subscribe(res => {
        this.presentToast(res);
      });
      Promise.all(promise_all)
      .then(() => {
        this.translate.get("EXTRA.DOWNLOADED").subscribe(res => {
          this.presentToast(res);
        });
      })
      .catch(err => {
        console.log(err);
      })
    })
  }

  deleteFolder(item: any) {
    this.translate.get(["EXTRA.DELETEDIRECTORY", "EXTRA.AREYOUSURETODELETE", "COMPONENT.CANCEL", "TOAST.OK"]).subscribe((res) => {
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
              this.content.removeDirectory(item.ID)
              .finally(()=>{
                saveloader.dismiss();
              })
              .subscribe((res) => {
                if(res.IsError == false) {
                  this.translate.get("EXTRA.FOLDERDELETED").subscribe(res => {
                    this.presentToast(res);                    
                  });
                  this.folders = this.folders.filter(v => {
                    return v.ID != item.ID;
                  })
                } else {
                  this.translate.get("EXTRA.FOLDERDELETEDFAILED").subscribe(res => {
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
  moveFolder(item: any) {
    let data = {
      SpaceID: this.spaceId,
    };
    let modal = this.modalCtrl.create(FolderSelectModalComponent, data);
    modal.present();
    modal.onDidDismiss(data => {
      if(data != undefined) {
        const saveloader = this.loadingCtrl.create({      
        });      
        saveloader.present();
        this.content.move(item.ID, data.ID)
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
  openModal(item: any) {
    this.content.getContentByID(item.ID)
      .finally(()=>{})
      .subscribe(res => {
        let data = {
          entity: res.ResponseData,
        };        
        let modal = this.modalCtrl.create(CommentModalComponent, data);
        modal.present();
        modal.onDidDismiss(data => {      
        });
      })    
  }
  opensheet1(item: any) {
    this.translate.get(["EXTRA.DOWNLOAD", "EXTRA.DELETE", "EXTRA.COMMENT", "EXTRA.MOVE", "COMPONENT.CANCEL"]).subscribe((res) => {
      let buttons = [];
      if(this.p_downLoad) {
        buttons.push({
          text: res['EXTRA.DOWNLOAD'],
          handler: () => {
            this.downloadFolder(item);
          }
        });
      }
      buttons.push({
        text: res['EXTRA.DELETE'],
        handler: () => {
          this.deleteFolder(item);
        }
      })
      buttons.push({
        text: res['COMPONENT.CANCEL'],
        role: 'cancel'
      });
      let actionSheet = this.actionSheetCtrl.create({
        title: item.title,
        buttons: buttons
      });
      actionSheet.present();
    });
  }
  opensheet2(item: any) {
    this.translate.get(["EXTRA.DOWNLOAD", "EXTRA.DELETE", "EXTRA.COMMENT", "EXTRA.MOVE", "COMPONENT.CANCEL"]).subscribe((res) => {
      let buttons = [];
      if(this.p_downLoad) {
        buttons.push({
          text: res['EXTRA.DOWNLOAD'],
          handler: () => {
            this.downloadFile(item);
          }
        });
      }
      buttons.push({
        text: res['EXTRA.COMMENT'],
        handler: () => {
          this.openModal(item);
        }
      })
      buttons.push({
        text: res['EXTRA.MOVE'],
        handler: () => {
          this.moveFile(item);
        }            
      })
      buttons.push({
        text: res['EXTRA.DELETE'],
        handler: () => {
          this.deleteFile(item);
        }
      })
      buttons.push({
        text: res['COMPONENT.CANCEL'],
        role: 'cancel'
      })
      let actionSheet = this.actionSheetCtrl.create({
        title: item.title,
        buttons: buttons
      });
      actionSheet.present();
    });
  }
}
