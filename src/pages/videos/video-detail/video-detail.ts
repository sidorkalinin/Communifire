import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, InfiniteScroll, Refresher } from 'ionic-angular';
import { ContentProvider } from '../../../providers/content'
import { CommentModalComponent } from '../../../components/comment-modal/comment-modal';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { SingleContentLikeComponent } from '../../../components/single-content-like/single-content-like';
import { TapticEngine } from '@ionic-native/taptic-engine'; 
import { Vibration } from '@ionic-native/vibration'; 
import { Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '@ionic-native/device';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@IonicPage({
	name: 'videos',
  segment: 'videos/:id'
 })
@Component({
  selector: 'page-video-detail',
  templateUrl: 'video-detail.html',
})
export class VideoDetailPage {

  private contentId = this.navParams.get('id');
  contentDetail;
  likesCount: any;
  
  infiniteScroll: InfiniteScroll;
  
  canedit: boolean = false;

  isIframe: boolean = false;
  trustedVideoUrl: SafeResourceUrl;
  isLoadingIframe: boolean = false;

  @ViewChild (SingleContentLikeComponent) singleComponentLikeComponent: SingleContentLikeComponent;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private contentProvider: ContentProvider,
    public loadingCtrl: LoadingController,
    public taptic: TapticEngine,
    public vibration: Vibration,
    public platform: Platform,
    public translate: TranslateService,
    public device: Device,
    private appCenterAnalytics: AppCenterAnalytics,
    private domSanitizer: DomSanitizer
  ) {
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

  ngOnInit() {
    this.getUserByContentId();
    this.getComments();
  }

  setCount($event){
    this.likesCount = $event;
  }

  dismissLoading() {
    this.isLoadingIframe = false;
  }

  getUserByContentId() {
    this.translate.get("COMMONS.LOADING_VIDEO").subscribe(res => {
      let loading = this.loadingCtrl.create({
        content: res
      });
      loading.present();
  
      this.contentProvider.getContentByID(this.contentId)
      .finally(() => loading.dismiss())
      .subscribe(res => {
        this.contentDetail = res.ResponseData;
        this.contentDetail.ContentBody = this.domSanitizer.bypassSecurityTrustHtml(this.contentDetail.ContentBody);
        console.log(this.contentDetail);
        if((this.contentDetail.ContentMediaUrl.indexOf("youtube.com/") != -1) || (this.contentDetail.ContentMediaUrl.indexOf("youtu.be/") != -1)) {
          this.isIframe = true;
          if(this.contentDetail.ContentMediaUrl.indexOf('watch?v=') == -1) {
            let ttt = this.contentDetail.ContentMediaUrl.split('/').pop();
            this.contentDetail.ContentMediaUrl = 'https://www.youtube.com/watch?v=' + ttt;
          }
          this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.contentDetail.ContentMediaUrl.replace('watch?v=', '/embed/'));
          this.isLoadingIframe = true;
        } else if(this.contentDetail.ContentMediaUrl.indexOf('<iframe') != -1) {
          this.isIframe = true;
          let ttt = this.contentDetail.ContentMediaUrl.substring(this.contentDetail.ContentMediaUrl.indexOf('<iframe>'), this.contentDetail.ContentMediaUrl.indexOf('</iframe>'));          
          let srcposition = ttt.indexOf('src="') + 5;
          while(ttt[srcposition] != '"') {
            srcposition++;
          }          
          this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(ttt.substring(ttt.indexOf('src="')+5, srcposition));
          this.isLoadingIframe = true;
        } else if(this.contentDetail.ContentMediaUrl.indexOf('https://vimeo.com') != -1) {
          this.contentDetail.ContentMediaUrl = this.contentDetail.ContentMediaUrl.replace('https://vimeo.com', 'https://player.vimeo.com/video');
          console.log(this.contentDetail.ContentMediaUrl);
          this.isIframe = true;
          this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.contentDetail.ContentMediaUrl);
          this.isLoadingIframe = true;
        } else if((this.contentDetail.ContentMediaUrl.indexOf('http://') != -1) || (this.contentDetail.ContentMediaUrl.indexOf('https://') != -1)) {
          this.isIframe = true;
          this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.contentDetail.ContentMediaUrl);
          this.isLoadingIframe = true;
        } else {
          this.isIframe = false;
        }
        
        this.checkPermission();

        this.appCenterAnalytics.isEnabled().then( (b) => {
          if(b){
            this.appCenterAnalytics.trackEvent('Video Detail Load.', { id: this.contentId, userid: localStorage.getItem('UserID') }).then(() => {
              console.log('Video Detail Load Event tracked');
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
    this.contentProvider.getContentByID(this.contentId)
    .finally(() => refresher.complete())
    .subscribe(res => {
      this.contentDetail = res.ResponseData;
      if(this.contentDetail.ContentMediaUrl.indexOf("youtube.com/") != -1) {
        this.isIframe = true;
        this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.contentDetail.ContentMediaUrl.replace('watch?v=', '/embed/'));
      } else {
        this.isIframe = false;
      }
      this.singleComponentLikeComponent.getLikeCount();
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

  getTitle(){
    return "TITLES.Video";
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

  navToList(){
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();
    if(this.contentDetail.SpaceID === 0){
      this.navCtrl.push("video-list", {
        title: this.contentDetail.ReportedByUserName,
        UserID: this.contentDetail.UserID
      }, {
        direction: "back"
      });
    } else {
      this.navCtrl.push("video-list", {
        title: this.contentDetail.SpaceName,
        SpaceID: this.contentDetail.SpaceID
      }, {
        direction: "back"
      });
    }
    this.navCtrl.removeView(active);
    this.navCtrl.removeView(parent);
  }

  cancel(){
    this.navCtrl.pop();
  }

  checkPermission(){
    if(this.contentDetail.AuthorID == localStorage.getItem('UserID')){
      this.contentProvider.checkPermission({
        entitytype: 7,
        spaceid: this.contentDetail.SpaceID,
      })
      .finally(()=>{      
      })
      .subscribe(res =>{
        this.canedit = res.ResponseData.update;      
      })
    }else{
      this.contentProvider.checkPermission({
        entitytype: 7,
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
