import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Refresher, ModalController } from 'ionic-angular';
import { ContentProvider } from '../../../providers/content';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { Vibration } from '@ionic-native/vibration';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { Device } from '@ionic-native/device';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@IonicPage({
  name: 'case-list',
  segment: 'case-list/:id'
})
@Component({
  selector: 'page-case-list',
  templateUrl: 'case-list.html',
})
export class CaseListPage {

  title: string = this.navParams.get('title');
  subTitle: string = this.navParams.get('subTitle');
  entityType: number = 19;
  userId: number = this.navParams.get('UserID');
  spaceId: number = this.navParams.get('SpaceID');
  profile: any = this.navParams.get('profile');
  searchfilter: string = "";

  isLoading: boolean = false;

  cases: any = [];

  page: number = 0;

  infinteScroll: InfiniteScroll;

  isLoadingSearch: boolean = false;

  /**
   * Case filter
   */
  projectId: number = null;
  categoryId: number = null;
  milestoneId: number = null;
  statusId: number = null;
  priorityId: number = null;
  assignedToId: number = null;
  createdById: number = null;
  isIphoneX:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public content: ContentProvider,
    public taptic: TapticEngine,
    public vibration: Vibration,
    public platform: Platform,
    public modalCtrl: ModalController,
    public device: Device,
    private appCenterAnalytics: AppCenterAnalytics
  ) {
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
    this.appCenterAnalytics.isEnabled().then( (b) => {
      if(b){
        this.appCenterAnalytics.trackEvent('Case List Load Event.', { spaceId: this.spaceId.toString(), userid: localStorage.getItem('UserID') }).then(() => {
          console.log('Case List Load Event tracked');
        });
      }
    })
  }

  vibrate() {
    if (this.platform.is("android")) {
      this.vibration.vibrate(50);
    }
  }

  ionViewDidLoad() {
    this.doInfinite();
  }

  doRefresh(refresher?: Refresher) {
    this.searchfilter = "";
    if (this.infinteScroll) {
      this.infinteScroll.enable(true);
    }
    this.taptic.impact({ style: 'light' });
    this.vibrate();
    this.page = 1;
    let options = {
      EntityType: this.entityType,
      page: this.page,
    }
    this.isLoading = false;
    if (this.userId) {
      options['UserID'] = this.userId;
    }

    if (this.spaceId) {
      options['SpaceID'] = this.spaceId;
    }
    if (this.spaceId == 0) {
      options['SpaceID'] = 0;
    }
    this.content.getCases(options, this.page, 10)
      .finally(() => {
        if (refresher) {
          refresher.complete();
        } else {
          this.isLoading = false;
        }
      })
      .subscribe(response => {
        this.cases = response.ResponseData;        
      }, err => {
        if (refresher) {
          refresher.complete();
        }
      });
  }

  doInfinite(infiniteScroll?: InfiniteScroll) {
    if (infiniteScroll) {
      this.infinteScroll = infiniteScroll;
    } else {
      this.cases = [];
      this.page = 0;
    }
    if (this.cases.length != 0 && this.cases.length < 10) {
      infiniteScroll.enable(false);
      return 0;
    }
    ++this.page;

    if (!infiniteScroll && !this.isLoadingSearch) {
      this.isLoading = true;
    }

    let options = {
      EntityType: this.entityType,
      page: this.page,
      keyword: this.searchfilter
    }

    if (this.userId) {
      options['UserID'] = this.userId;
    }

    if (this.spaceId) {
      options['SpaceID'] = this.spaceId;
    }

    if (this.spaceId == 0) {
      options['SpaceID'] = 0;
    }

    if (this.projectId) {
      options['projectId'] = this.projectId;
    }

    if (this.categoryId) {
      options['categoryId'] = this.categoryId;
    }

    if (this.milestoneId) {
      options['milestoneId'] = this.milestoneId;
    }

    if (this.statusId) {
      options['statusId'] = this.statusId;
    }

    if (this.priorityId) {
      options['priorityId'] = this.priorityId;
    }

    if (this.assignedToId) {
      options['assignedToUserID'] = this.assignedToId;
    }

    if (this.createdById) {
      options['reportedByUserID'] = this.createdById;
    }


    this.content.getCases(options, this.page, 10)
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        } else {
          this.isLoading = false;
          this.isLoadingSearch = false;
        }
      })
      .do((response: any) => {
        if (!response.ResponseData.length && infiniteScroll) {
          infiniteScroll.enable(false);
        }
      })
      .subscribe(response => {        
        this.cases = this.cases.concat(response.ResponseData);
        if (infiniteScroll && response.ResponseData.length < 10) {
          infiniteScroll.enable(false);
        }
        console.log(this.cases);
      }, err => {
        if (infiniteScroll) {
          infiniteScroll.enable(false)
        }
      });

  }

  createCase(){
    this.navCtrl.push('case-create', {spaceId: this.spaceId, title: this.title})
  }

  openFilter() {
    let modal = this.modalCtrl.create('cases-filters', {
      spaceId: this.spaceId,
      projectId: this.projectId,
      categoryId: this.categoryId,
      milestoneId: this.milestoneId,
      statusId: this.statusId,
      priorityId: this.priorityId,
      assignedToId: this.assignedToId,
      createdById: this.createdById,
    }, {

      });

    modal.present();

    modal.onDidDismiss((data) => {
      if(!data.isCanceled){
        this.spaceId = data.spaceId;
        this.projectId = data.projectId;
        this.categoryId = data.categoryId;
        this.milestoneId = data.milestoneId;
        this.statusId = data.statusId;
        this.priorityId = data.priorityId;
        this.assignedToId = data.assignedToId;
        this.createdById = data.createdById;

        this.doInfinite();
      }
    })
  }

}
