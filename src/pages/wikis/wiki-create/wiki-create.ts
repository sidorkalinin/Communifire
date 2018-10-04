import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController, ToastController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { TranslateService } from '@ngx-translate/core';
import { ContentProvider } from '../../../providers/content';
import { Device } from '@ionic-native/device';
import { Keyboard } from '@ionic-native/keyboard';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

/**
 * Generated class for the ArticleCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'wiki-create',
  segment: 'wiki-create'
})
@Component({
  selector: 'page-wiki-create',
  templateUrl: 'wiki-create.html',
})
export class WikiCreatePage {
  navTitle: any;
  isFeaturedImage: boolean = false;
  contentTitle: any;
  contentSummary: any;
  contentBody: any;
  category: any;
  categories: any = [];
  newtag: any;
  tags: any = [];
  metaTitle: any;
  metaDescription: any;
  attachFiles: any = [];
  attachFileNames: any = [];
  spaceId: any;
  userId: any;
  imageFileName: String;
  featuredImage: any;
  featured: boolean = false;
  requiredreading: boolean = false;
  ParentContentID: any;

  //Refresher
  isLoading: boolean = false;

  //Validation
  titleClass: string;
  summaryClass: string;
  bodyClass: string;
  categoryClass: string;

  pubdate: any;
  expiredate: any;

  IsContentAvailablePostExpiry: boolean = false;
  //Permission
  MarkAsFeatured: boolean = true;
  MarkContentAsReadRequired: boolean = true;
  keyOpen: any = false;
  isAndroid: any;
  scrollAmount: any;
  bTag: any = false;
  froalaOption: any = {
    placeholderText: ''
  }

  @ViewChild(Content) content: Content;
  @ViewChild('summary') summary;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contentProvider: ContentProvider,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public device: Device,
    private toastCtrl: ToastController,
    private keyboard: Keyboard,
    private platform: Platform,
    private appCenterAnalytics: AppCenterAnalytics
  ) {
    this.imageFileName = '/Themes/default/images/space-default.png';
    this.spaceId = this.navParams.get('spaceId');
    this.userId = this.navParams.get('userId');
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
  cansticky: boolean = false;

  async ngOnInit() {
    this.translate.get("COMMONS.LOADING_ARTICLE").subscribe(res => {
      const loader = this.loadingCtrl.create({
        content: res,
      });
      loader.present();
      this.contentProvider.checkPermission({
        entitytype: 9,
        spaceid: this.spaceId,
      })
        .finally(() => {
          loader.dismiss();
        })
        .subscribe(res => {
          if (res.IsError == false) {
            this.cansticky = res.ResponseData.AdminEntityUpdate;
            this.MarkAsFeatured = res.ResponseData.MarkAsFeatured;
            this.MarkContentAsReadRequired = res.ResponseData.MarkContentAsReadRequired;
          }
        })
    });
  }

  setFocus() {
    this.summary.setFocus();
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

  ionViewDidLoad() {
  }

  //Feature Image
  setFeatureFile(file) {
    this.featuredImage = file;
  }
  //Attach File
  setFiles(files) {
    this.attachFiles = files;
  }

  //Set Tag
  setTags(tags) {
    this.tags = tags;
  }

  //Set MetaInfo
  setMetaInformation(meta) {
    this.metaTitle = meta.metaTitle;
    this.metaDescription = meta.metaDescription;
  }

  //Set Topic
  setTopic(topic) {
    this.ParentContentID = topic;
  }

  // Element not validated gets focus
  getFocus() {
    this.titleClass = '';
    this.summaryClass = '';
    this.bodyClass = '';
    this.categoryClass = '';
  }

  navToList(id) {
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();

    this.navCtrl.push("wikis", {
      id: id
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
    } else if (this.contentSummary == undefined) {
      let yOffset = document.getElementById('summary').offsetTop;
      this.content.scrollTo(0, yOffset - 50, 1000);
      this.translate.get("TOAST.SUMMARYEMPTY").subscribe(res => {
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
    } else if (this.pubdate != undefined && this.expiredate != undefined && new Date(this.pubdate) >= new Date(this.expiredate)) {
      this.translate.get("TOAST.TIME").subscribe(res => {
        this.presentToast(res);
      });
      return;
    }

    interface LooseObject {
      [key: string]: any
    };
    let body: LooseObject;

    body = {
      'EntityType': 9,
      'SpaceID': this.spaceId,
      'ContentTitle': this.contentTitle,
      'ContentBody': this.contentBody,
      'ContentSummary': this.contentSummary,
      'ParentContentID': this.ParentContentID,
      'TagsCsv': this.tags.join(','),
      'IsFeatured': this.featured,
      'RequiresReadConfirmation': this.requiredreading,
      'IsContentAvailablePostExpiry': this.IsContentAvailablePostExpiry
    }

    if (this.pubdate != undefined) {
      body["DatePublished"] = this.pubdate;
    }
    if (this.expiredate != undefined) {
      body["DateExpired"] = this.expiredate;
    }


    const loader = this.loadingCtrl.create({
    });
    loader.present();

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
          if (this.featuredImage != undefined) {
            p.push(this.uploadFeatureImage(res.ResponseData));
          }

          Promise.all(p).then(() => {
            loader.dismiss();
            if (res.ResponseMessage == 'ToBePublished') {
              this.translate.get("TOAST.PENDING").subscribe(res => {
                this.presentToast(res);
              });
            } else {
              this.translate.get("TOAST.CREATED").subscribe(res => {
                this.presentToast(res);
              });
            }
            this.navToList(res.ResponseData);
          })

          this.appCenterAnalytics.isEnabled().then((b) => {
            if (b) {
              this.appCenterAnalytics.trackEvent('Wiki Create Success.', { id: res.ResponseData, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Wiki Create Event tracked');
              });
            }
          })
        } else {
          loader.dismiss();
          this.translate.get("TOAST.ERROR").subscribe(res => {
            this.presentToast(res);
          });

          this.appCenterAnalytics.isEnabled().then((b) => {
            if (b) {
              this.appCenterAnalytics.trackEvent('Wiki Creation Failed.', { error: res.ResponseMessage, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Wiki Creation Failed Event Failed.');
              });
            }
          })
        }
      })
  }


  uploadFeatureImage(c_id) {
    return this.contentProvider.uploadFeaturedImage({
      'fullPath': this.featuredImage.path,
      'name': this.featuredImage.filename,
      'contentID': c_id
    });
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
