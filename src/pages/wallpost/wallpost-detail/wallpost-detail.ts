import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, InfiniteScroll, Refresher } from 'ionic-angular';
import { ContentProvider } from '../../../providers/content'
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { CommentModalComponent } from '../../../components/comment-modal/comment-modal';
import { SingleContentLikeComponent } from '../../../components/single-content-like/single-content-like';
import { TapticEngine } from '@ionic-native/taptic-engine'; 
import { Vibration } from '@ionic-native/vibration'; 
import { Platform } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { TranslateService } from '@ngx-translate/core';

@IonicPage({
  name: 'wallpost',
  segment: 'wallpost/:id'
})

@Component({
  selector: 'page-wallpost-detail',
  templateUrl: 'wallpost-detail.html',
})
export class WallpostDetailPage implements OnInit {

  private contentId = this.navParams.get('id');
  contentDetail;
  likesCount: any;
  isRefreshing: boolean = false;
  infiniteScroll: InfiniteScroll;

  @ViewChild (SingleContentLikeComponent) singleComponentLikeComponent: SingleContentLikeComponent;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private contentProvider: ContentProvider,
    public loadingCtrl: LoadingController,
    public taptic: TapticEngine,
    public iab: InAppBrowser,
    public vibration: Vibration,
    public platform: Platform,
    public translate: TranslateService
  ) {}

  vibrate(){
    if(this.platform.is("android")){
      this.vibration.vibrate(50);
    }
  }

  ngOnInit() {
    this.getUserByContentId();
    // this.getComments();
  }

  setCount($event){
    this.likesCount = $event;
  }

  openBrowser(link){
    let domain = localStorage.getItem("community_url");
    const options: InAppBrowserOptions = {
      location: "yes"
    };
    this.iab.create(domain + link, "_system", options);
  }

  getUserByContentId() {
    this.translate.get("COMMONS.LOADING_WALLPOST").subscribe(res => {
      let loading = this.loadingCtrl.create({
        content: res
      });
      loading.present();
  
      this.contentProvider.getWallPost(this.contentId)
      .finally(() => loading.dismiss())
      .subscribe(res => {
        this.contentDetail = res.ResponseData;
        console.log(this.contentDetail);
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
    this.contentProvider.getWallPost(this.contentId)
    .finally(() => refresher.complete())
    .subscribe(res => {
      this.contentDetail = res.ResponseData;
      this.singleComponentLikeComponent.getLikeCount();
    })
    // this.page = 1;
    // this.comments = [];
    // this.contentProvider.getContentComments(this.contentId, this.page)
    //   .subscribe(res => {
    //     this.handleComments(res);
    //   })
  }

  // getComments(infiniteScroll?: InfiniteScroll){
  //   if(infiniteScroll){
  //     this.infiniteScroll = infiniteScroll;
  //   }
  //   if (this.comments.length == 0 && infiniteScroll){
  //     infiniteScroll.enable(false);
  //   }
  //   if (this.comments.length >= 0 && this.comments.length < 10 && infiniteScroll){
  //     infiniteScroll.enable(false);
  //   }
  //   this.page++;

  //   this.contentProvider.getContentComments(this.contentId, this.page)
  //     .finally(() => {
  //       if (infiniteScroll) {
  //         infiniteScroll.complete();
  //       }
  //     })
  //     .do(response => {
  //       if (!response.ResponseData && infiniteScroll) {
  //         infiniteScroll.enable(false);
  //         this.page--; // Restore page back to the last correct page
  //       }
  //     })
  //     .subscribe(res => {
  //       this.handleComments(res);
  //       if (res.ResponseData && res.ResponseData.length < 10 && infiniteScroll){
  //         infiniteScroll.enable(false);
  //       }
  //     })
  // }

  // private handleComments(response) {
  //   if (response.ResponseData){
  //     this.comments = this.comments.concat(response.ResponseData);
  //     this.comments = this.contentProvider.getNestedChildren(this.comments, 0);
  //   }
  // }

  getTitle(){
    return "TITLES.WALLPOST";
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
      // this.comments = data.comments;
      this.contentDetail.CommentCount += data.count;
    });
  }

}
