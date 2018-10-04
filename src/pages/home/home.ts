import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, MenuController, InfiniteScroll, LoadingController, Refresher } from 'ionic-angular';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';

import { AuthenticationProvider } from '../../providers/authentication';
import { ContentProvider } from '../../providers/content';
import { SpacesProvider } from '../../providers/spaces';
import { TapticEngine } from '@ionic-native/taptic-engine'; 
import { Vibration } from '@ionic-native/vibration'; 
import { Platform } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from "@ngx-translate/core";


@IonicPage({
  name: 'home'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  private page: number = 0;
  activities = [];
  currentSpace: any = 'null';
  spacesList: any = [];
  isLoading: boolean = false;
  isLoadingFirst: boolean = true;
  infiniteScrollTemp: InfiniteScroll;
  selectOptions: any = {
    title: ""
  }

  menuClick(){
    console.log('menu');
  }

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    private authenticationProvider: AuthenticationProvider,
    private contentProvider: ContentProvider,
    public loadingCtrl: LoadingController,
    private spacesProvider: SpacesProvider,
    public taptic: TapticEngine,
    public splashScreen: SplashScreen,
    public translate: TranslateService,
    public vibration: Vibration,
    public platform: Platform
  ) { 
    this.translate.get("SPACEDETAILS.SELECT_SPACE").subscribe(trans => {
      this.selectOptions.title = trans;
    });
  }

  ionViewCanEnter() {
    if(!this.authenticationProvider.getToken()) {
      this.navCtrl.setRoot('login');
    } else {
      this.menu.enable(true, 'authenticated');
      this.splashScreen.hide();
    }
  }

  ngOnInit() {
    this.getNextPageForSpace();
    this.getMySpaces();
  }

  vibrate(){
    if(this.platform.is("android")){
      this.vibration.vibrate(50);
    }
  }

  private getMySpaces () {
    this.spacesProvider.getMySpaces().subscribe((res) => {
      this.spacesList = res;
    });
  }

  refresherGlobal: Refresher;

  doRefresh(refresh: Refresher){
    if (refresh){
      this.refresherGlobal = refresh;
      this.taptic.impact({ style: 'light' });
      this.vibrate();
      this.changeSpace();
      // refresh.complete();
    }
  }

  changeSpace(){
    this.page = 0;
    this.activities = [];
    if (!this.refresherGlobal){
      this.isLoadingFirst = true;
    }
    if (this.currentSpace == 0) {
      this.getNextPage();
    } else {
      this.getNextPageForSpace();
    }
  }

  getNextPageForSpace(infiniteScroll?: InfiniteScroll){
    if (this.activities.length > 0 && this.activities.length < 10 && infiniteScroll) {
      infiniteScroll.enable(false);
    }
    this.page++;

    if (this.infiniteScrollTemp){
      this.infiniteScrollTemp.enable(true);
    }

    if (!infiniteScroll){
      this.isLoading = true;
    } else {
      this. infiniteScrollTemp = infiniteScroll;
    }

    this.contentProvider.getContentBySpace(this.currentSpace, this.page, 10)
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        } else {
          this.isLoading = false;
          this.isLoadingFirst = false;
        }
        if(this.refresherGlobal){
          this.refresherGlobal.complete();
          this.refresherGlobal = null;
        }
      })
      .do((response: any) => {
        if (!response.ResponseData.length && infiniteScroll) {
          infiniteScroll.enable(false);
        }
      })
      .subscribe(response => {
        if(this.page == 1){
          this.activities = [];
        }
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

  /**
   * This will increment this.page number
   * and fetch the page
   * @param infiniteScroll (Optional)
   */
  getNextPage (infiniteScroll?: InfiniteScroll) {

    this.page++;

    if (!infiniteScroll){
      this.isLoading = true;
    }

    this.contentProvider.getActivitiesForMySpace(this.page)
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        } else {
          this.isLoading = false;
          this.isLoadingFirst = false;
        }
        if(this.refresherGlobal){
          this.refresherGlobal.complete();
          this.refresherGlobal = null;
        }
      })
      .do((response: any) => {
        if (!response.ResponseData.length && infiniteScroll) {
          infiniteScroll.enable(false);
        }
      })
      .subscribe(response => {
        if(this.page == 1){
          this.activities = [];
        }
        this.activities = this.activities.concat(response.ResponseData);
      }, err => {
        if (infiniteScroll) {
          infiniteScroll.enable(false)
        }
      });
  }
}
