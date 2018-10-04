import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Refresher } from 'ionic-angular';
import { SpacesProvider } from '../../../providers/spaces';
import { Vibration } from '@ionic-native/vibration';
import { Platform } from 'ionic-angular';

@IonicPage({
  name: 'page-space-announcement'
})
@Component({
  selector: 'page-space-announcement',
  templateUrl: 'space-announcement.html',
})
export class SpaceAnnouncementPage {
  spaceID = this.navParams.get('SpaceID');
  title = this.navParams.get('title');
  announcements: any = [];
  isLoading: boolean = false;
  isRefresh: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public spaceProvider: SpacesProvider,
    public vibration: Vibration,
    public platform: Platform,
  ) {
    this.getAnnouncements();
    if(!this.title) {
      this.getSpaceTitle();
    }
  }

  ionViewDidLoad() {
    
  }

  vibrate() {
    if (this.platform.is("android")) {
      this.vibration.vibrate(50);
    }
  }

  doRefreshAnnouncements(refresher?: Refresher) {
    this.isRefresh = true;
    this.vibrate();
    this.spaceProvider.getAnnouncements(this.spaceID)
      .finally(() => {
        this.isRefresh = false;
        refresher.complete();
      })
      .subscribe(res => {
        this.isRefresh = false;
        if(res.IsError == false) {
          if(res.ResponseData) {
            this.announcements = res.ResponseData;
          }
        }
      })
  }
  getAnnouncements(infiniteScroll?: InfiniteScroll) {
    this.isLoading = true;
    this.spaceProvider.getAnnouncements(this.spaceID)
      .finally(() => {
        this.isLoading = false;
      })
      .subscribe(res => {
        this.isLoading = false;
        console.log(res);
        if(res.IsError == false) {
          if(res.ResponseData) {
            this.announcements = res.ResponseData;
          }
        }
      })
  }
  gotoDetail(item) {
    this.navCtrl.push('announcement-detail', {
      SpaceID: this.spaceID,
      title: this.title,
      EntityID: item.PropertyID
    });
  }
  getSpaceTitle() {
    this.spaceProvider.getSpace(this.spaceID)
    .subscribe(res => {
      this.title = res.SpaceName;
    })
  }
}
