import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Refresher, LoadingController } from 'ionic-angular';
import { ContentProvider } from "../../../providers/content";
import { CaseCommentModalComponent } from "../../../components/case-comment-modal/case-comment-modal";
import { TapticEngine } from '@ionic-native/taptic-engine';
import { Vibration } from '@ionic-native/vibration';
import { Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '@ionic-native/device';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { DomSanitizer } from '@angular/platform-browser'
import { COMMON_URLS } from '../../../util/constants';

@IonicPage({
  name: "cases",
  segment: "cases/:id"
})
@Component({
  selector: 'page-case-detail',
  templateUrl: 'case-detail.html',
})
export class CaseDetailPage implements OnInit {
  case: any = {};
  id: number = this.navParams.get('id');
  isLoading: boolean = true;
  isLoadingComments: boolean = true;
  isRefreshing: boolean = false;

  comments: any = [];
  page: number = 0;
  loader: any;
  canedit: boolean = false;
  hasCreateCommentPermission: boolean = false;
  hasCaseCommentPermChecked: boolean = false;
  avatarImageURL: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contentProvider: ContentProvider,
    private modalCtrl: ModalController,
    public taptic: TapticEngine,
    public vibration: Vibration,
    public platform: Platform,
    public translate: TranslateService,
    public loadingCtrl: LoadingController,
    public device: Device,
    private appCenterAnalytics: AppCenterAnalytics,
    private sanitizer: DomSanitizer
  ) {
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
  }

  isIphoneX: boolean = false;

  ngOnInit() {

    this.avatarImageURL = COMMON_URLS.AVATAR_DEFAULT_IMAGE;

    this.translate.get("COMMONS.LOADING_CASE").subscribe(res => {
      this.loader = this.loadingCtrl.create({
        content: res,
      });
      this.loader.present().then(() => {
        this.getCase();
        this.getComments();
      });
    });
  }

  vibrate() {
    if (this.platform.is("android")) {
      this.vibration.vibrate(50);
    }
  }

  doRefresh(refresher?: Refresher) {
    this.taptic.impact({ style: 'light' });
    this.isRefreshing = true;
    this.vibrate();
    this.contentProvider.getCase(this.id).finally(() => {
      refresher.complete();
    }).subscribe(res => {
      this.case = res.ResponseData;
      if (this.case.SpaceID == 0) {
        this.case.SpaceName = "Top Level Community";
      }
      console.log(this.case);
      this.isRefreshing = false;
    })
    this.isLoadingComments = true;
    this.getComments();
  }

  getCase() {
    this.contentProvider.getCase(this.id).finally(() => {
      this.isLoading = false;
      if (this.loader) {
        this.loader.dismiss();
      }
    }).subscribe(res => {
      this.case = res.ResponseData;
      this.case.IssueDescription = this.sanitizer.bypassSecurityTrustHtml(this.case.IssueDescription);
      this.checkPermission();

      if (this.platform.is('cordova')) {
        this.appCenterAnalytics.isEnabled().then((b) => {
          if (b) {
            this.appCenterAnalytics.trackEvent('Case Detail Load.', { id: this.case, userid: localStorage.getItem('UserID') }).then(() => {
              console.log('Case Detail Load Event tracked');
            });
          }
        })
      }
    })
  }

  public modal: any = null;

  openModal() {
    this.modal = this.modalCtrl.create(CaseCommentModalComponent, {
      id: this.case.IssueID,
      case: this.case
    });
    this.modal.onDidDismiss(data => {
      if (data.update) {
        this.getCase();
      }
      this.getComments();
    });
    this.modal.present();
  }

  ionViewWillLeave() {
    if (this.modal) {
      this.modal.dismiss();
    }
  }

  getComments() {
    this.page++;

    this.contentProvider.getCaseComments(this.id)
      .finally(() => {
        this.isLoadingComments = false;
      })
      .subscribe(this.handleComments.bind(this))
  }

  private handleComments(response) {
    if (response.ResponseData) {
      this.comments = response.ResponseData;
    }
  }

  likes: any;

  setCount($event) {
    this.likes = $event;
  }


  ionViewDidLoad() {
  }

  goToProfile() {
    this.navCtrl.push("profile", {
      id: this.case.ReportedByUserID
    });
  }

  navToList() {
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();
    if (this.case.SpaceID === 0) {
      this.navCtrl.push("case-list", {
        title: this.case.ReportedByUserName,
        UserID: this.case.UserID
      }, {
          direction: "back"
        });
    } else {
      this.navCtrl.push("case-list", {
        title: this.case.SpaceName,
        SpaceID: this.case.SpaceID
      }, {
          direction: "back"
        });
    }
    this.navCtrl.removeView(active);
    console.log(this.navCtrl.length());
    if (this.navCtrl.length() > 2) {
      this.navCtrl.removeView(parent);
    }
  }

  cancel() {
    this.navCtrl.pop();
  }

  checkPermission() {

    console.log("Going to check permissions");
    // Check EDIT permission
    this.contentProvider.checkPermission({
      entitytype: 19,
      spaceid: this.case.SpaceID
    }, "AdminEntityUpdate,Update")
      .subscribe(res => {
        if (this.case.UserID == localStorage.getItem('UserID')) {
          this.canedit = res.ResponseData.Update;
        }
        else {
          this.canedit = res.ResponseData.AdminEntityUpdate;
        }
      })

    // Check CREATE COMMENT permission
    this.contentProvider.checkPermission({
      entitytype: 20,
      spaceid: this.case.SpaceID
    }, "Create")
      .subscribe(res => {
        this.hasCreateCommentPermission = res.ResponseData.Create;
        this.hasCaseCommentPermChecked = true;
        console.log("hasCaseCommentPermChecked: " + this.hasCaseCommentPermChecked);
      })
  }
}
