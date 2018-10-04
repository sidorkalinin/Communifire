import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CommentModalComponent } from '../../comment-modal/comment-modal';

@Component({
  selector: 'event-card',
  templateUrl: 'event-card.html'
})
export class EventCardComponent implements OnChanges{
  @Input() activity;
  private checkUrl: RegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  private communityUrl: string = localStorage.getItem('community_url');
  likesCount: any;
  userId: number = null;

  constructor( 
    private navCtrl: NavController,
    public modalCtrl: ModalController
  ) {
    
  }

  // A callback method that is invoked immediately after the default change detector has checked data-bound properties 
  // if at least one has changed, and before the view and content children are checked.
  // changes - The changed property.
  // changes.prop contains the old and the new value.
  ngOnChanges (changes: SimpleChanges) {
    if (changes.activity.currentValue) {
      const activityImage = this.activity.TitleImageURL;

      if (activityImage && activityImage.length) {
        if (!this.checkUrl.test(activityImage)) {
          this.activity.TitleImageURL = this.communityUrl + activityImage;
        }
      }
    }    
  }

  goToArticle() {
    this.navCtrl.push('events', {
      id: this.activity.ActivityEntityID
    });
  }

  setCount($event){
    this.likesCount = $event;
  }


  goToProfile() {
    this.navCtrl.push('profile', {
      id: this.activity.UserID
    });
  }

  openComment() {
    let modal = this.modalCtrl.create(CommentModalComponent, { entity: this.activity });
    modal.present();
  }
}
