import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController, ToastController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { TranslateService } from '@ngx-translate/core';
import { ContentProvider } from '../../../providers/content';
import { AuthenticationProvider } from '../../../providers/authentication';
import { Keyboard } from '@ionic-native/keyboard';
import { Device } from '@ionic-native/device';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
/**
 * Generated class for the DiscussionEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'discussion-edit',
  segment: 'discussion-edit'
})
@Component({
  selector: 'page-discussion-edit',
  templateUrl: 'discussion-edit.html',
})
export class DiscussionEditPage implements OnInit {
  navTitle: any;
  subTitle: any;

  contentId: any;
  contentTitle: any;
  contentBody: any;
  tags: any = [];
  attachFiles: any = [];
  spaceId: number;
  userId: number;
  contentParentID: number;
  contentParentTitle: any;
  sticky: boolean = false;
  locked: boolean = false;
  featured: boolean = false;

  //Refresher
  isLoading: boolean = false;
  loader: any;
  //Validation
  titleClass: string;
  bodyClass: string;

  keyOpen: any = false;
  isAndroid: any;
  scrollAmount: any;

  bTag: any = false;
  froalaOption: any = {
    placeholderText: ''
  }

  p_locked: any = false;
  p_marked: any = false;

  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contentProvider: ContentProvider,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    private authProvider: AuthenticationProvider,
    private toastCtrl: ToastController,
    private keyboard: Keyboard,
    private platform: Platform,
    private appCenterAnalytics: AppCenterAnalytics
  ) {
    this.contentId = this.navParams.get('contentId');

    this.isAndroid = this.platform.is("android");
    this.keyboard.onKeyboardShow().subscribe(() => {
      if (this.isAndroid) { // This is to prevent content scrolling when keyboard hidden.
        setTimeout(() => {
          this.content.scrollTo(0, this.scrollAmount, 0);
        }, 0)
      }
      this.keyOpen = true;
    });
    this.keyboard.onKeyboardHide().subscribe(() => {
      if (this.isAndroid) { // This is to prevent content scrolling when keyboard hidden.
        setTimeout(() => {
          this.content.scrollTo(0, this.scrollAmount, 0);
        }, 0)
      }
      this.keyOpen = false;
    });
    this.keyboard.disableScroll(true);
  }

  ionViewDidLoad() {
  }

  onScroll(event) {
    if (!this.isAndroid) {
      if (this.keyOpen && !this.bTag) {
        this.keyboard.close();
      }
    } else {
      this.scrollAmount = event.scrollTop;
    }
  }

  async ngOnInit() {
    this.translate.get("COMMONS.LOADING").subscribe(res => {
      this.loader = this.loadingCtrl.create({
        content: res,
      });
      this.loader.present();

      this.authProvider.getMyDetails()
        .finally(() => {
          this.dismiss();
        })
        .subscribe(res => {
          this.userId = res.UserID;
          this.getContentById();
        })
    });
  }

  getContentById() {
    this.contentProvider.getContentByID(this.contentId)
      .finally(() => {
        this.dismiss();
      })
      .subscribe(res => {
        let contentData = res.ResponseData;
        console.log(contentData);
        this.contentTitle = contentData.ContentTitle;
        this.contentBody = contentData.ContentBody;
        this.tags = contentData.TagsCSV.split(',');
        if (this.tags.length == 1 && this.tags[0] == '') {
          this.tags = [];
        }
        this.spaceId = contentData.SpaceID;
        this.contentParentID = contentData.ParentContentID;
        this.contentParentTitle = contentData.ParentContentTitle;
        this.sticky = contentData.IsSticky;
        this.locked = contentData.LockedByUserID == this.userId;
        this.featured = contentData.IsFeatured;
        this.navTitle = contentData.SpaceName;
        this.subTitle = contentData.ParentContentTitle
      });
  }

  dismiss() {
    this.loader.dismiss();
  }
  //Attach File
  setFiles(files) {
    this.attachFiles = files;
  }

  //Set Tag
  setTags(tags) {
    this.tags = tags;
  }

  setCategory(item) {
    this.contentParentID = item.ContentID;
    this.checkPermission();
  }

  checkPermission() {
    this.contentProvider.checkPermission({ spaceid: this.spaceId, entitytype: 1, entityid: this.contentParentID })
      .finally(() => {
        this.dismiss();
      })
      .subscribe(response => {
        console.log(response);
        if (!response.IsError) {
          this.p_locked = response.ResponseData.Lock;
          this.p_marked = response.ResponseData.MarkAsFeatured;
        }
      })
  }

  // Element not validated gets focus
  getFocus() {
    this.titleClass = '';
    this.bodyClass = '';
  }

  navToList() {
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();

    this.navCtrl.push("discussion-category", {
      title: this.navTitle,
      subTitle: this.subTitle,
      id: this.contentParentID,
      spaceId: this.spaceId
    }, {
        direction: "back"
      });

    this.navCtrl.removeView(active);
    this.navCtrl.removeView(parent);
  }

  private presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  cancel() {
    this.navCtrl.pop();
  }

  save() {
    if (this.contentTitle == undefined) {
      let yOffset = document.getElementById('headline').offsetTop;
      this.content.scrollTo(0, yOffset - 50, 1000);
      this.translate.get("TOAST.TITLEEMPTY").subscribe(res => {
        this.presentToast(res);
      });
      return;
    } else if (this.contentBody == undefined || this.contentBody == '') {
      let yOffset = document.getElementById('contentBody').offsetTop;
      this.content.scrollTo(0, yOffset - 50, 1000);
      this.translate.get("TOAST.BODYEMPTY").subscribe(res => {
        this.presentToast(res);
      });
      return;
    }

    let body = {
      'ContentTitle': this.contentTitle,
      'ContentBody': this.contentBody,
      'ParentContentID': this.contentParentID,
      'EntityType': 55,
      'SpaceID': this.spaceId,
      'IsSticky': this.sticky,
      'IsFeatured': this.featured,
      'LockedByUserID': this.locked ? this.userId : 0,
      'TagsCSV': this.tags.join(','),
    }
    const saveloader = this.loadingCtrl.create({
    });
    saveloader.present();

    this.contentProvider.updateContent(this.contentId, JSON.stringify(JSON.stringify(body)))
      .finally(() => {
      })
      .subscribe(res => {
        //res.ResponseData
        if (res.IsError == false) {
          let p = [];
          for (var i = 0; i < this.attachFiles.length; i++) {
            p.push(this.contentProvider.uploadAttachFile({
              'fullPath': this.attachFiles[i].path,
              'name': this.attachFiles[i].filename,
              'contentID': res.ResponseData
            }));
          }
          Promise.all(p).then(() => {
            saveloader.dismiss();
            this.translate.get("TOAST.UPDATED").subscribe(res => {
              this.presentToast(res);
            });
            this.navToList();
          })

          this.appCenterAnalytics.isEnabled().then((b) => {
            if (b) {
              this.appCenterAnalytics.trackEvent('Discussion Edit Success.', { id: res.ResponseData, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Discussion Edit Event tracked');
              });
            }
          })
        } else {
          this.translate.get("TOAST.ERROR").subscribe(res => {
            this.presentToast(res);
          });

          this.appCenterAnalytics.isEnabled().then((b) => {
            if (b) {
              this.appCenterAnalytics.trackEvent('Discussion Edit Failed.', { error: res.ResponseMessage, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Discussion Edit Event Failed');
              });
            }
          })
        }
      })
  }

  keyboardSubscription: any;

  onTagFocus() {
    this.bTag = true;
    //this.content.scrollToTop(500);
    this.keyboardSubscription = this.keyboard.onKeyboardShow().subscribe(e => {
      setTimeout(() => {
        this.content.scrollToBottom(500); // 500 for a smooth slow scroll after the Keyboard opens, but you can change this
      }, 50);
    });
  }
  onTagBlur() {
    this.bTag = false;
    this.keyboardSubscription.unsubscribe();
  }
}
