webpackJsonp([41],{

/***/ 706:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyAccountPageModule", function() { return MyAccountPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_account__ = __webpack_require__(779);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_modules__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var MyAccountPageModule = /** @class */ (function () {
    function MyAccountPageModule() {
    }
    MyAccountPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__my_account__["a" /* MyAccountPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__my_account__["a" /* MyAccountPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__providers_content__["a" /* ContentProvider */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_network__["a" /* Network */]
            ]
        })
    ], MyAccountPageModule);
    return MyAccountPageModule;
}());

//# sourceMappingURL=my-account.module.js.map

/***/ }),

/***/ 779:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyAccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_authentication__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_network__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyAccountPage = /** @class */ (function () {
    function MyAccountPage(navParams, contentProvider, taptic, navCtrl, menu, authenticationProvider, splashScreen, vibration, platform, statusBar, network) {
        var _this = this;
        this.navParams = navParams;
        this.contentProvider = contentProvider;
        this.taptic = taptic;
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.authenticationProvider = authenticationProvider;
        this.splashScreen = splashScreen;
        this.vibration = vibration;
        this.platform = platform;
        this.statusBar = statusBar;
        this.network = network;
        this.account = 'activity';
        /**
         * Default case
         */
        this.page = 0;
        this.activities = [];
        this.isLoading = false;
        // Ticker
        this.tickers = [];
        this.isLoadingTicker = true;
        this.pageTicker = 0;
        // Notifications
        this.pageNotifications = 0;
        this.notifications = [];
        this.isLoadingNotifications = false;
        this.platform.ready().then(function () {
            _this.splashScreen.hide();
        });
        this.account = this.navParams.get('type');
        // this.statusBar.styleDefault();
    }
    MyAccountPage.prototype.ionViewCanEnter = function () {
        if (!this.authenticationProvider.getToken()) {
            this.navCtrl.setRoot('login');
        }
        else {
            this.menu.enable(true, 'authenticated');
            this.splashScreen.hide();
        }
    };
    MyAccountPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    // Change tabs on My Account page event
    MyAccountPage.prototype.changeSegment = function ($event) {
        if (this.account === 'activity' && this.activities.length == 0) {
            this.doInfinite();
        }
        if (this.account === 'ticker' && this.tickers.length == 0) {
            this.getuserTickers();
        }
        if (this.account === 'notification' && this.notifications.length == 0) {
            this.doNotification();
        }
        if (this.account == 'activity') {
            if (this.scrollAmountActivity == undefined) {
                this.scrollAmountActivity = 0;
            }
            this.content.scrollTo(0, this.scrollAmountActivity, 100);
        }
        else if (this.account == 'ticker') {
            if (this.scrollAmountTicker == undefined) {
                this.scrollAmountTicker = 0;
            }
            this.content.scrollTo(0, this.scrollAmountTicker, 100);
        }
        else if (this.account == 'notification') {
            if (this.scrollAmountNotification == undefined) {
                this.scrollAmountNotification = 0;
            }
            this.content.scrollTo(0, this.scrollAmountNotification, 100);
        }
    };
    MyAccountPage.prototype.scrollHandler = function (event) {
        if (this.account == 'notification') {
            this.scrollAmountNotification = event.scrollTop;
        }
        else if (this.account == 'activity') {
            this.scrollAmountActivity = event.scrollTop;
        }
        else if (this.account == 'ticker') {
            this.scrollAmountTicker = event.scrollTop;
        }
    };
    MyAccountPage.prototype.ngOnInit = function () {
        if (this.account === 'notification') {
            this.isLoadingNotifications = true;
            this.doNotification();
        }
        if (this.account === 'activity') {
            this.doInfinite();
        }
    };
    MyAccountPage.prototype.refreshPage = function ($event) {
        if ($event.result) {
            if (this.activities.length >= 10) {
                this.activities.pop();
            }
            this.activities.unshift($event);
        }
    };
    MyAccountPage.prototype.doRefresh = function (refresh) {
        var _this = this;
        if (refresh) {
            this.taptic.impact({ style: 'light' });
            this.vibrate();
            this.isLoading = false;
            this.page = 1;
            this.getActivitites()
                .finally(function () {
                refresh.complete();
            })
                .subscribe(function (res) {
                _this.activities = res.ResponseData;
            }, function (err) { return refresh.complete(); });
        }
    };
    MyAccountPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (!infiniteScroll) {
            this.isLoading = true;
        }
        this.page++;
        this.getActivitites()
            .finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            else {
                _this.isLoading = false;
            }
        })
            .do(function (response) {
            if (!response.ResponseData.length && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        })
            .subscribe(this.handleuserActivities.bind(this), function (err) { return infiniteScroll.enable(false); });
    };
    MyAccountPage.prototype.getActivitites = function () {
        return this.getUserActivities(this.page);
    };
    MyAccountPage.prototype.handleuserActivities = function (response) {
        this.activities = this.activities.concat(response.ResponseData);
    };
    MyAccountPage.prototype.getUserActivities = function (page) {
        return this.contentProvider.getAccountActivity(page);
    };
    MyAccountPage.prototype.doRefreshTicker = function (refresh) {
        var _this = this;
        if (refresh) {
            this.taptic.impact({ style: 'light' });
            this.vibrate();
            this.isLoadingTicker = false;
            this.pageTicker = 1;
            if (this.infiniteScrollTicker) {
                this.infiniteScrollTicker.enable(true);
            }
            this.contentProvider.getUserTicker(this.pageTicker).subscribe(function (response) {
                if (response.ResponseData) {
                    _this.tickers = response.ResponseData;
                    refresh.complete();
                }
            });
        }
    };
    MyAccountPage.prototype.getuserTickers = function (infiniteScroll) {
        var _this = this;
        ++this.pageTicker;
        if (infiniteScroll) {
            this.infiniteScrollTicker = infiniteScroll;
        }
        this.contentProvider.getUserTicker(this.pageTicker)
            .finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            else {
                _this.isLoadingTicker = false;
            }
        })
            .do(function (response) {
            if (!response.ResponseData.length && infiniteScroll) {
                infiniteScroll.enable(false);
            }
            if (infiniteScroll && response.ResponseData.length && response.ResponseData.length < 20) {
                infiniteScroll.enable(false);
            }
        })
            .subscribe(function (response) {
            if (response.ResponseData) {
                _this.tickers = _this.tickers.concat(response.ResponseData);
            }
        });
    };
    MyAccountPage.prototype.doRefreshNotifications = function (refresh) {
        var _this = this;
        if (refresh) {
            this.taptic.impact({ style: 'light' });
            this.vibrate();
            this.pageNotifications = 1;
            if (this.infiniteScrollNotifications) {
                this.infiniteScrollNotifications.enable(true);
            }
            this.contentProvider.getUserNotification(this.pageNotifications)
                .subscribe(function (response) {
                _this.notifications = response.ResponseData;
                refresh.complete();
            });
        }
    };
    MyAccountPage.prototype.doNotification = function (infiniteScroll) {
        var _this = this;
        if (infiniteScroll) {
            this.infiniteScrollNotifications = infiniteScroll;
        }
        if (!infiniteScroll) {
            this.isLoadingNotifications = true;
        }
        this.pageNotifications++;
        this.getNotification()
            .finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            else {
                _this.isLoadingNotifications = false;
            }
        })
            .do(function (response) {
            if (!response.ResponseData.length && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        })
            .subscribe(this.handleNotification.bind(this), function (err) { return infiniteScroll.enable(false); });
    };
    MyAccountPage.prototype.getNotification = function () {
        return this.contentProvider.getUserNotification(this.pageNotifications);
    };
    MyAccountPage.prototype.handleNotification = function (response) {
        this.notifications = this.notifications.concat(response.ResponseData);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], MyAccountPage.prototype, "content", void 0);
    MyAccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-my-account',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/my-account/my-account.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{"ACCOUNT.HEADING" | translate}}</ion-title>\n\n    <button ion-button icon-only button-clear menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n\n\n  <ion-toolbar>\n\n    <ion-segment [(ngModel)]="account" (ionChange)="changeSegment($event)">\n\n      <ion-segment-button value="activity">\n\n        {{"ACCOUNT.SEGMENT.ACTIVITY" | translate}}\n\n      </ion-segment-button>\n\n\n\n      <ion-segment-button value="ticker">\n\n        {{"ACCOUNT.SEGMENT.TICKER" | translate}}\n\n      </ion-segment-button>\n\n\n\n      <ion-segment-button value="notification">\n\n        {{"ACCOUNT.SEGMENT.NOTIFICATION" | translate}}\n\n      </ion-segment-button>\n\n\n\n    </ion-segment>\n\n  </ion-toolbar>\n\n  <ion-toolbar *ngIf="account == \'activity\'" no-padding>\n\n    <status-modal (modalClose)="refreshPage($event)" [isText]="true"></status-modal>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content no-margin [ngClass]="account" (ionScroll)="scrollHandler($event)">\n\n\n\n  <ion-refresher (ionRefresh)="doRefresh($event)" *ngIf="account == \'activity\' && !isLoading">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <ion-refresher (ionRefresh)="doRefreshTicker($event)" *ngIf="account == \'ticker\' && !isLoadingTicker">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <ion-refresher (ionRefresh)="doRefreshNotifications($event)" *ngIf="account == \'notification\' && !isLoadingNotifications">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n  <ng-container>\n\n    <div [hidden]="account != \'activity\'">\n\n      <!-- <loader *ngIf="isLoading"></loader> -->\n\n      <div *ngIf="isLoading">\n\n        <empty-card *ngFor="let item of [1, 2, 3]"></empty-card>\n\n      </div>\n\n      <content-card-list [activities]="activities"></content-card-list>\n\n      <ion-infinite-scroll *ngIf="!isLoading" (ionInfinite)="doInfinite($event)" threshold="1000px">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n\n\n    <div [hidden]="account != \'ticker\'">\n\n      <!-- <loader *ngIf="isLoadingTicker"></loader> -->\n\n      <ion-list *ngIf="isLoadingTicker">\n\n        <empty-ticker *ngFor="let item of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"></empty-ticker>\n\n      </ion-list>\n\n      <ion-list [style.marginBottom]="\'0\'">\n\n        <ticker [ticker]="ticker" *ngFor="let ticker of tickers"></ticker>\n\n      </ion-list>\n\n      <ion-infinite-scroll *ngIf="!isLoadingTicker" (ionInfinite)="getuserTickers($event)" threshold="1000px">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n\n\n    <div [hidden]="account != \'notification\'">\n\n      <!-- <loader *ngIf="isLoadingNotifications"></loader> -->\n\n      <ion-list *ngIf="isLoadingNotifications">\n\n        <empty-notification *ngFor="let item of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"></empty-notification>\n\n      </ion-list>\n\n      <ion-list>\n\n        <notification [notification]="notification" *ngFor="let notification of notifications"></notification>\n\n      </ion-list>\n\n      <ion-infinite-scroll *ngIf="!isLoadingNotification" (ionInfinite)="doNotification($event)" threshold="1000px">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n\n\n  </ng-container>\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/my-account/my-account.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_authentication__["a" /* AuthenticationProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_network__["a" /* Network */]])
    ], MyAccountPage);
    return MyAccountPage;
}());

//# sourceMappingURL=my-account.js.map

/***/ })

});
//# sourceMappingURL=41.js.map