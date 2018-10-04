import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, InfiniteScroll, Refresher } from 'ionic-angular';
import { InvitePeopleModalComponent } from '../../../modals/invite-people-modal/invite-people-modal';
import { ContentProvider } from '../../../providers/content'
import { CommentModalComponent } from '../../../components/comment-modal/comment-modal';
import { AuthenticationProvider } from './../../../providers/authentication';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { SingleContentLikeComponent } from '../../../components/single-content-like/single-content-like';
import { TapticEngine } from '@ionic-native/taptic-engine'; 
import { Vibration } from '@ionic-native/vibration'; 
import { Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '@ionic-native/device';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@IonicPage({
  name: 'events',
  segment: 'events/:id'
})
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage implements OnInit {
  private contentId = this.navParams.get('id');
  contentDetail;
  going: number = 0;
  likesCount: any;
  userId: number = null;
  confirmation: number = null;
  noComments: boolean = false;
  invited: number = 0;

  canedit: boolean = false;

  infiniteScroll: InfiniteScroll;
  bRSVPChange: boolean = false;

  @ViewChild (SingleContentLikeComponent) singleComponentLikeComponent: SingleContentLikeComponent;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private contentProvider: ContentProvider,
    public loadingCtrl: LoadingController,
    public authentificationProvider: AuthenticationProvider,
    public taptic: TapticEngine,
    public vibration: Vibration,
    public platform: Platform,
    public translate: TranslateService,
    public device: Device,
    private appCenterAnalytics: AppCenterAnalytics
  ) {
    this.authentificationProvider.user$.filter(user => user !== null).subscribe(user => {
      this.userId = user.UserID;
    });
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
  }

  isIphoneX: boolean = false;

  vibrate(){
    if(this.platform.is("android")){
      this.vibration.vibrate(50);
    }
  }

  getEventStatus(eventId){
    this.contentProvider.getEventStatus(eventId).subscribe(res => {
      console.log(res);
      this.confirmation = res;
    });
  }

  setCount($event){
    this.likesCount = $event;
  }

  openModal($event?) {
    let data = {
      entity: this.contentDetail,
    };
    if ($event){
      data['parentComment'] = $event;
    }
    let modal = this.modalCtrl.create(CommentModalComponent, data);
    modal.present();
    modal.onDidDismiss(data => {
      this.comments = data.comments;
      this.contentDetail.CommentCount += data.count;
    });
  }

  adduser() {
    let modal = this.modalCtrl.create(InvitePeopleModalComponent, {
      eventId: this.contentDetail.EventID,
      spaceId: this.contentDetail.SpaceID
    });
    modal.present();
    modal.onDidDismiss(res => {
      this.invited += (res.count?res.count: 0);
    })
  }

  getUserByContentId() {
    this.translate.get("COMMONS.LOADING_EVENT").subscribe(res => {
      let loading = this.loadingCtrl.create({
        content: res
      });
      loading.present();
  
      this.contentProvider.getEventByID(this.contentId)
      .finally(() => loading.dismiss())
      .subscribe(res => {
        this.contentDetail = res.ResponseData;
        console.log(this.contentDetail);
        this.checkPermission();
        this.getEventStatus(this.contentDetail.EventID);
        this.going = this.contentDetail.Users.filter(user => user.AttendanceType === 1).reduce((acc, user) => ++acc, 0);

        this.appCenterAnalytics.isEnabled().then( (b) => {
          if(b){
            this.appCenterAnalytics.trackEvent('Event Detail Load.', { id: this.contentDetail.EventID, userid: localStorage.getItem('UserID') }).then(() => {
              console.log('Event Detail Load Event tracked');
            });
          }
        })
      })
    });
  }

  page: number = 0;
  comments: any = [];

  doRefresh(refresher?: Refresher){
    if(this.infiniteScroll){
      this.infiniteScroll.enable(true);
    }
    this.taptic.impact({ style: 'light' }); 
    this.vibrate();
    this.contentProvider.getEventByID(this.contentId)
    .finally(() => refresher.complete())
    .subscribe(res => {
      this.contentDetail = res.ResponseData;
      this.getEventStatus(this.contentDetail.EventID);
      this.going = this.contentDetail.Users.filter(user => user.AttendanceType === 1).reduce((acc, user) => ++acc, 0);
    })
    this.page = 1;
    this.comments = [];
    this.contentProvider.getContentComments(this.contentId, this.page)
      .subscribe(res => {
        this.handleComments(res);
      })
  }

  getComments(infiniteScroll?: InfiniteScroll){
    if(infiniteScroll){
      this.infiniteScroll = infiniteScroll;
    }
    if (this.comments.length == 0 && infiniteScroll){
      infiniteScroll.enable(false);
    }
    if (this.comments.length >= 0 && this.comments.length < 10 && infiniteScroll){
      infiniteScroll.enable(false);
    }
    this.page++;

    this.contentProvider.getContentComments(this.contentId, this.page)
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
      .do(response => {
        if (!response.ResponseData && infiniteScroll) {
          infiniteScroll.enable(false);
          this.page--; // Restore page back to the last correct page
        }
      })
      .subscribe(res => {
        this.handleComments(res);
        if (res.ResponseData && res.ResponseData.length < 10 && infiniteScroll){
          infiniteScroll.enable(false);
        }
      })
  }

  private handleComments(response) {
    if (response.ResponseData){
      this.comments = this.comments.concat(response.ResponseData);
      this.comments = this.contentProvider.getNestedChildren(this.comments, 0);
    }
  }

  onChangeModel($event){
    this.bRSVPChange = true;
    console.log(this.confirmation);
    if(this.confirmation !== null){
      this.contentProvider.setEventStatus(this.contentDetail.EventID, this.userId, $event).subscribe(res => {
      });
    }
  }

  ngOnInit() {
    this.getUserByContentId();
    this.getComments();
  }

  navToList(){
    // let active = this.navCtrl.getActive();
    // let parent = this.navCtrl.getPrevious();
    if(this.contentDetail.SpaceID === 0){
      this.navCtrl.setRoot("event-list", {
        title: this.contentDetail.ReportedByUserName,
        UserID: this.contentDetail.UserID
      }, {
        direction: "back"
      });
    } else {
      this.navCtrl.setRoot("event-list", {
        title: this.contentDetail.SpaceName,
        SpaceID: this.contentDetail.SpaceID
      }, {
        direction: "back"
      });
    }
    // this.navCtrl.removeView(active);
    // this.navCtrl.removeView(parent);
  }

  cancel(){
    if(this.bRSVPChange){
      this.navToList();
    }else{
      this.navCtrl.pop();
    }    
  }

  checkPermission(){
    if(this.contentDetail.AuthorID == localStorage.getItem('UserID')){
      this.contentProvider.checkPermission({
        entitytype: 5,
        spaceid: this.contentDetail.SpaceID,
      })
      .finally(()=>{      
      })
      .subscribe(res =>{
        this.canedit = res.ResponseData.update;      
      })
    } else{
      this.contentProvider.checkPermission({
        entitytype: 5,
        spaceid: this.contentDetail.SpaceID,
      })
      .finally(()=>{      
      })
      .subscribe(res =>{
        this.canedit = res.ResponseData.AdminEntityUpdate;      
      })
    }
  }
}
