import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Nav, IonicPage, NavController, ToastController, MenuController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { Events } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { NotificationHelper } from '../../util/notification-helper';

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginPage implements OnInit, OnDestroy {
  @ViewChild(Nav) nav: Nav;
  loginForm: FormGroup;
  urlForm: FormGroup;
  loginInProgress: boolean;
  domainCheckInProgress: boolean;
  isSamlEnabled: boolean;
  subs$: Subscription[] = [];
  translationText = ['LOGIN.SUCCESS', 'LOGIN.INVALID_INFO', 'LOGIN.INVALID_CREDENTIALS', 'LOGIN.URL_NOT_FOUND', 'LOGIN.COMMUNITY_URL', 'LOGIN.SERVER_ERROR'];
  urlSet: boolean = false;
  private activeDirectoryAuthEnabled = false;
  isDomainCheck401: boolean = false;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authenticationProvider: AuthenticationProvider,
    private toastCtrl: ToastController,
    public menu: MenuController,
    private translate: TranslateService,
    private platform: Platform,
    public events: Events,
    splashScreen: SplashScreen,
    statusBar: StatusBar,
    // private notificationHelper: NotificationHelper,
  ) {
    this.platform.ready().then(() => {
      // statusBar.styleLightContent();
      splashScreen.hide();
    });

  }

  ngOnInit() {

    /**
     * Setup Login Form
     */
    this.loginForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });

    /**
     * Setup Url Form
     */
    this.urlForm = this.formBuilder.group({
      domain: ['', Validators.compose([Validators.required])]
    });


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


    /**
     * Set community url, if a previously set community url is entered.
     */
    const community_url = localStorage.getItem('community_url');
    if (community_url) {
      this.urlForm.get('domain').setValue(community_url);
    }
  }

  /**
   * Unsubscribe from all Observables on route exit.
   */
  ngOnDestroy() {
    this.subs$.forEach(sub => {
      sub.unsubscribe();
    });
  }

  /**
   * Allow entering to this route only if
   * token is not available, else disable Side Menu
   */
  ionViewCanEnter() {
    this.menu.enable(false, 'authenticated');
  }

  loginWithAD() {
    let self = this;

    // // this.presentToast('Login with AD Clicked.');
    if (!self.activeDirectoryAuthEnabled) {
      console.log('activeDirectoryAuthEnabled: ' + self.activeDirectoryAuthEnabled);

      // Pass ActiveDirectoryAuthEnabled variable value which we fetched from server to saml login page.
      this.navCtrl.push('saml-login',
        {
          activeDirectoryAuthEnabled: self.activeDirectoryAuthEnabled
        });
      self.setDomainCheckInProgress(false);
    }

    // Let user add domain/credentials
    self.urlSet = true;
  }

  login() {
    let self = this;

    if (this.loginForm.valid) {

      var username = this.loginForm.value.UserName;

      if (username.indexOf('/') > 0) {
        // AD case, iPhones do now allow backslash in textbox for username so user will be adding usernames like:
        // adqa.communifire.com/adtesting and the following code will make it adqa.communifire.com\adtesting
        username = username.replace('/', '\\');
      }
      var password = this.loginForm.value.Password;

      this.authenticationProvider.setUserName(username);
      this.authenticationProvider.setPassword(password);

      this.setLoginInProgress(true);

      const payload = {
        UserName: username,
        Password: password
      };

      this.authenticationProvider
        .login(payload)
        .subscribe(function (loginRes) {
          self.onLoginSuccess(loginRes, self)
        }, function (err) {
          console.log('Error: ' + err);
          self.presentToast(err);
          self.onLoginError(self);
          self.setLoginInProgress(false);
        });

    } else {
      console.log('Error2');
      self.setLoginInProgress(false);
      this.presentToast(this.translationText['LOGIN.INVALID_INFO']);
    }
  }

  backToUrl() {
    this.urlSet = false;
    this.loginForm.setValue({
      UserName: "",
      Password: ""
    });
    // this.loginForm.value.Password = "";
  }

  /**
   * Check if the URL entered is correct
   * @param domain Community URL
   */
  checkIfDomainExists() {
    let self = this;
    self.isDomainCheck401 = false;
    
    this.setDomainCheckInProgress(true);
    self.urlSet = false;
    var domain: string = this.urlForm.get('domain').value.trim();

    if (domain.length == 0) {
      this.setDomainCheckInProgress(false);
      this.presentToast(this.translationText['LOGIN.COMMUNITY_URL']);
      return;
    }

    // Add https if it is missing in front of domain added by user
    if (domain.indexOf('http://') === -1 && domain.indexOf('https://') === -1) {
      domain = 'https://' + domain;
    }
    // Remove "/" from the end of the domain if added by the user
    let lastChar = domain.slice(-1);
    if (lastChar == "/") {
      domain = domain.replace(/.$/, "");  // replace last char "/" with empty space
    }
    console.log('Firing this.imageExists, domain: ' + domain);
    // Validity of url is checked by checking whether https://${domain}/ping-do-not-delete.ico file exists 
    // If it does exist then the url is valid else not.
    // Show user "login url not found" message if the url is not valid.
    this.imageExists(domain + '/ping-do-not-delete.ico', (exists) => {

      if (exists) {
        //self.authenticationProvider.removeAdEnabled();

        localStorage.setItem('community_url', domain);

        console.log('this.imageExists success');
        // Check for saml
        // If enabled, show the login with saml button.
        // If auto login with saml is enabled then directly redirect the user to login with saml page in the app
        this.authenticationProvider.getSAMLDetails().subscribe(
          response => {
            // let samlDetails: any;
            // samlDetails = {};
            // samlDetails.IsSAMLEnabled = true;
            // samlDetails.IsAutoLoginEnabled = true;
            console.log(response);

            var samlDetails = response.ResponseData;

            // Set the ActiveDirectoryAuthEnabled variable to pass it to saml login page 
            // self.activeDirectoryAuthEnabled = samlDetails.ActiveDirectoryAuthEnabled;

            if (samlDetails.IsSAMLEnabled) {
              if (samlDetails.IsAutoLoginEnabled) {
                self.loginWithAD();
              }
              else {
                self.setIsSamlEnabled(true);
              }
            }
            self.setDomainCheckInProgress(false);
            self.setLoginInProgress(false);
            self.urlSet = true;
          },
          error => {
            console.log(error);
            self.setDomainCheckInProgress(false);
          });

      } else {
        console.log('this.imageExists failure');
        console.log('isDomainCheck401: ' + self.isDomainCheck401);

        // At this point we were not able to fetch image that means either it is 401 or 404.
        if (self.isDomainCheck401) {
          //  We got 404 that means AD is enabled

          // Active Directory case:
          localStorage.setItem('community_url', domain);

          self.activeDirectoryAuthEnabled = true;
          self.authenticationProvider.setADEnabled();
          self.loginWithAD();
          self.setDomainCheckInProgress(false);
        }
        else {
          this.presentToast(this.translationText['LOGIN.URL_NOT_FOUND']);
          self.setDomainCheckInProgress(false);
        }
      }

    });
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

  /**
   * Check if an image exists.
   * @param url String - Image Url
   * @param callback Function
   */
  private imageExists(url: string, callback: Function) {
    var self = this;
    
    var http = new XMLHttpRequest();
    http.open('GET', url, true); // True is for async
    http.send();
    http.onreadystatechange = function () {
      if (http.readyState === 4) {   //if complete

        console.log('http.status: ' + http.status);

        if (http.status == 401) {
          self.isDomainCheck401 = true;
          callback(false);
        }
        else if (http.status == 200) {
          callback(true);
        }
        else {
          callback(false);
        }
      }
    };
  }

  private setLoginInProgress(isInProgress: boolean) {
    this.loginInProgress = isInProgress;
  }

  private setDomainCheckInProgress(isInProgress: boolean) {
    this.domainCheckInProgress = isInProgress;
  }

  private setIsSamlEnabled(isSamlEnabled: boolean) {
    this.isSamlEnabled = isSamlEnabled;
  }

  private onLoginSuccess(loginRes: any, self: LoginPage) {
    if (loginRes.ResponseData) {
      self.authenticationProvider.setToken(loginRes.ResponseData);

      // Wait till user details are fetched
      // We can wait on user$ object which is an Observable
      self.authenticationProvider.getMyDetails().subscribe(
        user => {
          self.setLoginInProgress(false);

          self.presentToast(self.translationText['LOGIN.LOGIN_SUCCESS']);

          self.authenticationProvider.setUser(user);
          localStorage.setItem('UserID', user.UserID);

          self.events.publish('user:loggedin', user);

          if (this.platform.is('cordova')) {
            console.log(this.nav);
            // this.notificationHelper.initPushNotification(this.nav);
            if (this.platform.is('ios') || this.platform.is('android')) {
              var deviceToken = this.authenticationProvider.getDeviceToken();

              if (deviceToken != null) {
                this.authenticationProvider.sendDeviceTokenToServer(this.authenticationProvider.getDeviceToken())
                  .subscribe(deviceTokenResponse => {
                    if (deviceTokenResponse.ResponseData) {
                      console.log("response of device token request: " + deviceTokenResponse.ResponseData);
                    } else {
                      this.presentToast(this.translationText['LOGIN.INVALID_CREDENTIALS']);
                    }
                  });
              }
            }
          }

          self.navCtrl.setRoot('page-my-account', { type: "activity" });

        },
        error => {
          console.log(error);
          self.setLoginInProgress(false);
          self.presentToast(this.translationText['LOGIN.INVALID_CREDENTIALS']);
        }
      );

    } else {
      // self.loginInProgress = false;
      self.setLoginInProgress(false);
      self.presentToast(this.translationText['LOGIN.INVALID_CREDENTIALS']);
    }
  }

  private onLoginError(self: LoginPage) {
    self.setLoginInProgress(false);
    self.presentToast(self.translationText['LOGIN.SERVER_ERROR']);
  }
}
