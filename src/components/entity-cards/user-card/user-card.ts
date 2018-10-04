import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'user-card',
  templateUrl: 'user-card.html'
})
export class UserCardComponent  implements OnChanges{
  @Input() activity;
  private checkUrl: RegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  private communityUrl: string = localStorage.getItem('community_url');

  constructor( public navCtrl: NavController) { }

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
    if (this.activity.ActivityEntityTypeID === 13) {
      this.navCtrl.push('space-details', {
        id: this.activity.ActivityEntityID
      });
    } else {
      this.navCtrl.push('article', {
        id: this.activity.ActivityEntityID
      });
    }
  }

  goToProfile() {
    this.navCtrl.push('profile', {
      id: this.activity.UserID
    });
  }
}
