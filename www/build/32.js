webpackJsonp([32],{

/***/ 677:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings__ = __webpack_require__(750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_center_analytics__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_modules__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var SettingsPageModule = /** @class */ (function () {
    function SettingsPageModule() {
    }
    SettingsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__settings__["a" /* SettingsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__settings__["a" /* SettingsPage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]
            ]
        })
    ], SettingsPageModule);
    return SettingsPageModule;
}());

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 750:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_authentication__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_notification_helper__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_center_analytics__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams, authenticationProvider, notificationHelper, events, appCenterAnalytics, translate, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.authenticationProvider = authenticationProvider;
        this.notificationHelper = notificationHelper;
        this.events = events;
        this.appCenterAnalytics = appCenterAnalytics;
        this.translate = translate;
        this.platform = platform;
        this.isPushNotificationEnabled = false;
        this.isPushNotificationEnabled = this.authenticationProvider.isPushNotificationEnabled();
        console.log("isPushNotificationEnabled: ", this.isPushNotificationEnabled);
        this.appCenterAnalytics.isEnabled().then(function (b) {
            if (b) {
                _this.appCenterAnalytics.trackEvent('Setting Pgae Load Event.', { userid: localStorage.getItem('UserID') }).then(function () {
                    console.log('Setting Pgae Load Event tracked');
                });
            }
        });
        if (localStorage.getItem('language')) {
            this.lang = Number(localStorage.getItem('language'));
        }
        else {
            this.lang = 1;
        }
    }
    SettingsPage.prototype.notificationChanged = function () {
        console.log("Toggled: " + this.isPushNotificationEnabled);
        if (!this.isPushNotificationEnabled) {
            this.notificationHelper.unsubscribePushNotifications();
        }
        else {
            this.authenticationProvider.setPushNotificationsOn();
            this.events.publish('settings:initPushNotification');
        }
    };
    SettingsPage.prototype.selectLanguage = function (language) {
        this.lang = language;
        localStorage.setItem('language', this.lang);
        switch (this.lang) {
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
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-settings',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/settings/settings.html"*/'<ion-header>\n\n  <ion-navbar color="blue">\n\n    <ion-title>{{"SETTINGS.TITLE" | translate}}</ion-title>\n\n    <button ion-button icon-only button-clear menuToggle color="white">\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list [style.paddingTop]="\'80px\'">\n\n    <ion-item>\n\n      <ion-label>\n\n        {{"SETTINGS.PUSH" | translate}}\n\n      </ion-label>\n\n      <ion-toggle [(ngModel)]="isPushNotificationEnabled" color="secondary" (ionChange)="notificationChanged()"></ion-toggle>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>{{"EXTRA.LANGUAGE" | translate}}</ion-label>\n\n      <ion-select [(ngModel)]="lang" interface="popover" (ionChange)="selectLanguage($event)">\n\n        <ion-option value="1">{{"EXTRA.ENGLISH" | translate}}</ion-option>\n\n        <ion-option value="2">{{"EXTRA.GERMAN" | translate}}</ion-option>\n\n        <!-- <ion-option value="3">{{"EXTRA.ARABIC" | translate}}</ion-option> -->\n\n      </ion-select>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_authentication__["a" /* AuthenticationProvider */],
            __WEBPACK_IMPORTED_MODULE_3__util_notification_helper__["a" /* NotificationHelper */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
            __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ })

});
//# sourceMappingURL=32.js.map