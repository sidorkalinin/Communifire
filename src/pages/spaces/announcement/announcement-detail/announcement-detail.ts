import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Refresher } from 'ionic-angular';
import { SpacesProvider } from '../../../../providers/spaces';

/**
 * Generated class for the AnnouncementDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'announcement-detail'
})
@Component({
  selector: 'page-announcement-detail',
  templateUrl: 'announcement-detail.html',
})
export class AnnouncementDetailPage {
  spaceID = this.navParams.get('SpaceID');
  title = this.navParams.get('title');
  EntityID = this.navParams.get('EntityID');
  isLoading: boolean = false;
  item: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,  
    public spaceProvider: SpacesProvider
  ) {
    this.getAnnouncements();
    if(this.spaceID == 0) {
      this.spaceProvider.getSpace(0)
      .subscribe(space =>{
        this.title = space.SpaceName;
      })
    }
  }

  getAnnouncements(infiniteScroll?: InfiniteScroll) {
    this.isLoading = true;
    this.spaceProvider.getAnnouncements(this.spaceID)
      .finally(() => {
        this.isLoading = false;
      })
      .subscribe(res => {
        console.log(res);
        this.isLoading = false;
        if(res.IsError == false) {
          let list = res.ResponseData;
          console.log(list);
          for(var i = 0; i < list.length; i++) {
            if(list[i].PropertyID == this.EntityID) {
              this.item = list[i];
            }
          }
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnouncementDetailPage');
  }

}
