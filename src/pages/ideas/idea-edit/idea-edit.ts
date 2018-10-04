import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController, ToastController, Platform } from 'ionic-angular';
import { ContentProvider } from '../../../providers/content';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { TranslateService } from '@ngx-translate/core';
import { Keyboard } from '@ionic-native/keyboard';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

/**
 * Generated class for the IdeaEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'idea-edit',
  segment: 'idea-edit'
})
@Component({
  selector: 'page-idea-edit',
  templateUrl: 'idea-edit.html',
})
export class IdeaEditPage implements OnInit {
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
  spaceId: number;
  contentId: any;
  stages: any = [];
  categories: any = [];
  featured: boolean = false;
  requiredreading: boolean = false;

  //To send image url to featured-image component
  contentFeaturedImageFullURL: string;
  isNewFeaturedImage: boolean = false;
  //Permission
  MarkAsFeatured: boolean = true;
  MarkContentAsReadRequired: boolean = true;

  //Refresher
  isLoading: boolean = false;
  loader: any;

  //Validation
  titleClass: string;
  summaryClass: string;
  bodyClass: string;
  categoryClass: string;

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

  async ngOnInit() {
    this.translate.get("COMMONS.LOADING_IDEA").subscribe(res => {
      this.loader = this.loadingCtrl.create({
        content: res,
      });
      this.loader.present();
      this.getContentById();
    });
  }

  checkPermission() {
    this.contentProvider.checkPermission({ spaceid: this.spaceId, entitytype: 44 })
      .finally(() => {
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
  getContentById() {
    this.contentProvider.getContentByID(this.contentId)
      .finally(() => {
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
        this.category = contentData.CategoryID;
        this.contentStageID = contentData.ContentStageID;

        this.contentFeaturedImageFullURL = contentData.ContentFeaturedImageFullURL;
        this.isNewFeaturedImage = false;

        this.getCategories();
        this.getStages();
        this.checkPermission();
      });
  }

  //Get Category from Content Provider
  getCategories() {
    this.contentProvider.getContentCategories({ spaceId: this.spaceId, entityTypeID: 44 })
      .finally(() => {
        this.dismiss();
      })
      .subscribe(response => {
        for (let i = 0; i < response.ResponseData.length; i++) {
          this.categories.push(
            { name: response.ResponseData[i].CategoryName, title: response.ResponseData[i].CategoryName, value: response.ResponseData[i].CategoryID, default: response.ResponseData[i].CategoryID == this.category }
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
            { name: response.ResponseData[i].StageName, title: response.ResponseData[i].StageName, value: response.ResponseData[i].StageID, default: response.ResponseData[i].StageID == this.contentStageID }
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

  navToList() {
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();

    this.navCtrl.push('ideas', {
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
      let yOffset = document.getElementById('contentBody').offsetTop;
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
      'TagsCsv': this.tags.join(','),
      'ContentStageID': this.contentStageID,
      'IsFeatured': this.featured,
      'RequiresReadConfirmation': this.requiredreading
    }

    const saveloader = this.loadingCtrl.create({
    });
    saveloader.present();

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
              this.appCenterAnalytics.trackEvent('Idea Edit Success.', { id: res.ResponseData, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Idea Edit Event tracked');
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
              this.appCenterAnalytics.trackEvent('Idea Edit Failed.', { error: res.ResponseMessage, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Idea Edit Event Failed');
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
