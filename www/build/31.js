webpackJsonp([31],{

/***/ 679:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnouncementDetailPageModule", function() { return AnnouncementDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__announcement_detail__ = __webpack_require__(752);
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







var AnnouncementDetailPageModule = /** @class */ (function () {
    function AnnouncementDetailPageModule() {
    }
    AnnouncementDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__announcement_detail__["a" /* AnnouncementDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__announcement_detail__["a" /* AnnouncementDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__["a" /* PipesModule */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__providers_spaces__["a" /* SpacesProvider */]
            ]
        })
    ], AnnouncementDetailPageModule);
    return AnnouncementDetailPageModule;
}());

//# sourceMappingURL=announcement-detail.module.js.map

/***/ }),

/***/ 752:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnouncementDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_spaces__ = __webpack_require__(42);
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
 * Generated class for the AnnouncementDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AnnouncementDetailPage = /** @class */ (function () {
    function AnnouncementDetailPage(navCtrl, navParams, spaceProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.spaceProvider = spaceProvider;
        this.spaceID = this.navParams.get('SpaceID');
        this.title = this.navParams.get('title');
        this.EntityID = this.navParams.get('EntityID');
        this.isLoading = false;
        this.getAnnouncements();
        if (this.spaceID == 0) {
            this.spaceProvider.getSpace(0)
                .subscribe(function (space) {
                _this.title = space.SpaceName;
            });
        }
    }
    AnnouncementDetailPage.prototype.getAnnouncements = function (infiniteScroll) {
        var _this = this;
        this.isLoading = true;
        this.spaceProvider.getAnnouncements(this.spaceID)
            .finally(function () {
            _this.isLoading = false;
        })
            .subscribe(function (res) {
            console.log(res);
            _this.isLoading = false;
            if (res.IsError == false) {
                var list = res.ResponseData;
                console.log(list);
                for (var i = 0; i < list.length; i++) {
                    if (list[i].PropertyID == _this.EntityID) {
                        _this.item = list[i];
                    }
                }
            }
        });
    };
    AnnouncementDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AnnouncementDetailPage');
    };
    AnnouncementDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-announcement-detail',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/spaces/announcement/announcement-detail/announcement-detail.html"*/'<!--\n\n  Generated template for the AnnouncementDetailPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{"ANNOUNCEMENT.TITLE" | translate}}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content no-margin>\n\n  <div class="article-content" padding>\n\n    <loader *ngIf="isLoading"></loader>\n\n    <div class="article-title-detail" text-center *ngIf="!isLoading && item">\n\n      <img class="profile-img"\n\n        [src]="item?.SpaceImageUrl | secure | async">\n\n      <span>\n\n        <h3>\n\n          {{item?.PropertyName}}\n\n        </h3>\n\n      </span>\n\n    </div>\n\n    <div class="article-desc" *ngIf="!isLoading && item">\n\n      <p [innerHtml]="item?.PropertyValue"></p>\n\n    </div>\n\n  </div>  \n\n</ion-content>\n\n'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/spaces/announcement/announcement-detail/announcement-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_spaces__["a" /* SpacesProvider */]])
    ], AnnouncementDetailPage);
    return AnnouncementDetailPage;
}());

//# sourceMappingURL=announcement-detail.js.map

/***/ })

});
//# sourceMappingURL=31.js.map