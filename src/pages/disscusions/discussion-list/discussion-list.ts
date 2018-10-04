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
  name: "discussion-list",
  segment: "discussion-list/:id"
})
@Component({
  selector: 'page-discussion-list',
  templateUrl: 'discussion-list.html',
})
export class DiscussionListPage {

  title: string = this.navParams.get('title');
  subTitle: string = this.navParams.get('subTitle');
  spaceId: number = this.navParams.get('SpaceID');
  userId: number = this.navParams.get('UserID');
  profile: any = this.navParams.get('profile');

  entityType: number = 55;
  searchfilter: string = "";
  bsearchbar: boolean = false;
  topics: any = [];

  isLoading: boolean = false;

  cases: any = [];

  page: number = 0;

  categories: any = [];

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
          this.appCenterAnalytics.trackEvent('Discussion Category List Load Event.', { spaceId: this.spaceId.toString(), userid: localStorage.getItem('UserID') }).then(() => {
            console.log('Discussion Category List Load Event tracked');
          });
        }
      })
  }

  vibrate(){
    if(this.platform.is("android")){
      this.vibration.vibrate(50);
    }
  }

  ngOnInit(){
    
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
      EntityType: 1,
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
        this.categories = response.ResponseData;
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
    if(this.categories.length > 0 && this.categories.length < 10 && infiniteScroll){
      infiniteScroll.enable(false);
      return 0;
    }
    ++this.page;

    if (!infiniteScroll){
      this.isLoading = true;
    }

    let options = {
      EntityType: 1,
      page: this.page,
    }

    if (this.userId){
      options['UserID'] = this.userId;
    }
    
    if (this.spaceId){
      options['SpaceID'] = this.spaceId;
    }

    if (this.spaceId == 0){
      options['SpaceID'] = 0;
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
        this.categories = this.categories.concat(response.ResponseData);
        if (infiniteScroll && response.ResponseData.length < 10){
          infiniteScroll.enable(false);
        }
      }, err => {
        if (infiniteScroll) {
          infiniteScroll.enable(false)
        }
      });

  }

  createDiscussion(){
    this.navCtrl.push('discussion-create', {
      spaceId: this.spaceId,
      title: this.title,
      subTitle: this.subTitle
    });
  }

  isLoadingSearch: boolean = false;

  search(infiniteScroll?: InfiniteScroll){
    if(this.searchfilter.length === 0){
      this.topics = [];
      this.doInfinite();
      return 0;
    }
    if(infiniteScroll){
      this.infinteScroll = infiniteScroll;
    } else {
      this.page = 0;
      this.topics = [];
    }
    if (this.topics.length != 0 && this.topics.length < 10){
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
        console.log('----------');
        console.log(response);
        this.topics = this.topics.concat(response.ResponseData);
        if (infiniteScroll && response.ResponseData.length < 10){
          infiniteScroll.enable(false);
        }
      }, err => {
        if (infiniteScroll) {
          infiniteScroll.enable(false)
        }
      });
  }

  showSearchBar() {
    this.bsearchbar = true;
  }

  onCancel() {    
    this.bsearchbar = false;
    this.searchfilter = "";
    this.categories = [];    
    this.doInfinite();
  }
}
