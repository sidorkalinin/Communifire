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
 * Generated class for the BlogCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'blog-create',
  segment: 'blog-create'
})
@Component({
  selector: 'page-blog-create',
  templateUrl: 'blog-create.html',
})
export class BlogCreatePage {
  navTitle: any; //For navigation
  contentTitle: any;
  contentSummary: any;
  contentBody: any;
  category: any;
  categories: any = [];
  subcategory: any;
  subcategories: any;
  newtag: any;
  tags: any = [];
  metaTitle: any;
  metaDescription: any;
  attachFiles: any = [];
  spaceId: number;
  featuredImage: any;
  featured: boolean = false;
  requiredreading: boolean = false;
  // pubdate = new Date();
  // expiredate = new Date();
  // pubtime = new Date();
  // expiretime = new Date();
  pubdate: any;
  expiredate: any;
  IsContentAvailablePostExpiry: boolean = false;

  //Permission
  MarkAsFeatured: boolean = true;
  MarkContentAsReadRequired: boolean = true;

  //Refresher
  isLoading: boolean = false;
  loader: any;

  keyOpen: any = false;
  isAndroid: any = false;
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
    this.navTitle = this.navParams.get('title');
    this.spaceId = this.navParams.get('spaceId');
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
      this.getCategories();
      this.checkPermission();
    });
  }

  checkPermission() {
    this.contentProvider.checkPermission({ spaceid: this.spaceId, entitytype: 4 })
      .finally(() => {
        this.dismiss();
      })
      .subscribe(response => {
        console.log(response);
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

  //Get Category from Content Provider
  getCategories() {
    this.contentProvider.getContentCategories({ spaceId: this.spaceId, entityTypeID: 4, parentCategoryID: 0 })
      .finally(() => {
      })
      .subscribe(response => {
        this.categories = [];
        for (let i = 0; i < response.ResponseData.length; i++) {
          this.categories.push(
            { name: response.ResponseData[i].CategoryName, title: response.ResponseData[i].CategoryName, value: response.ResponseData[i].CategoryID, default: i == 0 }
          );
        }
      }, err => {
      })
  }

  getSubCategories() {
    this.contentProvider.getContentCategories({ spaceId: this.spaceId, entityTypeID: 4, parentCategoryID: this.category })
      .finally(() => {
      })
      .subscribe(response => {
        this.subcategories = [
          { name: 'Not Selected', title: 'Not Selected', value: '0', default: this.subcategory == 0 }
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


  navToList(id) {
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();

    this.navCtrl.push('blogs', {
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
    console.log(this.category);
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
    } else if (this.category == undefined) {
      this.translate.get("TOAST.CATEGORYEMPTY").subscribe(res => {
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
      'EntityType': 4,
      'CategoryID': this.category.value,
      'SpaceID': this.spaceId,
      'ContentTitle': this.contentTitle,
      'ContentBody': this.contentBody,
      'ContentSummary': this.contentSummary,
      'TagsCSV': this.tags.join(','),
      'IsFeatured': this.featured,
      'RequiresReadConfirmation': this.requiredreading,
      "IsContentAvailablePostExpiry": this.IsContentAvailablePostExpiry
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

    this.contentProvider.createContent(JSON.stringify(body))
      .finally(() => {
      })
      .subscribe(res => {
        console.log(res);
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
            if (new Date(this.pubdate).getMilliseconds() - new Date().getMilliseconds()) {
              this.translate.get("TOAST.DELAYPUBLISHED").subscribe(res => {
                this.presentToast(res + " " + this.pubdate.slice(0, 10));
              });
            } else if (res.ResponseMessage == 'ToBePublished') {
              this.translate.get("TOAST.CREATED").subscribe(res => {
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
              this.appCenterAnalytics.trackEvent('Blog Create Success.', { id: res.ResponseData, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Blog Create Event tracked');
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
              this.appCenterAnalytics.trackEvent('Blog Creation Failed.', { error: res.ResponseMessage, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Blog Creation Failed Event F');
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
