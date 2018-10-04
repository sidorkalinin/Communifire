import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, ToastController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationProvider } from '../providers/authentication';
import { NotificationHelper } from '../util/notification-helper';
import { Events } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Badge } from "@ionic-native/badge";
import { PhotoSingleModalComponent } from "./../components/photo-single-modal/photo-single-modal";
import { Network } from "@ionic-native/network";
import { AppCenterCrashes } from '@ionic-native/app-center-crashes';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { Deeplinks } from '@ionic-native/deeplinks';
import { ArticleListPage } from '../pages/articles/article-list/article-list';
import { BlogListPage } from '../pages/blogs/blog-list/blog-list';

@Component({
  templateUrl: 'app.html',
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class CfApp {
  @ViewChild(Nav) nav: Nav;
  rootPage;
  pages: Array<{ title: string, component?: any, action?: string, icon?: string, param?: string }>;
  userInfo: any = {};
  isIphoneX: boolean = false;
  isAndroid: boolean = false;
  isIpad: boolean = false;

  constructor(
    private translate: TranslateService,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private authenticationProvider: AuthenticationProvider,
    private alertCtrl: AlertController,
    private notificationHelper: NotificationHelper,
    private toastCtrl: ToastController,
    public events: Events,
    public device: Device,
    public androidFullscreen: AndroidFullScreen,
    public iab: InAppBrowser,
    public badge: Badge,
    public modalCtrl: ModalController,
    public network: Network,
    private appCenterCrashes: AppCenterCrashes,
    private appCenterAnalytics: AppCenterAnalytics,
    private screenOrientation: ScreenOrientation,
    private deeplinks: Deeplinks,
    private keyboard: Keyboard
  ) {

    this.platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      // SET PORTRAIT      
      if (this.platform.is('android')) {
        console.log('lock');
      }
      // this.splashScreen.hide();
      this.badge.clear();
      // this.statusBar.styleDefault();

      // Platform now ready, execute any required native code
      if (this.platform.is('cordova')) {
        console.log('app ', this.nav);
        this.notificationHelper.initPushNotification(this.nav);
      }

      if (this.platform.is('android')) {
        this.keyboard.hideKeyboardAccessoryBar(true);
        // this.statusBar.show();
        this.isAndroid = true;
      }

      if (this.platform.is('ios')) {
        this.keyboard.disableScroll(true);
        let
          appEl = <HTMLElement>(document.getElementsByTagName('ION-APP')[0]),
          appElHeight = appEl.clientHeight;

        window.addEventListener('native.keyboardshow', (e) => {
          appEl.style.height = (appElHeight - (<any>e).keyboardHeight) + 'px';
        });

        window.addEventListener('native.keyboardhide', () => {
          appEl.style.height = '100%';
        });
      }

      if (this.platform.is('ipad')) {
        this.isIpad = true;
      }

      // The meoment user is logged in the event "user:loggedin" will be fired fronm login.ts and
      // that event will be captured here to set userInfo object
      events.subscribe('user:loggedin', (user) => {
        this.userInfo = user;
      });

      events.subscribe('settings:initPushNotification', () => {
        this.notificationHelper.initPushNotification(this.nav);
      });

      if (this.network.type === "none") {
        let connectionToast;
        this.translate.get("COMMONS.NO_INTERNET_CONNECTION").subscribe((text) => {
          connectionToast = this.toastCtrl.create({
            message: text
          });
          connectionToast.present();
        });
        this.splashScreen.hide();
        this.network.onConnect().subscribe(() => {
          this.initApp();
          if (connectionToast) {
            connectionToast.dismiss();
          }
        });
      }

      this.deeplinks.route({
        '/articles': ArticleListPage,
        '/blogs': BlogListPage
      }).subscribe((match) => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        console.log('Successfully matched route', match);
      },
        (nomatch) => {
          // nomatch.$link - the full link data
          console.error('Got a deeplink that didn\'t match', nomatch);
        });

    });

  }

  goToProfile() {
    this.nav.push('profile', {
      id: this.userInfo.UserID
    });
  }
  menuClosed() {
    this.events.publish('menu:closed', '');
  }

  menuOpened() {
    this.events.publish('menu:opened', '');
  }
  ngOnInit() {
    // Initialize i18n
    // this.initTranslate();

    // //let self = this;

    // // Declare App Pages.
    // this.pages = [
    //   { title: 'NAV.ACCOUNT', component: 'page-my-account', icon: "user-circle-o", param: "activity" },
    //   { title: 'NAV.NOTIFICATIONS', component: 'page-my-account', icon: "bell-o", param: "notification" },
    //   { title: 'NAV.EVENTS', component: 'event-list', icon: "calendar" },
    //   // { title: 'NAV.TASKS', component: 'task-list', icon: 'tasks' },
    //   { title: 'NAV.SPACES', component: 'spaces', icon: "globe" },
    //   { title: 'NAV.PEOPLE', component: 'page-people', icon: "users" },
    //   { title: 'NAV.SEARCH', component: 'page-search', icon: "search" },
    //   { title: 'NAV.MESSAGES', component: 'chat', icon: "comment-o" },
    //   { title: 'NAV.SETTINGS', component: 'page-settings', icon: "cog" },
    //   { title: 'NAV.SIGNOUT', action: 'logOut', icon: "unlock-alt" }
    // ];

    this.initApp();
  }


  onUserDetailsFetched(user: any, self: any) {

    // self.presentToast("authenticationProvider.getMyDetails() fired");
    // console.log("authenticationProvider.getMyDetails() fired");
    // console.log("User email:", user.UserInfoDisplayName);
    // self.presentToast(user.UserInfoDisplayName);



    self.userInfo = user;

    // self.splashScreen.hide();
    if (user.UserName) {
      self.nav.setRoot('page-my-account', { type: "activity" });
    }

    if (self.platform.is('cordova')) {
      this.appCenterAnalytics.setEnabled(true).then(() => {
        this.appCenterAnalytics.trackEvent('User Log In.', { userid: localStorage.getItem('UserID') }).then(() => {
          console.log('Custom event tracked');
        });
      })
      this.appCenterCrashes.setEnabled(true).then(() => {
        console.log('AppCenterCrashConnected.');
        this.appCenterCrashes.lastSessionCrashReport().then(report => {
          console.log('Crash report', report);
        });
      });
    }
  }

  initApp() {
    // Initialize i18n
    this.initTranslate();

    let self = this;

    // Declare App Pages.
    this.pages = [
      { title: 'NAV.ACCOUNT', component: 'page-my-account', icon: "user-circle-o", param: "activity" },
      { title: 'NAV.NOTIFICATIONS', component: 'page-my-account', icon: "bell-o", param: "notification" },
      { title: 'NAV.EVENTS', component: 'event-list', icon: "calendar" },
      // { title: 'NAV.TASKS', component: 'task-list', icon: 'check-square-o' },
      { title: 'NAV.SPACES', component: 'spaces', icon: "globe" },
      { title: 'NAV.PEOPLE', component: 'page-people', icon: "users" },
      { title: 'NAV.SEARCH', component: 'page-search', icon: "search" },
      { title: 'NAV.MESSAGES', component: 'chat', icon: "comment-o" },
      { title: 'NAV.SETTINGS', component: 'page-settings', icon: "cog" },
      { title: 'NAV.SIGNOUT', action: 'logOut', icon: "unlock-alt" }
    ];

    if (self.authenticationProvider.getToken()) {
      // console.log("User getToken fired");
      // self.presentToast("User getToken fired");

      console.log("Fetching user details on app start");

      var user = self.authenticationProvider.getUserDetails();

      // If user details are already fetched, do not hit the /api/users/me again
      if (user != null) {
        console.log("User details are already there in app storage.");
        self.onUserDetailsFetched(user, self);
      }
      else {
        self.authenticationProvider.getMyDetails().subscribe(
          user => {
            console.log("User details fetched on app start");

            localStorage.setItem('UserID', user.UserID);
            self.authenticationProvider.setUser(user);

            self.onUserDetailsFetched(user, self);
          },
          error => {
            console.log("Error while fetching user details on app start");
            console.log(error);
            if (error.status === 401) {
              // Log out the user if 401 is thrown from server side based on stored Rest Api Key.
              self.forceLogout();
            }

          }
        );
      }
    } else {
      this.watchUser();
    }

    this.appLoaded();
  }

  appLoaded() {
    this.platform.ready().then(() => {
      if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
        this.isIphoneX = true;
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.      
      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString("#1E1E1E");
      } else if (this.platform.is('ios')) {
        this.statusBar.styleDefault();
      }
      this.splashScreen.hide();
      setTimeout(() => {
        this.screenOrientation.unlock();
      }, 3000);
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    // this.translate.setDefaultLang('en');

    // if (this.translate.getBrowserLang() !== undefined) {
    //   this.translate.use(this.translate.getBrowserLang());      
    // } else {
    //   this.translate.use('en'); // Set your language here
    // }
    let lang = Number(localStorage.getItem('language'));
    switch (lang) {
      case 1:
        this.translate.use('en');
        break;
      case 2:
        this.translate.use('ar');
        break;
      default:
        this.translate.use('en');
        break;
    }
    // this.translate.use('ar'); // Set your language here
  }

  // Navigate to a page or take an action as per input.
  openPage(page) {
    // this.nav.push(page.component, { type: "activity" });
    if (page['action']) {
      this[page.action]();
    } else {
      let data = {};
      if (page.param) {
        data['type'] = page.param;
      }
      if (this.nav.getActive().id === "chat") {
        this.nav.push(page.component, data);
      }
      this.nav.setRoot(page.component, data);
    }
  }

  forceLogout() {
    this.authenticationProvider.clearUser();
    if (this.platform.is('cordova')) {
      this.notificationHelper.unsubscribePushNotifications();
    }
    this.nav.setRoot('login');
  }

  // Logout user.
  logOut() {
    this.translate.get(["TOAST.SIGNOUT", "TOAST.DOYOUWANTTOSIGNOUT", "TOAST.CANCEL", "TOAST.OK"]).subscribe((res) => {
      console.log(res);
      const alert = this.alertCtrl.create({
        title: res['TOAST.SIGNOUT'],
        subTitle: res['TOAST.DOYOUWANTTOSIGNOUT'],
        buttons: [
          {
            text: res['TOAST.CANCEL'],
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: res['TOAST.OK'],
            handler: () => {
              this.forceLogout();
            }
          }
        ]
      });
      alert.present();
    });
  }

  /**
   * Start watching for the currently logged in user.
   */
  watchUser() {
    this.authenticationProvider.user$.filter(user => user === null).subscribe(user => {
      if (this.authenticationProvider.getToken()) {
        this.appCenterAnalytics.setEnabled(true).then(() => {
          this.appCenterAnalytics.trackEvent('User Log In.', { userid: localStorage.getItem('UserID') }).then(() => {
            console.log('Custom event tracked');
          });
        })
        this.appCenterCrashes.setEnabled(true).then(() => {
          console.log('AppCenterCrashConnected.');
          this.appCenterCrashes.lastSessionCrashReport().then(report => {
            console.log('Crash report', report);
          });
        });
        this.nav.setRoot('page-my-account', { type: "activity" });
      } else {
        this.splashScreen.hide();
        // this.statusBar.styleBlackOpaque();
        this.nav.setRoot('login');
      }
    });
  }

  onClick($event) {
    if ($event.target.localName === "a") {
      let href = $event.target.href;
      console.log($event);
      if (this.validURL(href)) {
        this.iab.create(href, "_system");
      } else {
        console.log("here1", href, href.charAt(0));
        if ($event.target.pathname === "/") {
          console.log("here2");
          let communityUrl = localStorage.getItem("community_url");
          console.log("here3");
          if (communityUrl) {
            console.log("here4");
            this.iab.create(communityUrl + $event.target.pathname);
          }
        }
      }
      $event.preventDefault();
    }
    if ($event.target.localName === "img") {
      let target = $event.target;
      console.log($event);
      if (
        target.parentNode.localName !== "ion-card" &&
        target.parentNode.className !== "slide-zoom" &&
        target.className !== "photo-single-modal-image" &&
        target.parentNode.localName !== "ion-avatar" &&
        target.parentNode.parentNode.className !== "slide-zoom"
      ) {
        let view = this.nav.getActive().id;
        if (
          view === "articles" ||
          view === "blogs" ||
          view === "cases" ||
          view === "discussion-item" ||
          view === "events" ||
          view === "files" ||
          view === "ideas" ||
          view === "videos" ||
          view === "wikis"
        ) {
          this.modalCtrl.create(PhotoSingleModalComponent, { link: $event.target.src }).present();
        }
      }
    }
  }

  validURL(str) {
    let pattern = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-zA-Z\d%_.~+]*)*(\?[;&a-zA-Z\d%_.~+=-]*)?(\#[-a-zA-Z\d_]*)?$/g
    if (!pattern.test(str)) {
      // alert("Please enter a valid URL.");
      return false;
    } else {
      return true;
    }
  }
}
