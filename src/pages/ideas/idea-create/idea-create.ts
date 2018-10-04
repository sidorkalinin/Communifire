import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController, ToastController, Platform } from 'ionic-angular';
import { ContentProvider } from '../../../providers/content';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { TranslateService } from '@ngx-translate/core';
import { Keyboard } from '@ionic-native/keyboard';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

/**
 * Generated class for the IdeaCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'idea-create',
  segment: 'idea-create'
})
@Component({
  selector: 'page-idea-create',
  templateUrl: 'idea-create.html',
})
export class IdeaCreatePage implements OnInit {
  navTitle: any;
  contentTitle: any;
  contentSummary: any;
  contentBody: any;
  category: any;
  tags: any = [];
  metaTitle: any;
  metaDescription: any;
  featuredImage: any;
  attachFiles: any = [];
  contentStageID: any;
  stages: any = [];
  categories: any = [];
  spaceId: number;
  featured: boolean = false;
  requiredreading: boolean = false;
  //Permission
  MarkAsFeatured: boolean = true;
  MarkContentAsReadRequired: boolean = true;

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contentProvider: ContentProvider,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    private toastCtrl: ToastController,
    private keyboard: Keyboard,
    private platform: Platform,
    private appCenterAnalytics: AppCenterAnalytics
  ) {
    this.spaceId = this.navParams.get('spaceId');
    this.navTitle = this.navParams.get('title');
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

  async ngOnInit() {
    this.translate.get("COMMONS.LOADING_IDEA").subscribe(res => {
      this.loader = this.loadingCtrl.create({
        content: res,
      });
      this.loader.present();
      this.getStages();
      this.getCategories();
      this.checkPermission();
    });
  }

  checkPermission() {
    this.contentProvider.checkPermission({ spaceid: this.spaceId, entitytype: 44 })
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
    this.contentProvider.getContentCategories({ spaceId: this.spaceId, entityTypeID: 44 })
      .finally(() => {
      })
      .subscribe(response => {
        for (let i = 0; i < response.ResponseData.length; i++) {
          this.categories.push(
            { name: response.ResponseData[i].CategoryName, title: response.ResponseData[i].CategoryName, value: response.ResponseData[i].CategoryID, default: i == 0 }
          );
        }
      }, err => {
      })
  }

  getStages() {
    if (this.spaceId == undefined)
      return;

    this.contentProvider.getContentStages({ spaceId: this.spaceId })
      .finally(() => {
      })
      .subscribe(response => {
        for (let i = 0; i < response.ResponseData.length; i++) {
          this.stages.push(
            { name: response.ResponseData[i].StageName, title: response.ResponseData[i].StageName, value: response.ResponseData[i].StageID, default: i == 0 }
          );
        }
      }, err => {
      })
  }

  ionViewDidLoad() {
  }

  categoryloaded: boolean = false;
  stageloaded: boolean = false;

  categoryload() {
    this.categoryloaded = true;
    if (this.stageloaded == true)
      this.dismiss();
  }

  stageload() {
    this.stageloaded = true;
    if (this.categoryloaded == true)
      this.dismiss();
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

  //ContentStageID
  setStage(stage) {
    this.contentStageID = stage.value;
  }

  navToList(id) {
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();

    this.navCtrl.push("ideas", {
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
      let yOffset = document.getElementById('content').offsetTop;
      this.content.scrollTo(0, yOffset - 50, 1000);
      this.translate.get("TOAST.BODYEMPTY").subscribe(res => {
        this.presentToast(res);
      });
      return;
    }

    let body = {
      'EntityType': 44,
      'CategoryID': this.category,
      'SpaceID': this.spaceId,
      'ContentTitle': this.contentTitle,
      'ContentBody': this.contentBody,
      'ContentSummary': this.contentSummary,
      'ContentStageID': this.contentStageID,
      'TagsCSV': this.tags.join(','),
      'IsFeatured': this.featured,
      'RequiresReadConfirmation': this.requiredreading,
    }
    const saveloader = this.loadingCtrl.create({
    });
    saveloader.present();

    this.contentProvider.createContent(JSON.stringify(body))
      .finally(() => {
      })
      .subscribe(res => {
        console.log(res);
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
            this.navToList(res.ResponseData);
          })

          this.appCenterAnalytics.isEnabled().then((b) => {
            if (b) {
              this.appCenterAnalytics.trackEvent('Idea Create Success.', { id: res.ResponseData, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Idea Create Event tracked');
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
              this.appCenterAnalytics.trackEvent('Idea Creation Failed.', { error: res.ResponseMessage, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Article Creation Failed Event F');
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
