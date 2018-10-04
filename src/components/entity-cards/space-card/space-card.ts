import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'space-card',
  templateUrl: 'space-card.html'
})
export class SpaceCardComponent implements OnChanges{

  @Input() space;
  private checkUrl: RegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  private communityUrl: string = localStorage.getItem('community_url');
  likesCount: any;

  constructor(
    public navCtrl: NavController,
  ) { }

  ngOnChanges (changes: SimpleChanges) {
    if (changes.space.currentValue) {
      const spaceImage = this.space.TitleImageURL;

      if (spaceImage && spaceImage.length) {
        if (!this.checkUrl.test(spaceImage)) {
          this.space.TitleImageURL = this.communityUrl + spaceImage;
        }
      }
    }
  }

  setCount($event){
    this.likesCount = $event;
  }

  goToSpace() {
    this.navCtrl.push('space-details', {
      id: this.space.ActivityEntityID
    });
  }

  goToProfile() {
    this.navCtrl.push('profile', {
      id: this.space.UserID
    });
  }

}
