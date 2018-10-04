import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Refresher } from 'ionic-angular';
import { ContentProvider } from '../../../providers/content';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { TapticEngine } from '@ionic-native/taptic-engine'; 
import { Vibration } from '@ionic-native/vibration'; 
import { Platform } from 'ionic-angular';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@IonicPage({
  name: 'wiki-list',
  segment: 'wiki-list/:id'
})

@Component({
  selector: 'page-wiki-list',
  templateUrl: 'wiki-list.html',
})
export class WikiListPage {

  title: string = this.navParams.get('title');
  subTitle: string = this.navParams.get('subTitle');
  entityType: number = 9;
  userId: number = this.navParams.get('UserID');
  spaceId: number = this.navParams.get('SpaceID');
  profile: any = this.navParams.get('profile');
  searchfilter: string = "";

  page: number = 0;
  isLoading: boolean = false;

  wikis: any = [];

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
        this.appCenterAnalytics.trackEvent('Wiki List Load Event.', { spaceId: this.spaceId.toString(), userid: localStorage.getItem('UserID') }).then(() => {
          console.log('Wiki List Load Event tracked');
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
    this.content.getContentByEntity(options)
      .finally(() => {
        if (refresher) {
          refresher.complete();
        } else {
          this.isLoading = false;
        }
      })
      .subscribe(response => {
        this.wikis = response.ResponseData;
        this.wikis = this.wikis.filter(v =>{
          return v.StatusID != 8;
        })
      }, err => {
        if (refresher) {
          refresher.complete();
        }
      });
  }

  doInfinite(infiniteScroll?: InfiniteScroll) {
    if(this.searchfilter.length > 0 && infiniteScroll){
      this.search(infiniteScroll);
      return 0;
    }
    if(infiniteScroll){
      this.infinteScroll = infiniteScroll;
    } else {
      this.page = 0;
    }
    if (this.wikis.length != 0 && this.wikis.length < 10){
      infiniteScroll.enable(false);
      return 0;
    }
    ++this.page;

    if (!infiniteScroll) {
      this.isLoading = true;
    }

    let options = {
      EntityType: this.entityType,
      page: this.page,
    }

    if (this.userId) {
      options['UserID'] = this.userId;
    }

    if (this.spaceId) {
      options['SpaceID'] = this.spaceId;
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
        this.wikis = this.wikis.concat(response.ResponseData);
        this.wikis = this.wikis.filter(v =>{
          return v.StatusID != 8;
        })
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
      this.wikis = [];
      this.doInfinite();
      return 0;
    }
    if(infiniteScroll){
      this.infinteScroll = infiniteScroll;
    } else {
      this.page = 0;
      this.wikis = [];
    }
    if (this.wikis.length != 0 && this.wikis.length < 10){
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

    if (this.spaceId) {
      options['SpaceID'] = this.spaceId;
    }

    this.content.search(this.searchfilter, this.entityType, this.page, this.spaceId, this.userId)
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
        this.wikis = this.wikis.concat(response.ResponseData);
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
