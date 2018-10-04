webpackJsonp([37],{

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhotoDetailPageModule", function() { return PhotoDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__photo_detail__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_center_analytics__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_modules__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var PhotoDetailPageModule = /** @class */ (function () {
    function PhotoDetailPageModule() {
    }
    PhotoDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__photo_detail__["a" /* PhotoDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__photo_detail__["a" /* PhotoDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]
            ]
        })
    ], PhotoDetailPageModule);
    return PhotoDetailPageModule;
}());

//# sourceMappingURL=photo-detail.module.js.map

/***/ }),

/***/ 746:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotoDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_single_content_like_single_content_like__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(13);
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









var PhotoDetailPage = /** @class */ (function () {
    function PhotoDetailPage(navCtrl, navParams, contentProvider, taptic, vibration, platform, loadingCtrl, translate, appCenterAnalytics) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contentProvider = contentProvider;
        this.taptic = taptic;
        this.vibration = vibration;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.appCenterAnalytics = appCenterAnalytics;
        this.id = this.navParams.get('id');
        this.title = this.navParams.get('title');
        this.contentDetail = {};
        this.getPhotoInfo();
    }
    PhotoDetailPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    PhotoDetailPage.prototype.getPhotoInfo = function (refresher) {
        var _this = this;
        if (refresher) {
            this.taptic.impact({ style: 'light' });
            this.vibrate();
        }
        else {
            this.translate.get("COMMONS.LOADING_ALBUM").subscribe(function (res) {
                _this.loader = _this.loadingCtrl.create({
                    content: res
                });
                _this.loader.present();
            });
        }
        this.contentProvider.getContentByID(this.id).finally(function () {
            if (refresher) {
                refresher.complete();
            }
            else {
                _this.loader.dismiss();
            }
        }).subscribe(function (res) {
            console.log(res);
            _this.contentDetail = res.ResponseData;
            _this.appCenterAnalytics.isEnabled().then(function (b) {
                if (b) {
                    _this.appCenterAnalytics.trackEvent('Photo Detail Load.', { id: _this.id.toString(), userid: localStorage.getItem('UserID') }).then(function () {
                        console.log('Photo Detail Load Event tracked');
                    });
                }
            });
        });
    };
    PhotoDetailPage.prototype.ionViewDidLoad = function () {
    };
    PhotoDetailPage.prototype.setCount = function ($event) {
        this.likesCount = $event;
    };
    PhotoDetailPage.prototype.navToList = function () {
        var active = this.navCtrl.getActive();
        var parent = this.navCtrl.getPrevious();
        if (this.contentDetail.SpaceID === 0) {
            this.navCtrl.push("photo-list", {
                title: this.contentDetail.ReportedByUserName,
                UserID: this.contentDetail.UserID
            }, {
                direction: "back"
            });
        }
        else {
            this.navCtrl.push("photo-list", {
                title: this.contentDetail.SpaceName,
                SpaceID: this.contentDetail.SpaceID
            }, {
                direction: "back"
            });
        }
        this.navCtrl.removeView(active);
        this.navCtrl.removeView(parent);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3__components_single_content_like_single_content_like__["a" /* SingleContentLikeComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__components_single_content_like_single_content_like__["a" /* SingleContentLikeComponent */])
    ], PhotoDetailPage.prototype, "singleComponentLikeComponent", void 0);
    PhotoDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-photo-detail',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/photos/photo-detail/photo-detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{ "TITLES.PHOTOS" | translate }}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="getPhotoInfo($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <!-- <ion-card card-title>\n\n    <ion-card-content>\n\n      <div (click)="navToList()">{{ "TITLES.PHOTOS" | translate }}</div>\n\n    </ion-card-content>\n\n  </ion-card> -->\n\n\n\n  <div class="banner" *ngIf="contentDetail?.ContentThumbImageFullURL">\n\n    <img [style.width]="\'100%\'" [src]="contentDetail?.ContentThumbImageFullURL | secure | async">\n\n  </div>\n\n\n\n  <div class="article-content" padding>\n\n    <div class="article-title-detail" text-center>\n\n      <img class="profile-img" [class.hasCover]="!!contentDetail?.ContentFeaturedImageFullURL" *ngIf="contentDetail?.AuthorAvatarImageUrl"\n\n        [src]="contentDetail?.AuthorAvatarImageUrl | secure | async">\n\n      <span>\n\n        <h3>\n\n          {{contentDetail?.ContentTitle}}\n\n          <!-- <edit-button [entity]=\'{contentId: id, entityType: "album"}\'></edit-button> -->\n\n        </h3>\n\n      </span>\n\n      <p>\n\n        <span>{{contentDetail?.DateCreatedString}}</span>\n\n        <span>{{"ARTICLE.BY" | translate}}</span>&nbsp;\n\n        <span [innerHtml]="contentDetail?.AuthorDisplayName"></span>\n\n      </p>\n\n\n\n      <p>\n\n        <span>{{contentDetail?.ViewCount}} {{"ARTICLE.VIEWS" | translate}}</span>\n\n        &nbsp;\n\n        <span>{{ likesCount?.LikeCount }} {{ "COMMONS.LIKES" | translate }}</span>\n\n        &nbsp;\n\n        <span *ngIf="contentDetail?.CommentCount == 1">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENT" | translate}}</span>\n\n        <span *ngIf="contentDetail?.CommentCount > 1 || contentDetail?.CommentCount == 0">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENTS" | translate}}</span>\n\n      </p>\n\n    </div>\n\n    <div class="comment-line">\n\n      <like-comment-actions [isStream]="false" (likeCount)="setCount($event)" [entity]="contentDetail"></like-comment-actions>\n\n    </div>\n\n\n\n    <div class="article-desc">\n\n      <p [innerHtml]="contentDetail?.ContentBody"></p>\n\n    </div>\n\n  </div>\n\n\n\n  <div class="article-like">\n\n    <content-like [contentID]="contentDetail?.ContentID"></content-like>\n\n  </div>\n\n  <photo-list *ngIf="contentDetail?.ContentID" [parentId]="contentDetail?.ContentID"></photo-list>\n\n\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/photos/photo-detail/photo-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]])
    ], PhotoDetailPage);
    return PhotoDetailPage;
}());

//# sourceMappingURL=photo-detail.js.map

/***/ })

});
//# sourceMappingURL=37.js.map