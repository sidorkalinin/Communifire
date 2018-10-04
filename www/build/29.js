webpackJsonp([29],{

/***/ 680:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpaceAnnouncementPageModule", function() { return SpaceAnnouncementPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__space_announcement__ = __webpack_require__(753);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_spaces__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var SpaceAnnouncementPageModule = /** @class */ (function () {
    function SpaceAnnouncementPageModule() {
    }
    SpaceAnnouncementPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__space_announcement__["a" /* SpaceAnnouncementPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__space_announcement__["a" /* SpaceAnnouncementPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__providers_spaces__["a" /* SpacesProvider */]
            ]
        })
    ], SpaceAnnouncementPageModule);
    return SpaceAnnouncementPageModule;
}());

//# sourceMappingURL=space-announcement.module.js.map

/***/ }),

/***/ 753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpaceAnnouncementPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_spaces__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_vibration__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SpaceAnnouncementPage = /** @class */ (function () {
    function SpaceAnnouncementPage(navCtrl, navParams, spaceProvider, vibration, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.spaceProvider = spaceProvider;
        this.vibration = vibration;
        this.platform = platform;
        this.spaceID = this.navParams.get('SpaceID');
        this.title = this.navParams.get('title');
        this.announcements = [];
        this.isLoading = false;
        this.isRefresh = false;
        this.getAnnouncements();
        if (!this.title) {
            this.getSpaceTitle();
        }
    }
    SpaceAnnouncementPage.prototype.ionViewDidLoad = function () {
    };
    SpaceAnnouncementPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    SpaceAnnouncementPage.prototype.doRefreshAnnouncements = function (refresher) {
        var _this = this;
        this.isRefresh = true;
        this.vibrate();
        this.spaceProvider.getAnnouncements(this.spaceID)
            .finally(function () {
            _this.isRefresh = false;
            refresher.complete();
        })
            .subscribe(function (res) {
            _this.isRefresh = false;
            if (res.IsError == false) {
                if (res.ResponseData) {
                    _this.announcements = res.ResponseData;
                }
            }
        });
    };
    SpaceAnnouncementPage.prototype.getAnnouncements = function (infiniteScroll) {
        var _this = this;
        this.isLoading = true;
        this.spaceProvider.getAnnouncements(this.spaceID)
            .finally(function () {
            _this.isLoading = false;
        })
            .subscribe(function (res) {
            _this.isLoading = false;
            console.log(res);
            if (res.IsError == false) {
                if (res.ResponseData) {
                    _this.announcements = res.ResponseData;
                }
            }
        });
    };
    SpaceAnnouncementPage.prototype.gotoDetail = function (item) {
        this.navCtrl.push('announcement-detail', {
            SpaceID: this.spaceID,
            title: this.title,
            EntityID: item.PropertyID
        });
    };
    SpaceAnnouncementPage.prototype.getSpaceTitle = function () {
        var _this = this;
        this.spaceProvider.getSpace(this.spaceID)
            .subscribe(function (res) {
            _this.title = res.SpaceName;
        });
    };
    SpaceAnnouncementPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-space-announcement',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/spaces/space-announcement/space-announcement.html"*/'<!--\n\n  Generated template for the SpaceAnnouncementPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{title}}</ion-title>\n\n    <button ion-button icon-only button-clear menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>  \n\n</ion-header>\n\n\n\n<ion-content no-margin>\n\n  <ion-refresher (ionRefresh)="doRefreshAnnouncements($event)" [enabled]="!isRefresh">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>  \n\n  <ion-card card-title>\n\n    <ion-card-content>\n\n      <span>\n\n        {{ "ANNOUNCEMENT.ANNOUNCEMENTS" | translate }}\n\n      </span>\n\n    </ion-card-content>\n\n  </ion-card>\n\n  <loader *ngIf="isLoading == true"></loader>  \n\n  <no-announcement-found *ngIf="(isLoading == false) && (announcements.length == 0)"></no-announcement-found>\n\n  <ion-list *ngIf="isLoading == false">\n\n    <announcement *ngFor="let announcement of announcements" [announcement]="announcement" (open)="gotoDetail($event)"></announcement>\n\n  </ion-list>\n\n  <!-- <ion-infinite-scroll *ngIf="!isLoading" (ionInfinite)="getAnnouncements($event)">\n\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll> -->\n\n</ion-content>\n\n  \n\n'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/spaces/space-announcement/space-announcement.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_spaces__["a" /* SpacesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */]])
    ], SpaceAnnouncementPage);
    return SpaceAnnouncementPage;
}());

//# sourceMappingURL=space-announcement.js.map

/***/ })

});
//# sourceMappingURL=29.js.map