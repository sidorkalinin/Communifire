webpackJsonp([34],{

/***/ 676:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SamlLoginPageModule", function() { return SamlLoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__saml_login__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipes_pipes_modules__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SamlLoginPageModule = /** @class */ (function () {
    function SamlLoginPageModule() {
    }
    SamlLoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__saml_login__["a" /* SamlLoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__saml_login__["a" /* SamlLoginPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__pipes_pipes_modules__["a" /* PipesModule */]
            ],
        })
    ], SamlLoginPageModule);
    return SamlLoginPageModule;
}());

//# sourceMappingURL=saml-login.module.js.map

/***/ }),

/***/ 749:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SamlLoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_authentication__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__util_localStorage_helper__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__util_utilities__ = __webpack_require__(159);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the SamlLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SamlLoginPage = /** @class */ (function () {
    function SamlLoginPage(authenticationProvider, translate, iab, platform, toastCtrl, events, navCtrl, localStorageHelper, utilities, navParams) {
        var _this = this;
        this.authenticationProvider = authenticationProvider;
        this.translate = translate;
        this.iab = iab;
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.navCtrl = navCtrl;
        this.localStorageHelper = localStorageHelper;
        this.utilities = utilities;
        this.navParams = navParams;
        this.translationText = ['LOGIN.ACTIVE_DIRECTORY_LOGIN'];
        this.subs$ = [];
        var self = this;
        self.activeDirectoryAuthEnabled = navParams.get("activeDirectoryAuthEnabled");
        console.log('activeDirectoryAuthEnabled from navParams: ' + self.activeDirectoryAuthEnabled);
        if (self.authenticationProvider.getToken()) {
            self.nav.setRoot('page-my-account', { type: "activity" });
        }
        else {
            platform.ready().then(function () {
                console.log('Opening url.');
                setTimeout(function () {
                    var browser = _this.openUrl('no'); //3
                    browser.on('loadstop').subscribe(function (event) {
                        console.log('LoadStartFired.');
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
                            self.authenticationProvider.getMyDetails();
                            // Wait till user details are fetched
                            // We can wait on user$ object which is an Observable
                            self.authenticationProvider.getMyDetails().subscribe(function (user) {
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
                            }, function (error) {
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
    SamlLoginPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    SamlLoginPage.prototype.sendDeviceTokenToServer = function () {
        var _this = this;
        this.authenticationProvider.sendDeviceTokenToServer(this.authenticationProvider.getDeviceToken())
            .subscribe(function (deviceTokenResponse) {
            if (deviceTokenResponse.ResponseData) {
                console.log("Response of device token request: " + deviceTokenResponse.ResponseData);
            }
            else {
                _this.utilities.presentToast(_this.toastCtrl, _this.translationText['LOGIN.SERVER_ERROR']);
            }
        });
    };
    SamlLoginPage.prototype.openUrl = function (hidden) {
        var community_url = this.localStorageHelper.getCommunityUrl();
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
        var browser = this.iab.create(url, '_blank', { location: 'no', toolbar: 'yes', hidden: hidden });
        return browser;
    };
    SamlLoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SamlLoginPage');
    };
    SamlLoginPage.prototype.ngOnInit = function () {
        var _this = this;
        /**
         * Get all translations for messages.
         */
        this.translationText.map(function (translate) {
            _this.subs$.push(_this.translate.get(translate).subscribe(function (res) {
                _this.translationText[translate] = res;
            }));
        });
    };
    /**
   * Unsubscribe from all Observables on route exit.
   */
    SamlLoginPage.prototype.ngOnDestroy = function () {
        this.subs$.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Nav */])
    ], SamlLoginPage.prototype, "nav", void 0);
    SamlLoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-saml-login',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/saml-login/saml-login.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{\'LOGIN.ACTIVE_DIRECTORY_LOGIN\' | translate}}</ion-title>\n\n    <button ion-button icon-only button-clear menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/saml-login/saml-login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_authentication__["a" /* AuthenticationProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_7__util_localStorage_helper__["a" /* LocalStorageHelper */],
            __WEBPACK_IMPORTED_MODULE_8__util_utilities__["a" /* Utilities */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */]])
    ], SamlLoginPage);
    return SamlLoginPage;
}());

//# sourceMappingURL=saml-login.js.map

/***/ })

});
//# sourceMappingURL=34.js.map