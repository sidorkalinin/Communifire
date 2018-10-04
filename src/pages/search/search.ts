import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Refresher } from 'ionic-angular';
import { ContentProvider } from '../../providers/content';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { Vibration } from '@ionic-native/vibration'; 
import { Platform } from 'ionic-angular';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-search'
})
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchfilter: string = "";
  page: number = 0;
  isLoading: boolean = false;
  isLoadingSearch: boolean = false;
  activities: any = [];
  infinteScroll: InfiniteScroll;
  searchPage: number = 0;
  searchEntities: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public content: ContentProvider,
    public vibration: Vibration,
    public platform: Platform,
    private appCenterAnalytics: AppCenterAnalytics
  ) {
    this.appCenterAnalytics.isEnabled().then( (b) => {
      if(b){
        this.appCenterAnalytics.trackEvent('Search Page Load Event.', {userid: localStorage.getItem('UserID') }).then(() => {
          console.log('Search Page Load Event tracked');
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
  }

  doRefresh(refresher?: Refresher){
    if(this.searchfilter.length === 0){
      this.activities = [];
      refresher.complete();
      return 0;
    }
    this.page = 1;
    this.activities = [];
    refresher.complete();
    this.isLoadingSearch = true;
    this.content.searchByKeyword(this.searchfilter, this.page)
      .finally(() => {
        this.isLoadingSearch = false;
      })
      .do((response: any) => {
        
      })
      .subscribe(response => {
        this.activities = this.activities.concat(response.ResponseData);        
      }, err => {
      });
  }

  doInfinite(infiniteScroll?: InfiniteScroll) {    
    if(this.searchfilter.length > 0 && infiniteScroll){
      this.search(infiniteScroll);
      return 0;
    }
  }


  search(infiniteScroll?: InfiniteScroll){
    if(this.searchfilter.length === 0){
      this.activities = [];
      return 0;
    }
    if(infiniteScroll){
      this.infinteScroll = infiniteScroll;
    } else {
      this.page = 0;
      this.activities = [];
    }
    if (this.activities.length != 0 && this.activities.length < 10){
      infiniteScroll.enable(false);
      return 0;
    }
    ++this.page;

    if (!infiniteScroll) {
      this.isLoadingSearch = true;
    }

    this.content.searchByKeyword(this.searchfilter, this.page)
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
        console.log(response.ResponseData);
        this.activities = this.activities.concat(response.ResponseData);
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
