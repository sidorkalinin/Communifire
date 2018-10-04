import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, Events, Nav, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AuthenticationProvider } from '../../providers/authentication';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { LocalStorageHelper } from '../../util/localStorage-helper'
import { Utilities } from '../../util/utilities'

/**
 * Generated class for the SamlLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name: 'saml-login'
})

@Component({
  selector: 'page-saml-login',
  templateUrl: 'saml-login.html',
})
export class SamlLoginPage implements OnInit, OnDestroy {
  @ViewChild(Nav) nav: Nav;
  translationText = ['LOGIN.ACTIVE_DIRECTORY_LOGIN'];
  subs$: Subscription[] = [];
  private activeDirectoryAuthEnabled;

  constructor(
    private authenticationProvider: AuthenticationProvider,
    private translate: TranslateService,
    private iab: InAppBrowser,
    private platform: Platform,
    private toastCtrl: ToastController,
    public events: Events,
    public navCtrl: NavController,
    private localStorageHelper: LocalStorageHelper,
    private utilities: Utilities,
    public navParams: NavParams
  ) {

    let self = this;
    self.activeDirectoryAuthEnabled = navParams.get("activeDirectoryAuthEnabled");

    console.log('activeDirectoryAuthEnabled from navParams: ' + self.activeDirectoryAuthEnabled);

    if (self.authenticationProvider.getToken()) {

      self.nav.setRoot('page-my-account', { type: "activity" });

    } else {
      platform.ready().then(() => {
        console.log('Opening url.')

        setTimeout(() => {
          var browser = this.openUrl('no');//3

          browser.on('loadstop').subscribe(event => {
            console.log('LoadStartFired.')

            //self.presentToast('Load started');
            console.log(event.url);
            //self.presentToast(event.url);

            var token = utilities.getQueryString('Rest-Api-Key', event.url);

            // Check if token is not empty
            if (token) {

              // Token will be sent a url encoded from server
              token = decodeURIComponent(token);
              console.log('Decoded token: ' + token);

              console.log('Rest Api Key fetched from url: ' + token);

              self.authenticationProvider.setToken(token);
              console.log('Rest Api Key saved from remote: ' + self.authenticationProvider.getToken());

              self.authenticationProvider.getMyDetails()

              // Wait till user details are fetched
              // We can wait on user$ object which is an Observable
              self.authenticationProvider.getMyDetails().subscribe(
                user => {
                  // self.setLoginInProgress(false);

                  console.log('User details fetched from self.authenticationProvider.getMyDetails()');
                  utilities.presentToast(self.toastCtrl, self.translationText['LOGIN.LOGIN_SUCCESS']);

                  self.authenticationProvider.setUser(user);

                  self.sendDeviceTokenToServer();

                  self.events.publish('user:loggedin', user);

                  self.navCtrl.setRoot('login');

                  browser.close();

                  // browser.close();
                  window.location.reload();

                },
                error => {
                  console.log(error);
                  //self.setLoginInProgress(false);
                  //self.presentToast(this.translationText['LOGIN.INVALID_CREDENTIALS']);
                  //self.navCtrl.setRoot('login');
                });
            }
          });
        });
      });
    }
  }

  /**
 * Present Ionic Toast to user.
 * @param msg Message to display in Ionic Toast
 */
  private presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }


  private sendDeviceTokenToServer() {

    this.authenticationProvider.sendDeviceTokenToServer(this.authenticationProvider.getDeviceToken())
      .subscribe(deviceTokenResponse => {
        if (deviceTokenResponse.ResponseData) {
          console.log("Response of device token request: " + deviceTokenResponse.ResponseData);
        } else {
          this.utilities.presentToast(this.toastCtrl, this.translationText['LOGIN.SERVER_ERROR']);
        }
      });
  }


  openUrl(hidden) {

    const community_url = this.localStorageHelper.getCommunityUrl();


    // isMobile=true querystring added to let the web application know about that the request is from mobile.
    var url = community_url + '/ssologin?isMobile=true';
    if (this.activeDirectoryAuthEnabled) {
      // If Active Directory auth is enabled then we will authenticate against AD login on server instead of SAML
      // The ActiveDirectoryAuthEnabled paramter is sent to server to tell the server that AD login needs to be used instead of SAML for authenticating this request.
      url = url + '&ActiveDirectoryAuthEnabled=true';
    }

    console.log('Opening url in app browser: ' + url);
    // set location: no to hide the url
    // set toolbar: yes to show "Done", "back" button of inapp browser
    // target: _blank to let the content of inapp browser visible.
    const browser = this.iab.create(url, '_blank', { location: 'no', toolbar: 'yes', hidden: hidden });

    return browser;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SamlLoginPage');

  }

  ngOnInit() {

    /**
     * Get all translations for messages.
     */
    this.translationText.map(translate => {
      this.subs$.push(
        this.translate.get(translate).subscribe((res: string) => {
          this.translationText[translate] = res;
        })
      );
    });

  }

  /**
 * Unsubscribe from all Observables on route exit.
 */
  ngOnDestroy() {
    this.subs$.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
