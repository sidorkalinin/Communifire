import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Refresher } from 'ionic-angular';
import { ContentProvider } from '../../../providers/content';
import { TapticEngine } from '@ionic-native/taptic-engine'; 
import { Vibration } from '@ionic-native/vibration'; 
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@IonicPage({
  name: "photo-list",
  segment: "photo-list/:id"
})
@Component({
  selector: 'page-photo-list',
  templateUrl: 'photo-list.html',
})
export class PhotoListPage {
  id: number = this.navParams.get('SpaceID');
  title: string = this.navParams.get('title');
  page: number = 0;
  isLoading: boolean = false;
  userId: number = this.navParams.get('UserID');
  searchfilter: string = "";
  entityType: number = 18;

  photos: any = [];

  infinteScroll: InfiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public content: ContentProvider,
    public taptic: TapticEngine,
    public vibration: Vibration,
    public platform: Platform,
    private appCenterAnalytics: AppCenterAnalytics
  ) {
    this.appCenterAnalytics.isEnabled().then( (b) => {
      if(b){
        this.appCenterAnalytics.trackEvent('Photo List Load Event.', { userid: localStorage.getItem('UserID') }).then(() => {
          console.log('Photo List Load Event tracked');
        });
      }
    })
  }

  vibrate(){
    if(this.platform.is("android")){
      this.vibration.vibrate(50);
    }
  }

  ionViewDidLoad() {
    this.doInfinite();
  }

  doRefresh(refresher?: Refresher){
    this.searchfilter = "";
    if(this.infinteScroll){
      this.infinteScroll.enable(true);
    }
    this.taptic.impact({ style: 'light' }); 
    this.vibrate();
    this.page = 1;
    let options = {
      EntityType: 18,
      page: this.page,
    }
    this.isLoading = false;
    if (this.userId) {
      options['UserID'] = this.userId;
    }

    if (this.id) {
      options['SpaceID'] = this.id;
    }
    this.content.getContentByEntity(options)
      .finally(() => {
        if (refresher) {
          refresher.complete();
        } else {
          this.isLoading = false;
        }
      })
      .subscribe(response => {
        this.photos = response.ResponseData;
      }, err => {
        if (refresher) {
          refresher.complete();
        }
      });
  }

  doInfinite(infiniteScroll?: InfiniteScroll){
    if(this.searchfilter.length > 0 && infiniteScroll){
      this.search(infiniteScroll);
      return 0;
    }
    if(infiniteScroll){
      this.infinteScroll = infiniteScroll;
    } else {
      this.page = 0;
    }
    if (this.photos.length != 0 && this.photos.length < 10){
      infiniteScroll.enable(false);
      return 0;
    }
    ++this.page;

    if (!infiniteScroll){
      this.isLoading = true;
    }

    let options = {
      EntityType: 18,
      page: this.page
    }

    if (this.userId){
      options['UserID'] = this.userId
    } else {
      options['SpaceID'] = this.id
    }

    this.content.getContentByEntity(options)
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        } else {
          this.isLoading = false;
        }
      })
      .do((response: any) => {
        if (!response.ResponseData.length && infiniteScroll) {
          infiniteScroll.enable(false);
        }
      })
      .subscribe(response => {
        this.photos = this.photos.concat(response.ResponseData);
        if (infiniteScroll && response.ResponseData.length < 10){
          infiniteScroll.enable(false);
        }
      }, err => {
        if (infiniteScroll) {
          infiniteScroll.enable(false)
        }
      });

  }

  isLoadingSearch: boolean = false;

  search(infiniteScroll?: InfiniteScroll){
    if(this.searchfilter.length === 0){
      this.photos = [];
      this.doInfinite();
      return 0;
    }
    if(infiniteScroll){
      this.infinteScroll = infiniteScroll;
    } else {
      this.page = 0;
      this.photos = [];
    }
    if (this.photos.length != 0 && this.photos.length < 10){
      infiniteScroll.enable(false);
      return 0;
    }
    ++this.page;

    if (!infiniteScroll) {
      this.isLoadingSearch = true;
    }

    let options = {
      EntityType: this.entityType,
      page: this.page,
    }

    if (this.userId) {
      options['UserID'] = this.userId;
    }

    if (this.id) {
      options['SpaceID'] = this.id;
    }

    this.content.search(this.searchfilter, this.entityType, this.page, this.id, this.userId)
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        } else {
          this.isLoadingSearch = false;
        }
      })
      .do((response: any) => {
        if (!response.ResponseData.length && infiniteScroll) {
          infiniteScroll.enable(false);
        }
      })
      .subscribe(response => {
        this.photos = this.photos.concat(response.ResponseData);
        if (infiniteScroll && response.ResponseData.length < 10){
          infiniteScroll.enable(false);
        }
      }, err => {
        if (infiniteScroll) {
          infiniteScroll.enable(false)
        }
      });

  }

}
