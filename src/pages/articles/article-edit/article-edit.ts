import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController, ToastController, Platform } from 'ionic-angular';
import { ContentProvider } from '../../../providers/content';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '@ionic-native/device';
import { Keyboard } from '@ionic-native/keyboard';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

/**
 * Generated class for the ArticleEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'article-edit',
  segment: 'article-edit'
})
@Component({
  selector: 'page-article-edit',
  templateUrl: 'article-edit.html',
})
export class ArticleEditPage {
  contentTitle: any;
  contentSummary: any;
  contentBody: any;
  category: any;
  categories: any = [];
  subcategory: any = 0;
  subcategories: any;
  tags: any = [];
  metaTitle: any;
  metaDescription: any;
  attachFiles: any = [];
  attachFileNames: any = [];
  spaceId: any;
  contentId: any;
  featuredImage: any;
  featured: boolean = false;
  requiredreading: boolean = false;
  pubdate: any;
  expiredate: any;
  IsContentAvailablePostExpiry: boolean;
  //Permission
  MarkAsFeatured: boolean = true;
  MarkContentAsReadRequired: boolean = true;

  //To send image url to featured-image component
  contentFeaturedImageFullURL: string;
  isNewFeaturedImage: boolean = false;

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

  @ViewChild(Content) content: Content;
  @ViewChild('summary') summary;

  public customOptions: any = {
    buttons: [{
      text: 'Clear Date',
      handler: () => this.expiredate = null
    }]
  }  
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
    // this language will be used as a fallback when a translation isn't found in the current language
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

    this.translate.get("COMPONENT.NOTSELECTED").subscribe(res => {
      this.subcategories = [{ name: res, title: res, value: '0', default: true }];
    });
  }

  isIphoneX: boolean = false;

  async ngOnInit() {
    this.translate.get("COMMONS.LOADING").subscribe(res => {
      this.loader = this.loadingCtrl.create({
        content: res,
      });
      this.loader.present();
      this.getContentById();
    });
  }

  checkPermission() {
    this.contentProvider.checkPermission({ spaceid: this.spaceId, entitytype: 3 })
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
      .finally(() => {
        this.dismiss();
      })
      .subscribe(res => {
        let contentData = res.ResponseData;
        this.contentTitle = contentData.ContentTitle;
        this.contentBody = contentData.ContentBody;
        this.contentSummary = contentData.ContentSummary;
        this.spaceId = contentData.SpaceID;
        this.metaTitle = contentData.MetaTitle;
        this.metaDescription = contentData.MetaDescription;
        this.tags = contentData.TagsCSV.split(',');
        if (this.tags.length == 1 && this.tags[0] == '') {
          this.tags = [];
        }
        this.featured = contentData.IsFeatured;
        this.requiredreading = contentData.RequiresReadConfirmation;

        if (contentData.ParentCategoryID != 0) {
          this.category = contentData.ParentCategoryID
          this.subcategory = contentData.CategoryID;
        } else {
          this.category = contentData.CategoryID;
        }

        this.contentFeaturedImageFullURL = contentData.ContentFeaturedImageFullURL;
        this.isNewFeaturedImage = false;
        this.pubdate = contentData.DatePublished;
        this.expiredate = contentData.DateExpired;
        this.getCategories();
        this.checkPermission();
      });
  }

  //Get Category from Content Provider
  getCategories() {
    this.contentProvider.getContentCategories({ spaceId: this.spaceId, entityTypeID: 3, parentCategoryID: 0 })
      .finally(() => {
        this.dismiss();
      })
      .subscribe(response => {
        this.categories = [];
        for (let i = 0; i < response.ResponseData.length; i++) {
          this.categories.push(
            { name: response.ResponseData[i].CategoryName, title: response.ResponseData[i].CategoryName, value: response.ResponseData[i].CategoryID, default: response.ResponseData[i].CategoryID == this.category }
          );
        }
      }, err => {
      })
  }

  getSubCategories() {
    this.contentProvider.getContentCategories({ spaceId: this.spaceId, entityTypeID: 3, parentCategoryID: this.category })
      .finally(() => {
      })
      .subscribe(response => {
        this.subcategories = [
          { name: 'Not Selected', title: 'Not Selected', value: '0', default: response.ResponseData.length == 0 || this.subcategory == 0 }
        ];
        for (let i = 0; i < response.ResponseData.length; i++) {
          this.subcategories.push(
            { name: response.ResponseData[i].CategoryName, title: response.ResponseData[i].CategoryName, value: response.ResponseData[i].CategoryID, default: response.ResponseData[i].CategoryID == this.subcategory }
          );
        }
      }, err => {
      })
  }

  ionViewDidLoad() {
  }

  dismiss() {
    this.loader.dismiss();
  }

  //Feature Image
  setFeatureFile(file) {
    this.featuredImage = file;
    this.isNewFeaturedImage = true;
  }
  //Get Category
  setCategories(category) {
    this.category = category.value;
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].value == category.value)
        this.categories[i].default = true;
      else
        this.categories[i].default = false;
    }
    this.getSubCategories();
  }
  //Get SubCategory
  setSubCategories(category) {
    this.subcategory = category.value;
    for (let i = 0; i < this.subcategories.length; i++) {
      if (this.subcategories[i].value == category.value)
        this.subcategories[i].default = true;
      else
        this.subcategories[i].default = false;
    }
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

  navToList() {
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();

    this.navCtrl.push('articles', {
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

    this.contentBody = this.contentBody.replace(/"/g, '\"');
    body = {
      'CategoryID': this.category,
      'ContentTitle': this.contentTitle,
      'ContentBody': this.contentBody,
      'ContentSummary': this.contentSummary,
      'TagsCSV': this.tags.join(','),
      'IsFeatured': this.featured,
      'RequiresReadConfirmation': this.requiredreading,
      'IsContentAvailablePostExpiry': this.IsContentAvailablePostExpiry
    }

    if (this.subcategories.length != 1 && this.subcategory != 0) {
      body["CategoryID"] = this.subcategory;
      body["ParentCategoryID"] = this.category;
    }
    if (this.pubdate != undefined) {
      body["DatePublished"] = this.pubdate;
    }
    if (this.expiredate != undefined) {
      body["DateExpired"] = this.expiredate;
    }

    const saveloader = this.loadingCtrl.create({
    });
    saveloader.present();
    console.log(JSON.stringify(JSON.stringify(body)));
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
            saveloader.dismiss();
            this.translate.get("TOAST.UPDATED").subscribe(res => {
              this.presentToast(res);
            });
            this.navToList();
          })

          this.appCenterAnalytics.isEnabled().then((b) => {
            if (b) {
              this.appCenterAnalytics.trackEvent('Article Edit Success.', { id: res.ResponseData, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Article Edit Event tracked');
              });
            }
          })

        } else {
          saveloader.dismiss();
          this.translate.get("TOAST.ERROR").subscribe(res => {
            this.presentToast(res);
          });

          this.appCenterAnalytics.isEnabled().then((b) => {
            if (b) {
              this.appCenterAnalytics.trackEvent('Article Edit Failed.', { error: res.ResponseMessage, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Article Edit Event Failed');
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
