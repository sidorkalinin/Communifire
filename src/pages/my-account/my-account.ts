import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, Refresher, InfiniteScroll, NavController, MenuController } from 'ionic-angular';
import { ContentProvider } from "../../providers/content";
import { TapticEngine } from '@ionic-native/taptic-engine';
import { Vibration } from '@ionic-native/vibration';
import { Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from "@ionic-native/network";
import { Content } from 'ionic-angular';

@IonicPage({
  name: 'page-my-account',
  segment: "my-account/:type"
})
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html'
})
export class MyAccountPage {
  account: string = 'activity';
  @ViewChild(Content) content: Content;
  scrollAmountActivity: any;
  scrollAmountTicker: any;
  scrollAmountNotification: any;
  ionViewCanEnter() {
    if (!this.authenticationProvider.getToken()) {
      this.navCtrl.setRoot('login');
    } else {
      this.menu.enable(true, 'authenticated');
      this.splashScreen.hide();
    }
  }

  vibrate() {
    if (this.platform.is("android")) {
      this.vibration.vibrate(50);
    }
  }

  constructor(
    public navParams: NavParams,
    private contentProvider: ContentProvider,
    public taptic: TapticEngine,
    private navCtrl: NavController,
    private menu: MenuController,
    private authenticationProvider: AuthenticationProvider,
    private splashScreen: SplashScreen,
    public vibration: Vibration,
    public platform: Platform,
    public statusBar: StatusBar,
    public network: Network
  ) {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
    this.account = this.navParams.get('type');
    // this.statusBar.styleDefault();
  }

  /**
   * Default case
   */
  private page = 0;
  activities = [];
  isLoading: boolean = false;

  // Change tabs on My Account page event
  changeSegment($event) {        
    if (this.account === 'activity' && this.activities.length == 0) {
      this.doInfinite();
    }
    if (this.account === 'ticker' && this.tickers.length == 0) {
      this.getuserTickers();
    }
    if (this.account === 'notification' && this.notifications.length == 0) {
      this.doNotification();
    }
    if(this.account == 'activity') {
      if(this.scrollAmountActivity == undefined) {
        this.scrollAmountActivity = 0;
      }
      this.content.scrollTo(0, this.scrollAmountActivity, 100);
    } else if(this.account == 'ticker') {
      if(this.scrollAmountTicker == undefined) {
        this.scrollAmountTicker = 0;
      }
      this.content.scrollTo(0, this.scrollAmountTicker, 100);
    } else if(this.account == 'notification') {
      if(this.scrollAmountNotification == undefined) {
        this.scrollAmountNotification = 0;
      }
      this.content.scrollTo(0, this.scrollAmountNotification, 100);
    }
  }

  scrollHandler(event) {
    if(this.account == 'notification') {
      this.scrollAmountNotification = event.scrollTop;
    } else if(this.account == 'activity') {
      this.scrollAmountActivity = event.scrollTop;
    } else if(this.account == 'ticker') {
      this.scrollAmountTicker = event.scrollTop;
    }
  }

  ngOnInit() {
    if (this.account === 'notification') {
      this.isLoadingNotifications = true;
      this.doNotification();
    }
    if (this.account === 'activity') {
      this.doInfinite();
    }
  }

  refreshPage($event) {
    if ($event.result) {
      if (this.activities.length >= 10) {
        this.activities.pop();
      }
      this.activities.unshift($event);
      this.doRefresh(null);
    }
  }

  doRefresh(refresh: Refresher) {
    if (refresh) {
      this.taptic.impact({ style: 'light' });
      this.vibrate();
      this.isLoading = false;
      this.page = 1;
      this.getActivitites()
        .finally(() => {
          refresh.complete();
        })
        .subscribe(res => {
          this.activities = res.ResponseData;
        }, err => refresh.complete());
    }else {
      this.getActivitites()
        .finally(() => {
        })
        .subscribe(res => {
          this.activities = res.ResponseData;
        }, err =>  console.log(err));
    }
  }

  doInfinite(infiniteScroll?: InfiniteScroll) {
    if (!infiniteScroll) {
      this.isLoading = true;
    }

    this.page++;

    this.getActivitites()
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
      .subscribe(this.handleuserActivities.bind(this), err => infiniteScroll.enable(false));
  }

  private getActivitites() {
    return this.getUserActivities(this.page);
  }

  private handleuserActivities(response) {
    this.activities = this.activities.concat(response.ResponseData);
  }

  private getUserActivities(page: number) {
    return this.contentProvider.getAccountActivity(page);
  }

  // Ticker
  tickers: any = [];
  isLoadingTicker: boolean = true;

  pageTicker: number = 0;
  infiniteScrollTicker: InfiniteScroll;

  doRefreshTicker(refresh: Refresher) {
    if (refresh) {
      this.taptic.impact({ style: 'light' });
      this.vibrate();

      this.isLoadingTicker = false;
      this.pageTicker = 1;
      if (this.infiniteScrollTicker) {
        this.infiniteScrollTicker.enable(true);
      }

      this.contentProvider.getUserTicker(this.pageTicker).subscribe(response => {
        if (response.ResponseData) {
          this.tickers = response.ResponseData;
          refresh.complete();
        }
      });
    }
  }

  getuserTickers(infiniteScroll?: InfiniteScroll) {
    ++this.pageTicker;

    if (infiniteScroll) {
      this.infiniteScrollTicker = infiniteScroll;
    }

    this.contentProvider.getUserTicker(this.pageTicker)
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        } else {
          this.isLoadingTicker = false;
        }
      })
      .do((response: any) => {
        if (!response.ResponseData.length && infiniteScroll) {
          infiniteScroll.enable(false);
        }
        if (infiniteScroll && response.ResponseData.length && response.ResponseData.length < 20) {
          infiniteScroll.enable(false);
        }
      })
      .subscribe(response => {
        if (response.ResponseData) {
          this.tickers = this.tickers.concat(response.ResponseData);
        }
      });
  }

  // Notifications
  public pageNotifications = 0;
  notifications = [];
  isLoadingNotifications: boolean = false;
  infiniteScrollNotifications: InfiniteScroll

  doRefreshNotifications(refresh: Refresher) {
    if (refresh) {
      this.taptic.impact({ style: 'light' }); this.vibrate();
      this.pageNotifications = 1;
      if (this.infiniteScrollNotifications) {
        this.infiniteScrollNotifications.enable(true);
      }
      this.contentProvider.getUserNotification(this.pageNotifications)
        .subscribe((response) => {
          this.notifications = response.ResponseData;
          refresh.complete();
        });
    }
  }

  doNotification(infiniteScroll?: InfiniteScroll) {
    if (infiniteScroll) {
      this.infiniteScrollNotifications = infiniteScroll;
    }
    if (!infiniteScroll) {
      this.isLoadingNotifications = true;
    }

    this.pageNotifications++;
    this.getNotification()
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        } else {
          this.isLoadingNotifications = false;
        }
      })
      .do((response: any) => {
        if (!response.ResponseData.length && infiniteScroll) {
          infiniteScroll.enable(false);
        }
      })
      .subscribe(this.handleNotification.bind(this), err => infiniteScroll.enable(false));
  }

  private getNotification() {
    return this.contentProvider.getUserNotification(this.pageNotifications)
  }

  private handleNotification(response) {
    this.notifications = this.notifications.concat(response.ResponseData);
  }

}
