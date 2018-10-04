webpackJsonp([47],{

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_spaces__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_modules__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home__ = __webpack_require__(738);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_7__home__["a" /* HomePage */]),
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__providers_spaces__["a" /* SpacesProvider */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */]
            ]
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 738:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_authentication__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_spaces__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, menu, authenticationProvider, contentProvider, loadingCtrl, spacesProvider, taptic, splashScreen, translate, vibration, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.authenticationProvider = authenticationProvider;
        this.contentProvider = contentProvider;
        this.loadingCtrl = loadingCtrl;
        this.spacesProvider = spacesProvider;
        this.taptic = taptic;
        this.splashScreen = splashScreen;
        this.translate = translate;
        this.vibration = vibration;
        this.platform = platform;
        this.page = 0;
        this.activities = [];
        this.currentSpace = 'null';
        this.spacesList = [];
        this.isLoading = false;
        this.isLoadingFirst = true;
        this.selectOptions = {
            title: ""
        };
        this.translate.get("SPACEDETAILS.SELECT_SPACE").subscribe(function (trans) {
            _this.selectOptions.title = trans;
        });
    }
    HomePage.prototype.menuClick = function () {
        console.log('menu');
    };
    HomePage.prototype.ionViewCanEnter = function () {
        if (!this.authenticationProvider.getToken()) {
            this.navCtrl.setRoot('login');
        }
        else {
            this.menu.enable(true, 'authenticated');
            this.splashScreen.hide();
        }
    };
    HomePage.prototype.ngOnInit = function () {
        this.getNextPageForSpace();
        this.getMySpaces();
    };
    HomePage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    HomePage.prototype.getMySpaces = function () {
        var _this = this;
        this.spacesProvider.getMySpaces().subscribe(function (res) {
            _this.spacesList = res;
        });
    };
    HomePage.prototype.doRefresh = function (refresh) {
        if (refresh) {
            this.refresherGlobal = refresh;
            this.taptic.impact({ style: 'light' });
            this.vibrate();
            this.changeSpace();
            // refresh.complete();
        }
    };
    HomePage.prototype.changeSpace = function () {
        this.page = 0;
        this.activities = [];
        if (!this.refresherGlobal) {
            this.isLoadingFirst = true;
        }
        if (this.currentSpace == 0) {
            this.getNextPage();
        }
        else {
            this.getNextPageForSpace();
        }
    };
    HomePage.prototype.getNextPageForSpace = function (infiniteScroll) {
        var _this = this;
        if (this.activities.length > 0 && this.activities.length < 10 && infiniteScroll) {
            infiniteScroll.enable(false);
        }
        this.page++;
        if (this.infiniteScrollTemp) {
            this.infiniteScrollTemp.enable(true);
        }
        if (!infiniteScroll) {
            this.isLoading = true;
        }
        else {
            this.infiniteScrollTemp = infiniteScroll;
        }
        this.contentProvider.getContentBySpace(this.currentSpace, this.page, 10)
            .finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            else {
                _this.isLoading = false;
                _this.isLoadingFirst = false;
            }
            if (_this.refresherGlobal) {
                _this.refresherGlobal.complete();
                _this.refresherGlobal = null;
            }
        })
            .do(function (response) {
            if (!response.ResponseData.length && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        })
            .subscribe(function (response) {
            if (_this.page == 1) {
                _this.activities = [];
            }
            _this.activities = _this.activities.concat(response.ResponseData);
            if (infiniteScroll && response.ResponseData.length < 10) {
                infiniteScroll.enable(false);
            }
        }, function (err) {
            if (infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    /**
     * This will increment this.page number
     * and fetch the page
     * @param infiniteScroll (Optional)
     */
    HomePage.prototype.getNextPage = function (infiniteScroll) {
        var _this = this;
        this.page++;
        if (!infiniteScroll) {
            this.isLoading = true;
        }
        this.contentProvider.getActivitiesForMySpace(this.page)
            .finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            else {
                _this.isLoading = false;
                _this.isLoadingFirst = false;
            }
            if (_this.refresherGlobal) {
                _this.refresherGlobal.complete();
                _this.refresherGlobal = null;
            }
        })
            .do(function (response) {
            if (!response.ResponseData.length && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        })
            .subscribe(function (response) {
            if (_this.page == 1) {
                _this.activities = [];
            }
            _this.activities = _this.activities.concat(response.ResponseData);
        }, function (err) {
            if (infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/home/home.html"*/'<ion-header>\n\n  <ion-navbar color="blue">\n\n    <ion-title>{{ "HOME" | translate }}</ion-title>\n\n    <button ion-button icon-only button-clear menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n  <ion-card space-filter-home>\n\n    <ion-list>\n\n      <ion-item>\n\n        <ion-select interface="action-sheet" [(ngModel)]="currentSpace" (ionChange)="changeSpace()" [style.maxWidth]="\'inherit\'"\n\n          [style.minWidth]="\'100px\'" [selectOptions]="selectOptions">\n\n          <ion-option [value]="\'null\'">All</ion-option>\n\n          <ion-option [value]="0">Top level community</ion-option>\n\n          <ion-option *ngFor="let item of spacesList" [value]="item.SpaceID">{{ item.SpaceName }}</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n    </ion-list>\n\n  </ion-card>\n\n</ion-header>\n\n\n\n<ion-content no-margin>\n\n  <ion-refresher *ngIf="!isLoadingFirst" (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <!-- <loader *ngIf="isLoading"></loader> -->\n\n  <div *ngIf="isLoading">\n\n    <empty-card *ngFor="let item of [1, 2, 3]"></empty-card>\n\n  </div>\n\n  <home-activity-card [activity]="activities" *ngFor="let activities of activities"></home-activity-card>\n\n  <ion-infinite-scroll *ngIf="currentSpace == 0 && !isLoading" (ionInfinite)="getNextPage($event)">\n\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n  <ion-infinite-scroll *ngIf="currentSpace != 0 && !isLoading" (ionInfinite)="getNextPageForSpace($event)">\n\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_authentication__["a" /* AuthenticationProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_spaces__["a" /* SpacesProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=47.js.map