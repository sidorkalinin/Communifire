import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, LoadingController } from 'ionic-angular';
import { ContentProvider } from '../../../providers/content';
import { SingleContentLikeComponent } from '../../../components/single-content-like/single-content-like';
import { TapticEngine } from '@ionic-native/taptic-engine'; 
import { Vibration } from '@ionic-native/vibration'; 
import { Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@IonicPage({
  name: "photos",
  "segment": "photos/:id"
})
@Component({
  selector: 'page-photo-detail',
  templateUrl: 'photo-detail.html',
})
export class PhotoDetailPage {

  id: number = this.navParams.get('id');
  title: number = this.navParams.get('title');
  contentDetail: any = {};
  likesCount: any;
  loader: any;

  @ViewChild (SingleContentLikeComponent) singleComponentLikeComponent: SingleContentLikeComponent;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public contentProvider: ContentProvider,
    public taptic: TapticEngine,
    public vibration: Vibration,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    private appCenterAnalytics: AppCenterAnalytics
  ) {
    this.getPhotoInfo();
  }

  vibrate(){
    if(this.platform.is("android")){
      this.vibration.vibrate(50);
    }
  }

  getPhotoInfo(refresher?: Refresher){
    if(refresher){
      this.taptic.impact({ style: 'light' }); 
      this.vibrate();
    } else {
      this.translate.get("COMMONS.LOADING_ALBUM").subscribe(res => {
        this.loader = this.loadingCtrl.create({
          content: res
        })
        this.loader.present();
      });
    }
    this.contentProvider.getContentByID(this.id).finally(() => {
      if(refresher){
        refresher.complete();
      } else {
        this.loader.dismiss();
      }
    }).subscribe(res => {
      console.log(res);
      this.contentDetail = res.ResponseData;
      this.appCenterAnalytics.isEnabled().then( (b) => {
        if(b){
          this.appCenterAnalytics.trackEvent('Photo Detail Load.', { id: this.id.toString(), userid: localStorage.getItem('UserID') }).then(() => {
            console.log('Photo Detail Load Event tracked');
          });
        }
      })
    });
  }

  ionViewDidLoad() {
  }

  setCount($event){
    this.likesCount = $event;
  }

  navToList(){
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();
    if(this.contentDetail.SpaceID === 0){
      this.navCtrl.push("photo-list", {
        title: this.contentDetail.ReportedByUserName,
        UserID: this.contentDetail.UserID
      }, {
        direction: "back"
      });
    } else {
      this.navCtrl.push("photo-list", {
        title: this.contentDetail.SpaceName,
        SpaceID: this.contentDetail.SpaceID
      }, {
        direction: "back"
      });
    }
    this.navCtrl.removeView(active);
    this.navCtrl.removeView(parent);
  }

}
