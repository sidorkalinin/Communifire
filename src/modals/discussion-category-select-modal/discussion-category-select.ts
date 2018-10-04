import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, Refresher, ViewController } from 'ionic-angular';
import { ContentProvider } from '../../providers/content';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { TapticEngine } from '@ionic-native/taptic-engine'; 
import { Vibration } from '@ionic-native/vibration'; 
import { Platform } from 'ionic-angular';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'discussion-category-select-modal',
  templateUrl: 'discussion-category-select.html',
})
export class DiscussionCategorySelectModal implements OnInit {

  spaceId: number = this.navParams.get('spaceid');
  userId: number = this.navParams.get('userid');
  id: any = this.navParams.get('id');
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
     private viewCtrl:ViewController,
     public device: Device,
    ) {
      if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
        this.isIphoneX = true;
      }
  }
  isIphoneX:boolean = false;

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
    if(infiniteScroll){
      this.infinteScroll = infiniteScroll;
    }
    if(this.categories.length > 0 && this.categories.length < 10 && infiniteScroll){
      infiniteScroll.enable(false);
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
      //options['UserID'] = this.userId;
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
        console.log(response);
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

  back(){
    this.viewCtrl.dismiss();
  }
  notifySelect(item){
    this.viewCtrl.dismiss(item);
  }
}
