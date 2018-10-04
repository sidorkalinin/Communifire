import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Refresher } from 'ionic-angular';
import { ContentProvider } from "../../../providers/content";
import { TapticEngine } from '@ionic-native/taptic-engine'; 
import { Vibration } from '@ionic-native/vibration'; 
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@IonicPage({
  name: "discussion-category",
  segment: "discussion-category/:id"
})
@Component({
  selector: 'page-discussion-category',
  templateUrl: 'discussion-category.html',
})
export class DiscussionCategoryPage implements OnInit {

  id: number = this.navParams.get('id');
  title: number = this.navParams.get('title');
  subTitle: string = this.navParams.get('subTitle');
  spaceId: number = parseInt(localStorage.getItem('SpaceID'));
  sort = 0;
  page: number = 0;
  isLoading: boolean = false;
  items: any = [];

  searchfilter: string = "";
  isLoadingSearch: any;
  
  filterModel: string = "COMMONS.LATEST";
  filterItems: any = [
    {
      value: 0,
      name: "COMMONS.LATEST"
    },
    // {
    //   value: 1,
    //   name: "COMMONS.TRENDING"
    // },
    {
      value: 2,
      name: "COMMONS.ANSWERED"
    },
    {
      value: 3,
      name: "COMMONS.UNANSWERED"
    }
  ];
  infinteScroll: InfiniteScroll;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public contentProvider: ContentProvider, 
    public taptic: TapticEngine,
    public vibration: Vibration,
    public platform: Platform,
    private appCenterAnalytics: AppCenterAnalytics
  ) {    
    this.getContent();
    this.appCenterAnalytics.isEnabled().then( (b) => {
      if(b){
        this.appCenterAnalytics.trackEvent('Discussion List Load Event.', { parentId: this.id.toString(), userid: localStorage.getItem('UserID') }).then(() => {
          console.log('Discussion List Load Event tracked');
        });
      }
    })
  }

  ngOnInit() {
    console.log('-------------');
  }

  vibrate(){
    if(this.platform.is("android")){
      this.vibration.vibrate(50);
    }
  }

  doRefresh(refresher?: Refresher) {
    console.log('-------------');
    this.spaceId = parseInt(localStorage.getItem('SpaceID'));
    if (this.infinteScroll) {
      this.infinteScroll.enable(true);
    }
    this.taptic.impact({ style: 'light' }); 
    this.vibrate();
    this.page = 1;
    this.isLoading = false;
    let options = {
      EntityType: 55,
      page: this.page,
      ParentID: this.id
    }
    
    if(this.spaceId){
      options['SpaceID'] = this.spaceId;
    }

    this.contentProvider.getContentByEntity(options)
      .finally(() => {
        if (refresher) {
          refresher.complete();
        }
      })
      .subscribe(response => {
        this.items = response.ResponseData;
      }, err => {
        if (refresher) {
          refresher.complete();
        }
      });
  }

  getContent(infiniteScroll?: InfiniteScroll) {
    this.spaceId = parseInt(localStorage.getItem('SpaceID'));
    console.log('-------------');
    if (infiniteScroll) {
      this.infinteScroll = infiniteScroll;
    }
    if (this.items.length > 0 && this.items.length < 10 && infiniteScroll) {
      infiniteScroll.enable(false);
    }
    ++this.page;

    if (!infiniteScroll) {
      this.isLoading = true;
    }

    let options = {
      EntityType: 55,
      page: this.page,
      ParentID: this.id
    }
    console.log(this.spaceId);

    if(this.spaceId){
      options['SpaceID'] = this.spaceId;
    }

    this.contentProvider.getContentByEntity(options)
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
        console.log(response);
        this.items = this.items.concat(response.ResponseData);
        if (infiniteScroll && response.ResponseData.length < 10) {
          infiniteScroll.enable(false);
        }
      }, err => {
        if (infiniteScroll) {
          infiniteScroll.enable(false)
        }
      });

  }

  ionViewDidLoad() {
    this.spaceId = parseInt(localStorage.getItem('SpaceID'));
  }

  setFilter() {
    let options;
    switch (this.sort) {
      case 0:
        this.filterModel = this.filterItems[0].name;

        this.isLoading = true;
        this.page = 1;
        options = {
          EntityType: 55,
          page: this.page,
          ParentID: this.id
        }

        if(this.spaceId){
          options['SpaceID'] = this.spaceId;
        }

        this.items = [];

        this.contentProvider.getContentByEntity(options)
          .finally(() => {
            this.isLoading = false;
          })
          .subscribe(response => {
            this.items = this.items.concat(response.ResponseData);
          }, err => {
          });
        break;
      case 1:
        this.filterModel = this.filterItems[1].name;
        break;
      case 2:
        this.filterModel = this.filterItems[1].name;

        this.isLoading = true;
        this.page = 1;
        options = {
          EntityType: 55,
          page: this.page,
          ParentID: this.id,
          IsUnanswered: false
        }

        if(this.spaceId){
          options['SpaceID'] = this.spaceId;
        }

        this.items = [];

        this.contentProvider.getContentByEntity(options)
          .finally(() => {
            this.isLoading = false;
          })
          .subscribe(response => {
            this.items = this.items.concat(response.ResponseData);
          }, err => {
          });

        break;
      case 3:
        this.filterModel = this.filterItems[2].name;

        this.isLoading = true;
        this.page = 1;
        options = {
          EntityType: 55,
          page: this.page,
          ParentID: this.id,
          IsUnanswered: true
        }

        if(this.spaceId){
          options['SpaceID'] = this.spaceId;
        }

        this.items = [];

        this.contentProvider.getContentByEntity(options)
          .finally(() => {
            this.isLoading = false;
          })
          .subscribe(response => {
            this.items = this.items.concat(response.ResponseData);
          }, err => {
          });

        break;
    }
  }

  createDiscussion(){
    this.navCtrl.push('discussion-create', {
      spaceId: this.spaceId,
      title: this.title,
      subTitle: this.subTitle
    });
  }

  search(infiniteScroll?: InfiniteScroll){    
    if(this.searchfilter.length === 0){
      this.items = [];
      this.page = 0;
      this.getContent();
      return 0;
    }
    if(infiniteScroll){
      this.infinteScroll = infiniteScroll;
    } else {
      this.page = 0;
      this.items = [];
    }
    if (this.items.length != 0 && this.items.length < 10){
      infiniteScroll.enable(false);
      return 0;
    }
    ++this.page;

    if (!infiniteScroll) {
      this.isLoadingSearch = true;
    }

    let options = {
      EntityType: 55,
      page: this.page,
    }

    if (this.spaceId) {
      options['SpaceID'] = this.spaceId;
    }

    this.contentProvider.searchByParent(this.searchfilter, 55, this.page, this.spaceId, this.id)
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
        console.log('-------------');
        console.log(response);
        this.items = this.items.concat(response.ResponseData);
        if (infiniteScroll && response.ResponseData.length < 10){
          infiniteScroll.enable(false);
        }
      }, err => {
        if (infiniteScroll) {
          infiniteScroll.enable(false)
        }
      });
  }

  bsearchbar: any;
  showSearchBar() {
    this.bsearchbar = true;
  }
  onCancel(){
    this.bsearchbar = false;
    this.searchfilter = "";
    this.page = 0;
    this.items = [];
    this.getContent();
  }
}
