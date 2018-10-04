import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

/**
 * Generated class for the SearchActivityCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search-activity-card',
  templateUrl: 'search-activity-card.html'
})
export class SearchActivityCardComponent {
  @Input() activity;
  private checkUrl: RegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  private communityUrl: string = localStorage.getItem('community_url');
  likesCount: any;
  
  constructor (
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {    
  }

  ngOnChanges (changes: SimpleChanges) {
    
  }

  goToEntity() {
    console.log(this.activity);
    if (this.activity.EntityType == 44){
      this.navCtrl.push('ideas', {
        id: this.activity.ContentID
      })
      return 0;
    }
    if (this.activity.EntityType == 7){
      this.navCtrl.push('videos', {
        id: this.activity.ContentID
      })
      return 0;
    }
    if (this.activity.EntityType == 3){
      this.navCtrl.push('articles', {
        id: this.activity.ContentID
      })
      return 0;
    }
    if (this.activity.EntityType == 4){
      this.navCtrl.push('blogs', {
        id: this.activity.ContentID
      })
      return 0;
    }
    if (this.activity.EntityType == 5){
      this.navCtrl.push('events', {
        id: this.activity.ContentID
      })
      return 0;
    }
    if (this.activity.EntityType == 9){
      this.navCtrl.push('wikis', {
        id: this.activity.ContentID
      })
      return 0;
    }
    if (this.activity.EntityType == 18){
      this.navCtrl.push('photos', {
        id: this.activity.ContentID,
        title: this.activity.SpaceName
      })
      return 0;
    }
    if (this.activity.EntityType == 19){
      this.navCtrl.push('cases', {
        id: this.activity.ContentID,
      })
      return 0;
    }
    if (this.activity.EntityType == 1){
      if(this.activity.SpaceID == 0){
        this.navCtrl.push('discussion-category', {
          id: this.activity.ContentID,
          title: this.activity.AuthorDisplayName,
          subTitle: this.activity.ContentTitle
        })
      } else {
        this.navCtrl.push('discussion-category', {
          id: this.activity.ContentID,
          title: this.activity.SpaceName,
          subTitle: this.activity.ContentTitle
        })
      }
      return 0;
    }
    if (this.activity.EntityType == 54){
      this.navCtrl.push('discussion-item',{
        id: this.activity.ContentID
      })
      return 0;
    }
    if (this.activity.EntityType == 14){
      this.navCtrl.push('files',{
        id: this.activity.ContentID
      })
      return 0;
    }
    if (this.activity.EntityType == 6){
      this.navCtrl.push('photos',{
        id: this.activity.ParentContentID
      })
      return 0;
    }
    if(this.activity.EntityType == 15) {
      this.navCtrl.push('profile', {
        id: this.activity.ContentID
      })
      return 0;
    }
  }

  goToProfile() {
    let id = 0;
    if(this.activity.AuthorID){
      id = this.activity.AuthorID;
    } else {
      id = this.activity.AuthorUserID;
    }
    this.navCtrl.push('profile', {
      id: id
    });
  }
}
