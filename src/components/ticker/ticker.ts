import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { COMMON_URLS } from '../../util/constants';

@Component({
  selector: 'ticker',
  templateUrl: 'ticker.html'
})
export class TickerComponent {
  @Input() ticker;
  avatarImageURL: string;

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.avatarImageURL = COMMON_URLS.AVATAR_DEFAULT_IMAGE;
  }

  getText(text?: string) {
    if (text) {
      return text.replace(/<a([^>]+)>|<\/a>/g, '');
    }
  }

  tickerClick() {
    console.log(this.ticker);
    let data = {
      id: this.ticker.ActivityEntityID
    };
    let component;
    let data2;
    switch (this.ticker.ActivityEntityTypeID) {
      case 3:
        component = 'articles';
        break;
      case 4:
        component = 'blogs';
        break;
      case 5:
        component = 'events';
        break;
      case 7:
        component = 'videos';
        break;
      case 9:
        component = 'wikis';
        break;
      case 44:
        component = 'ideas';
        break;
      case 14:
        component = 'files';
        break;
      case 15:
        if (this.ticker.ActivityAction == 15) {
          component = 'page-invite';
          data2 = {
            additionalData: {
              entityID: this.ticker.EntityID,
              parentEntityID: this.ticker.ParentEntityID,
              spaceID: this.ticker.Space.SpaceID,
              entityType: this.ticker.EntityType,
              activityAction: this.ticker.ActivityAction
            },
            message: this.ticker.NewsFeedText
          }
        } else if (this.ticker.ActivityAction == 13) {
          component = 'manage-friend';
          data2 = {
            isRequest: true
          }
        } else if (this.ticker.ActivityAction == 55) {
          component = 'manage-user';
          data2 = {
            id: this.ticker.Space.SpaceID
          }
        }
        break;
      case 18:
        component = "photos";
        break;
      case 19:
        component = "cases";
        break;
      case 20:
        component = "cases";
        data.id = this.ticker.ParentEntityID;
        break;
      case 54:
        component = "discussion-item";
        data.id = this.ticker.ParentEntityID;
        break;
      case 24:
        component = 'articles';
        data.id = this.ticker.ParentEntityID;
        break;
      case 25:
        component = 'blogs';
        data.id = this.ticker.ParentEntityID;
        break;
      case 26:
        component = 'events';
        data.id = this.ticker.ParentEntityID;
        break;
      case 28:
        component = 'photos';
        data.id = this.ticker.ParentEntityID;
        break;
      case 29:
        component = 'videos';
        data.id = this.ticker.ParentEntityID;
        break;
      case 31:
        component = 'wikis';
        data.id = this.ticker.ParentEntityID;
        break;
      case 45:
        component = 'ideas';
        data.id = this.ticker.ParentEntityID;
        break;
      case 55:
        component = 'discussion-item';
        break;
      case 32:
        component = 'files';
        data.id = this.ticker.ParentEntityID;
        break;
      case 64:
        component = 'page-space-announcement';
        data2 = {
          SpaceID: this.ticker.SpaceID,
          title: this.ticker.SpaceName
        }
        break;
      case 10:
        component = 'wallpost';
        data.id = this.ticker.ActivityEntityID;
        break;
    }
    if (component) {
      if ((this.ticker.ActivityEntityType == 15) && (this.ticker.ActivityAction == 15)) {
        this.navCtrl.push(component, { data: data2 });
      } else if ((this.ticker.ActivityEntityType == 15) && (this.ticker.ActivityAction == 55 || this.ticker.ActivityAction == 13)) {
        this.navCtrl.push(component, data2);
      } else if (this.ticker.ActivityEntityType == 64) {
        this.navCtrl.push(component, data2);
      } else {
        this.navCtrl.push(component, data);
      }
    }
  }

}
