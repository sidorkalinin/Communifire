import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController, ToastController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { TranslateService } from '@ngx-translate/core';
import { ContentProvider } from '../../../providers/content';
import { AuthenticationProvider } from '../../../providers/authentication';
import { Device } from '@ionic-native/device';
import { Keyboard } from '@ionic-native/keyboard';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

/**
 * Generated class for the DiscussionCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'discussion-create',
  segment: 'discussion-create'
})
@Component({
  selector: 'page-discussion-create',
  templateUrl: 'discussion-create.html',
})
export class DiscussionCreatePage {
  navTitle: any;
  subTitle: any;

  contentTitle: any;
  contentBody: any;
  tags: any = [];
  attachFiles: any = [];
  spaceId: number;
  userId: number;
  contentParentID: number;
  sticky: boolean = false;
  locked: boolean = false;
  featured: boolean = false;
  d_categories: any = [];

  //Refresher
  isLoading: boolean = false;
  loader: any;

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
    private authProvider: AuthenticationProvider,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public device: Device,
    private toastCtrl: ToastController,
    private keyboard: Keyboard,
    private platform: Platform,
    private appCenterAnalytics: AppCenterAnalytics
  ) {
    this.spaceId = this.navParams.get('spaceId');
    this.navTitle = this.navParams.get('title');
    this.subTitle = this.navParams.get('subTitle');

    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
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

  isIphoneX: boolean = false;

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
        })
    });
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

  navToList() {
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();
    console.log(this.navTitle, this.subTitle, this.contentParentID);

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
    } else if (this.contentParentID == undefined) {
      return;
    }
    let body;
    if (this.locked) {
      body = {
        'ContentTitle': this.contentTitle,
        'ContentBody': this.contentBody,
        'ParentContentID': this.contentParentID,
        'EntityType': 55,
        'SpaceID': this.spaceId,
        'IsSticky': this.sticky,
        'IsFeatured': this.featured,
        'LockedByUserID': this.userId,
        'TagsCSV': this.tags.join(','),
      }
    } else {
      body = {
        'ContentTitle': this.contentTitle,
        'ContentBody': this.contentBody,
        'ParentContentID': this.contentParentID,
        'EntityType': 55,
        'SpaceID': this.spaceId,
        'IsSticky': this.sticky,
        'IsFeatured': this.featured,
        'TagsCSV': this.tags.join(','),
      }
    }
    const saveloader = this.loadingCtrl.create({
    });
    saveloader.present();

    this.contentProvider.createContent(JSON.stringify(body))
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
            if (res.ResponseMessage == 'ToBePublished') {
              this.translate.get("TOAST.PENDING").subscribe(res => {
                this.presentToast(res);
              });
            } else {
              this.translate.get("TOAST.CREATED").subscribe(res => {
                this.presentToast(res);
              });
            }

            this.navToList();
          })

          this.appCenterAnalytics.isEnabled().then((b) => {
            if (b) {
              this.appCenterAnalytics.trackEvent('Discussion Create Success.', { id: res.ResponseData, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Discussion Create Event tracked');
              });
            }
          })
        } else {
          saveloader.dismiss();
          this.appCenterAnalytics.isEnabled().then((b) => {
            if (b) {
              this.appCenterAnalytics.trackEvent('Discussion Creation Failed.', { error: res.ResponseMessage, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Discussion Creation Failed Event F');
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
