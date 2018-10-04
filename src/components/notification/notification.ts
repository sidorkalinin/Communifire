import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { COMMON_URLS } from '../../util/constants';

@Component({
  selector: 'notification',
  templateUrl: 'notification.html'
})
export class NotificationComponent {
  @Input() notification;
  avatarImageURL: string;

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.avatarImageURL = COMMON_URLS.AVATAR_DEFAULT_IMAGE;
  }

  notificationClick() {
    console.log(this.notification);
    let data = {
      id: this.notification.EntityID,
    };

    let data2;
    let component;
    switch (this.notification.EntityType) {
      case 3:
        component = 'articles';
        break;
      case 4:
        component = 'blogs';
        break;
      case 5:
        component = 'events';
        break;
      case 6:
        component = 'photos';
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
        if (this.notification.ActivityAction == 15) {
          component = 'page-invite';
          data2 = {
            additionalData: {
              entityID: this.notification.EntityID,
              parentEntityID: this.notification.ParentEntityID,
              spaceID: this.notification.SpaceID,
              entityType: this.notification.EntityType,
              activityAction: this.notification.ActivityAction
            },
            message: this.notification.NewsFeedText
          }
        } else if (this.notification.ActivityAction == 13) {
          component = 'manage-friend';
          data2 = {
            isRequest: true
          }
        } else if (this.notification.ActivityAction == 55) {
          component = 'manage-user';
          data2 = {
            id: this.notification.SpaceID
          }
        } else if (this.notification.ActivityAction == 59) {
          component = 'space-details';
          data.id = this.notification.SpaceID;
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
        data.id = this.notification.ParentEntityID;
        break;
      case 55:
        component = 'discussion-item';
        break;
      case 54:
        component = "discussion-item";
        data.id = this.notification.ParentEntityID;
        break;
      case 24:
        component = 'articles';
        data.id = this.notification.ParentEntityID;
        break;
      case 25:
        component = 'blogs';
        data.id = this.notification.ParentEntityID;
        break;
      case 26:
        component = 'events';
        data.id = this.notification.ParentEntityID;
        break;
      case 28:
        component = 'photos';
        data.id = this.notification.ParentEntityID;
        break;
      case 29:
        component = 'videos';
        data.id = this.notification.ParentEntityID;
        break;
      case 31:
        component = 'wikis';
        data.id = this.notification.ParentEntityID;
        break;
      case 45:
        component = 'ideas';
        data.id = this.notification.ParentEntityID;
        break;
      case 32:
        component = 'files';
        data.id = this.notification.ParentEntityID;
        break;
      case 64:
        component = 'announcement-detail';
        data2 = {
          SpaceID: this.notification.SpaceID,
          title: this.notification.SpaceName,
          EntityID: this.notification.EntityID
        }
        break;
      case 10:
        component = 'wallpost';
        data.id = this.notification.EntityID;
        break;
    }
    if (component) {
      if ((this.notification.EntityType == 15) && (this.notification.ActivityAction == 15)) {
        this.navCtrl.push(component, { data: data2 });
      } else if ((this.notification.EntityType == 15) && (this.notification.ActivityAction == 55 || this.notification.ActivityAction == 13)) {
        this.navCtrl.push(component, data2);
      } else if (this.notification.EntityType == 64) {
        this.navCtrl.push(component, data2);
      } else {
        this.navCtrl.push(component, data);
      }
    }
  }

}
