webpackJsonp([43],{

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login__ = __webpack_require__(778);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_modules__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_push__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util_notification_helper__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__login__["a" /* LoginPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_push__["a" /* Push */],
                __WEBPACK_IMPORTED_MODULE_8__util_notification_helper__["a" /* NotificationHelper */],
            ]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 778:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_authentication__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










// import { NotificationHelper } from '../../util/notification-helper';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, formBuilder, authenticationProvider, toastCtrl, menu, translate, platform, events, splashScreen, statusBar) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.authenticationProvider = authenticationProvider;
        this.toastCtrl = toastCtrl;
        this.menu = menu;
        this.translate = translate;
        this.platform = platform;
        this.events = events;
        this.subs$ = [];
        this.translationText = ['LOGIN.SUCCESS', 'LOGIN.INVALID_INFO', 'LOGIN.INVALID_CREDENTIALS', 'LOGIN.URL_NOT_FOUND', 'LOGIN.COMMUNITY_URL', 'LOGIN.SERVER_ERROR'];
        this.urlSet = false;
        this.activeDirectoryAuthEnabled = false;
        this.isDomainCheck401 = false;
        this.platform.ready().then(function () {
            // statusBar.styleLightContent();
            splashScreen.hide();
        });
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        /**
         * Setup Login Form
         */
        this.loginForm = this.formBuilder.group({
            UserName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            Password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required]
        });
        /**
         * Setup Url Form
         */
        this.urlForm = this.formBuilder.group({
            domain: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required])]
        });
        /**
         * Get all translations for messages.
         */
        this.translationText.map(function (translate) {
            _this.subs$.push(_this.translate.get(translate).subscribe(function (res) {
                _this.translationText[translate] = res;
            }));
        });
        /**
         * Set community url, if a previously set community url is entered.
         */
        var community_url = localStorage.getItem('community_url');
        if (community_url) {
            this.urlForm.get('domain').setValue(community_url);
        }
    };
    /**
     * Unsubscribe from all Observables on route exit.
     */
    LoginPage.prototype.ngOnDestroy = function () {
        this.subs$.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    /**
     * Allow entering to this route only if
     * token is not available, else disable Side Menu
     */
    LoginPage.prototype.ionViewCanEnter = function () {
        this.menu.enable(false, 'authenticated');
    };
    LoginPage.prototype.loginWithAD = function () {
        var self = this;
        // // this.presentToast('Login with AD Clicked.');
        if (!self.activeDirectoryAuthEnabled) {
            console.log('activeDirectoryAuthEnabled: ' + self.activeDirectoryAuthEnabled);
            // Pass ActiveDirectoryAuthEnabled variable value which we fetched from server to saml login page.
            this.navCtrl.push('saml-login', {
                activeDirectoryAuthEnabled: self.activeDirectoryAuthEnabled
            });
            self.setDomainCheckInProgress(false);
        }
        // Let user add domain/credentials
        self.urlSet = true;
    };
    LoginPage.prototype.login = function () {
        var self = this;
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
            var payload = {
                UserName: username,
                Password: password
            };
            this.authenticationProvider
                .login(payload)
                .subscribe(function (loginRes) {
                self.onLoginSuccess(loginRes, self);
            }, function (err) {
                console.log('Error: ' + err);
                self.presentToast(err);
                self.onLoginError(self);
                self.setLoginInProgress(false);
            });
        }
        else {
            console.log('Error2');
            self.setLoginInProgress(false);
            this.presentToast(this.translationText['LOGIN.INVALID_INFO']);
        }
    };
    LoginPage.prototype.backToUrl = function () {
        this.urlSet = false;
        this.loginForm.setValue({
            UserName: "",
            Password: ""
        });
        // this.loginForm.value.Password = "";
    };
    /**
     * Check if the URL entered is correct
     * @param domain Community URL
     */
    LoginPage.prototype.checkIfDomainExists = function () {
        var _this = this;
        var self = this;
        self.isDomainCheck401 = false;
        this.setDomainCheckInProgress(true);
        self.urlSet = false;
        var domain = this.urlForm.get('domain').value.trim();
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
        var lastChar = domain.slice(-1);
        if (lastChar == "/") {
            domain = domain.replace(/.$/, ""); // replace last char "/" with empty space
        }
        console.log('Firing this.imageExists, domain: ' + domain);
        // Validity of url is checked by checking whether https://${domain}/ping-do-not-delete.ico file exists 
        // If it does exist then the url is valid else not.
        // Show user "login url not found" message if the url is not valid.
        this.imageExists(domain + '/ping-do-not-delete.ico', function (exists) {
            if (exists) {
                //self.authenticationProvider.removeAdEnabled();
                localStorage.setItem('community_url', domain);
                console.log('this.imageExists success');
                // Check for saml
                // If enabled, show the login with saml button.
                // If auto login with saml is enabled then directly redirect the user to login with saml page in the app
                _this.authenticationProvider.getSAMLDetails().subscribe(function (response) {
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
                }, function (error) {
                    console.log(error);
                    self.setDomainCheckInProgress(false);
                });
            }
            else {
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
                    _this.presentToast(_this.translationText['LOGIN.URL_NOT_FOUND']);
                    self.setDomainCheckInProgress(false);
                }
            }
        });
    };
    /**
     * Present Ionic Toast to user.
     * @param msg Message to display in Ionic Toast
     */
    LoginPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    /**
     * Check if an image exists.
     * @param url String - Image Url
     * @param callback Function
     */
    LoginPage.prototype.imageExists = function (url, callback) {
        var self = this;
        var http = new XMLHttpRequest();
        http.open('GET', url, true); // True is for async
        http.send();
        http.onreadystatechange = function () {
            if (http.readyState === 4) { //if complete
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
    };
    LoginPage.prototype.setLoginInProgress = function (isInProgress) {
        this.loginInProgress = isInProgress;
    };
    LoginPage.prototype.setDomainCheckInProgress = function (isInProgress) {
        this.domainCheckInProgress = isInProgress;
    };
    LoginPage.prototype.setIsSamlEnabled = function (isSamlEnabled) {
        this.isSamlEnabled = isSamlEnabled;
    };
    LoginPage.prototype.onLoginSuccess = function (loginRes, self) {
        var _this = this;
        if (loginRes.ResponseData) {
            self.authenticationProvider.setToken(loginRes.ResponseData);
            // Wait till user details are fetched
            // We can wait on user$ object which is an Observable
            self.authenticationProvider.getMyDetails().subscribe(function (user) {
                self.setLoginInProgress(false);
                self.presentToast(self.translationText['LOGIN.LOGIN_SUCCESS']);
                self.authenticationProvider.setUser(user);
                localStorage.setItem('UserID', user.UserID);
                self.events.publish('user:loggedin', user);
                if (_this.platform.is('cordova')) {
                    console.log(_this.nav);
                    // this.notificationHelper.initPushNotification(this.nav);
                    if (_this.platform.is('ios') || _this.platform.is('android')) {
                        var deviceToken = _this.authenticationProvider.getDeviceToken();
                        if (deviceToken != null) {
                            _this.authenticationProvider.sendDeviceTokenToServer(_this.authenticationProvider.getDeviceToken())
                                .subscribe(function (deviceTokenResponse) {
                                if (deviceTokenResponse.ResponseData) {
                                    console.log("response of device token request: " + deviceTokenResponse.ResponseData);
                                }
                                else {
                                    _this.presentToast(_this.translationText['LOGIN.INVALID_CREDENTIALS']);
                                }
                            });
                        }
                    }
                }
                self.navCtrl.setRoot('page-my-account', { type: "activity" });
            }, function (error) {
                console.log(error);
                self.setLoginInProgress(false);
                self.presentToast(_this.translationText['LOGIN.INVALID_CREDENTIALS']);
            });
        }
        else {
            // self.loginInProgress = false;
            self.setLoginInProgress(false);
            self.presentToast(this.translationText['LOGIN.INVALID_CREDENTIALS']);
        }
    };
    LoginPage.prototype.onLoginError = function (self) {
        self.setLoginInProgress(false);
        self.presentToast(self.translationText['LOGIN.SERVER_ERROR']);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */])
    ], LoginPage.prototype, "nav", void 0);
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/login/login.html"*/'<!-- <default-header [title]="\'LOGIN.HEADING\'"></default-header> -->\n\n\n\n<ion-content>\n\n  <img [style.width]="\'100%\'" src="assets/images/login.png" alt="">\n\n\n\n  <button *ngIf="urlSet" (click)="backToUrl()" class="back-button-default" [style.color]="\'white\'" ion-button clear>\n\n    <ion-icon name="arrow-back"></ion-icon>\n\n  </button>\n\n\n\n  <form [formGroup]="urlForm" (ngSubmit)="checkIfDomainExists()" *ngIf="!urlSet">\n\n\n\n    <ion-item padding-horizontal>\n\n      <ion-label stacked>{{ "LOGIN.COMMUNITY_URL" | translate }}</ion-label>\n\n      <ion-input placeholder="{{ \'LOGIN.DOMAIN_EXAMPLE\' | translate }}" type="url" formControlName="domain" autocomplete="off"\n\n        autocapitalize="none"></ion-input>\n\n    </ion-item>\n\n\n\n    <div padding>\n\n      <button padding-horizontal class="login-button" ion-button color="primary" block *ngIf="!domainCheckInProgress">{{\'LOGIN.NEXT\' | translate}}</button>\n\n      <button class="login-button" ion-button color="primary" block disabled *ngIf="domainCheckInProgress">{{\'LOGIN.WAIT\' | translate}}</button>\n\n    </div>\n\n\n\n  </form>\n\n\n\n  <form [formGroup]="loginForm" (ngSubmit)="login()" *ngIf="urlSet">\n\n\n\n    <ion-item padding-horizontal>\n\n      <ion-label stacked>{{ "LOGIN.LOGIN_INFORMATION" | translate }}</ion-label>\n\n      <ion-input placeholder="{{ \'LOGIN.USERNAME\' | translate }}" type="email" formControlName="UserName" autocomplete="off" autocapitalize="none"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item padding-horizontal>\n\n      <ion-input placeholder="{{ \'LOGIN.PASSWORD\' | translate }}" type="password" formControlName="Password" autocomplete="off"\n\n        autocapitalize="none"></ion-input>\n\n    </ion-item>\n\n\n\n\n\n    <div padding>\n\n      <button type="submit" class="login-button" ion-button color="primary" block *ngIf="!loginInProgress">{{\'LOGIN.NEXT\' | translate}}</button>\n\n      <button type="button" class="login-button" ion-button color="primary" block *ngIf="isSamlEnabled && !loginInProgress" (click)=\'loginWithAD()\'>{{\'LOGIN.ACTIVE_DIRECTORY_LOGIN\' | translate}}</button>\n\n      <button class="login-button" ion-button color="primary" block disabled *ngIf="loginInProgress">{{\'LOGIN.WAIT\' | translate}}</button>\n\n    </div>\n\n  </form>\n\n\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/login/login.html"*/,
            changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].Default
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_6__providers_authentication__["a" /* AuthenticationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=43.js.map