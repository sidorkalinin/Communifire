import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication';
import { NotificationHelper } from '../../util/notification-helper';
import { Events } from 'ionic-angular';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { TranslateService } from '@ngx-translate/core';

@IonicPage({
  name: 'page-settings',
  segment: 'page-settings'
})

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {

  isPushNotificationEnabled: boolean = false;
  
  lang: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authenticationProvider: AuthenticationProvider,
    private notificationHelper: NotificationHelper,
    public events: Events,
    private appCenterAnalytics: AppCenterAnalytics,
    public translate: TranslateService,
    public platform: Platform,
  ) {
    this.isPushNotificationEnabled = this.authenticationProvider.isPushNotificationEnabled();
    console.log("isPushNotificationEnabled: ", this.isPushNotificationEnabled);

    this.appCenterAnalytics.isEnabled().then( (b) => {
      if(b){
        this.appCenterAnalytics.trackEvent('Setting Pgae Load Event.', { userid: localStorage.getItem('UserID') }).then(() => {
          console.log('Setting Pgae Load Event tracked');
        });
      }
    })

    if(localStorage.getItem('language')) {
      this.lang = Number(localStorage.getItem('language'));
    } else {
      this.lang = 1;
    }
  }

  public notificationChanged() {
    console.log("Toggled: " + this.isPushNotificationEnabled);
    if (!this.isPushNotificationEnabled) {
      this.notificationHelper.unsubscribePushNotifications();
    }
    else {

      this.authenticationProvider.setPushNotificationsOn();

      this.events.publish('settings:initPushNotification');
    }
  }

  selectLanguage(language) {
    this.lang = language;
    localStorage.setItem('language', this.lang);
    switch(this.lang) {
      case "1":
        this.translate.use('en');
        this.platform.setDir('ltr', true);
        break;
      case "2":
        this.translate.use('de');
        this.platform.setDir('ltr', true);
        break;
      case "3":
        this.translate.use('ar');
        this.platform.setDir('rtl', true);
        break;
      default:
        this.translate.use('en');
        break;
    }
  }
}
