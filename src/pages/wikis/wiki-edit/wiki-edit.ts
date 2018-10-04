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
 * Generated class for the WikiEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'wiki-edit',
  segment: 'wiki-edit'
})

@Component({
  selector: 'page-wiki-edit',
  templateUrl: 'wiki-edit.html',
})
export class WikiEditPage {
  contentTitle: any;
  contentSummary: any;
  contentBody: any;
  categories: any = [];
  newtag: any;
  tags: any = [];
  metaTitle: any;
  metaDescription: any;
  attachFiles: any = [];
  attachFileNames: any = [];
  spaceId: any;
  userId: any;
  contentId: any;
  featuredImage: any;
  featured: boolean = false;
  requiredreading: boolean = false;
  ParentContentID: any;


  //Refresher
  isLoading: boolean = false;
  loader: any;

  //To send image url to featured-image component
  contentFeaturedImageFullURL: string;
  isNewFeaturedImage: boolean = false;

  //Validation
  titleClass: string;
  summaryClass: string;
  bodyClass: string;
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
    this.contentId = this.navParams.get('contentId');
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

  async ngOnInit() {
    this.translate.get("COMMONS.LOADING_ARTICLE").subscribe(res => {
      this.loader = this.loadingCtrl.create({
        content: res,
      });
      this.loader.present();
      this.getContentById();
    });
  }

  checkPermission() {
    this.contentProvider.checkPermission({ spaceid: this.spaceId, entitytype: 9 })
      .finally(() => {
      })
      .subscribe(response => {
        if (!response.IsError) {
          this.MarkAsFeatured = response.ResponseData.MarkAsFeatured;
          this.MarkContentAsReadRequired = response.ResponseData.MarkContentAsReadRequired;
        }
      })
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

  getContentById() {
    this.contentProvider.getContentByID(this.contentId)
      .finally(this.loader.dismiss())
      .subscribe(res => {
        let contentData = res.ResponseData;
        this.contentTitle = contentData.ContentTitle;
        this.contentBody = contentData.ContentBody;
        this.contentSummary = contentData.ContentSummary;
        this.spaceId = contentData.SpaceID;
        this.userId = contentData.AuthorID;
        this.metaTitle = contentData.MetaTitle;
        this.metaDescription = contentData.MetaDescription;
        this.tags = contentData.TagsCSV.split(',');
        if (this.tags.length == 1 && this.tags[0] == '') {
          this.tags = [];
        }
        this.featured = contentData.IsFeatured;
        this.requiredreading = contentData.RequiresReadConfirmation;
        this.ParentContentID = contentData.ParentContentID;

        this.contentFeaturedImageFullURL = contentData.ContentFeaturedImageFullURL;
        this.isNewFeaturedImage = false;
        this.pubdate = contentData.DatePublished;
        this.expiredate = contentData.DateExpired;
        this.IsContentAvailablePostExpiry = contentData.IsContentAvailablePostExpiry;

        this.checkPermission();
      });
  }

  ionViewDidLoad() {
  }

  //Feature Image
  setFeatureFile(file) {
    this.featuredImage = file.filename;
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
  }

  navToList() {
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();

    this.navCtrl.push('wikis', {
      id: this.contentId
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
      let yOffset = document.getElementById('articleBody').offsetTop;
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
      'ContentTitle': this.contentTitle,
      'ContentBody': this.contentBody,
      'ContentSummary': this.contentSummary,
      'ParentContentID': this.ParentContentID,
      'TagsCSV': this.tags.join(','),
      'IsFeatured': this.featured,
      'RequiresReadConfirmation': this.requiredreading,
      "IsContentAvailablePostExpiry": this.IsContentAvailablePostExpiry
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

    this.contentProvider.updateContent(this.contentId, JSON.stringify(JSON.stringify(body)))
      .finally(() => {
      })
      .subscribe(res => {
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
            this.translate.get("TOAST.UPDATED").subscribe(res => {
              this.presentToast(res);
            });
            this.navToList();
          })

          this.appCenterAnalytics.isEnabled().then((b) => {
            if (b) {
              this.appCenterAnalytics.trackEvent('Wiki Edit Success.', { id: res.ResponseData, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Wiki Edit Event tracked');
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
              this.appCenterAnalytics.trackEvent('Wiki Edit Failed.', { error: res.ResponseMessage, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Wiki Edit Event Failed');
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
