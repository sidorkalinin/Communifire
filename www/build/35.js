webpackJsonp([35],{

/***/ 675:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhotoListPageModule", function() { return PhotoListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__photo_list__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var PhotoListPageModule = /** @class */ (function () {
    function PhotoListPageModule() {
    }
    PhotoListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__photo_list__["a" /* PhotoListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__photo_list__["a" /* PhotoListPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]
            ]
        })
    ], PhotoListPageModule);
    return PhotoListPageModule;
}());

//# sourceMappingURL=photo-list.module.js.map

/***/ }),

/***/ 748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotoListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_app_center_analytics__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PhotoListPage = /** @class */ (function () {
    function PhotoListPage(navCtrl, navParams, content, taptic, vibration, platform, appCenterAnalytics) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.content = content;
        this.taptic = taptic;
        this.vibration = vibration;
        this.platform = platform;
        this.appCenterAnalytics = appCenterAnalytics;
        this.id = this.navParams.get('SpaceID');
        this.title = this.navParams.get('title');
        this.page = 0;
        this.isLoading = false;
        this.userId = this.navParams.get('UserID');
        this.searchfilter = "";
        this.entityType = 18;
        this.photos = [];
        this.isLoadingSearch = false;
        this.appCenterAnalytics.isEnabled().then(function (b) {
            if (b) {
                _this.appCenterAnalytics.trackEvent('Photo List Load Event.', { userid: localStorage.getItem('UserID') }).then(function () {
                    console.log('Photo List Load Event tracked');
                });
            }
        });
    }
    PhotoListPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    PhotoListPage.prototype.ionViewDidLoad = function () {
        this.doInfinite();
    };
    PhotoListPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.searchfilter = "";
        if (this.infinteScroll) {
            this.infinteScroll.enable(true);
        }
        this.taptic.impact({ style: 'light' });
        this.vibrate();
        this.page = 1;
        var options = {
            EntityType: 18,
            page: this.page,
        };
        this.isLoading = false;
        if (this.userId) {
            options['UserID'] = this.userId;
        }
        if (this.id) {
            options['SpaceID'] = this.id;
        }
        this.content.getContentByEntity(options)
            .finally(function () {
            if (refresher) {
                refresher.complete();
            }
            else {
                _this.isLoading = false;
            }
        })
            .subscribe(function (response) {
            _this.photos = response.ResponseData;
        }, function (err) {
            if (refresher) {
                refresher.complete();
            }
        });
    };
    PhotoListPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.searchfilter.length > 0 && infiniteScroll) {
            this.search(infiniteScroll);
            return 0;
        }
        if (infiniteScroll) {
            this.infinteScroll = infiniteScroll;
        }
        else {
            this.page = 0;
        }
        if (this.photos.length != 0 && this.photos.length < 10) {
            infiniteScroll.enable(false);
            return 0;
        }
        ++this.page;
        if (!infiniteScroll) {
            this.isLoading = true;
        }
        var options = {
            EntityType: 18,
            page: this.page
        };
        if (this.userId) {
            options['UserID'] = this.userId;
        }
        else {
            options['SpaceID'] = this.id;
        }
        this.content.getContentByEntity(options)
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
            .subscribe(function (response) {
            _this.photos = _this.photos.concat(response.ResponseData);
            if (infiniteScroll && response.ResponseData.length < 10) {
                infiniteScroll.enable(false);
            }
        }, function (err) {
            if (infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    PhotoListPage.prototype.search = function (infiniteScroll) {
        var _this = this;
        if (this.searchfilter.length === 0) {
            this.photos = [];
            this.doInfinite();
            return 0;
        }
        if (infiniteScroll) {
            this.infinteScroll = infiniteScroll;
        }
        else {
            this.page = 0;
            this.photos = [];
        }
        if (this.photos.length != 0 && this.photos.length < 10) {
            infiniteScroll.enable(false);
            return 0;
        }
        ++this.page;
        if (!infiniteScroll) {
            this.isLoadingSearch = true;
        }
        var options = {
            EntityType: this.entityType,
            page: this.page,
        };
        if (this.userId) {
            options['UserID'] = this.userId;
        }
        if (this.id) {
            options['SpaceID'] = this.id;
        }
        this.content.search(this.searchfilter, this.entityType, this.page, this.id, this.userId)
            .finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            else {
                _this.isLoadingSearch = false;
            }
        })
            .do(function (response) {
            if (!response.ResponseData.length && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        })
            .subscribe(function (response) {
            _this.photos = _this.photos.concat(response.ResponseData);
            if (infiniteScroll && response.ResponseData.length < 10) {
                infiniteScroll.enable(false);
            }
        }, function (err) {
            if (infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    PhotoListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-photo-list',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/photos/photo-list/photo-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{ title | translate}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher *ngIf="!isLoading" (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <ion-card card-title>\n\n    <ion-card-content>\n\n      <span>\n\n        {{ "TITLES.PHOTO_ALBUMS" | translate }}\n\n      </span>\n\n      <!-- <add-button [entity]="{name: \'Photo Album\', spaceId: id, userId: userId, title: title}"></add-button> -->\n\n    </ion-card-content>\n\n  </ion-card>\n\n  <ion-searchbar [(ngModel)]="searchfilter" (keydown)="isLoadingSearch = true; photos = []" (ionInput)="search()" showCancelButton="true" placeholder="{{\'MODAL.SEARCH...\'|translate}}" cancelButtonText="{{\'TOAST.CANCEL\'|translate}}"></ion-searchbar>\n\n\n\n  <searching-for *ngIf="isLoadingSearch && searchfilter.length != 0" [text]="searchfilter"></searching-for>\n\n\n\n  <div *ngIf="isLoading">\n\n    <empty-card *ngFor="let item of [1, 2, 3]"></empty-card>\n\n  </div>\n\n\n\n  <no-results-found *ngIf="photos.length == 0 && !isLoading && !isLoadingSearch"></no-results-found>\n\n  <photo-card [activity]="item" *ngFor="let item of photos"></photo-card>\n\n\n\n  <ion-infinite-scroll *ngIf="!isLoading" (ionInfinite)="doInfinite($event)" threshold="1000px">\n\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/photos/photo-list/photo-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]])
    ], PhotoListPage);
    return PhotoListPage;
}());

//# sourceMappingURL=photo-list.js.map

/***/ })

});
//# sourceMappingURL=35.js.map