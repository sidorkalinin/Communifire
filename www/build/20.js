webpackJsonp([20],{

/***/ 689:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WallpostDetailPageModule", function() { return WallpostDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wallpost_detail__ = __webpack_require__(762);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pipes_pipes_modules__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var WallpostDetailPageModule = /** @class */ (function () {
    function WallpostDetailPageModule() {
    }
    WallpostDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__wallpost_detail__["a" /* WallpostDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__wallpost_detail__["a" /* WallpostDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_8__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_taptic_engine__["a" /* TapticEngine */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_vibration__["a" /* Vibration */]
            ]
        })
    ], WallpostDetailPageModule);
    return WallpostDetailPageModule;
}());

//# sourceMappingURL=wallpost-detail.module.js.map

/***/ }),

/***/ 762:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WallpostDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_comment_modal_comment_modal__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_single_content_like_single_content_like__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__ = __webpack_require__(86);
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












var WallpostDetailPage = /** @class */ (function () {
    function WallpostDetailPage(navCtrl, navParams, modalCtrl, contentProvider, loadingCtrl, taptic, iab, vibration, platform, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.contentProvider = contentProvider;
        this.loadingCtrl = loadingCtrl;
        this.taptic = taptic;
        this.iab = iab;
        this.vibration = vibration;
        this.platform = platform;
        this.translate = translate;
        this.contentId = this.navParams.get('id');
        this.isRefreshing = false;
        this.page = 0;
        this.comments = [];
    }
    WallpostDetailPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    WallpostDetailPage.prototype.ngOnInit = function () {
        this.getUserByContentId();
        // this.getComments();
    };
    WallpostDetailPage.prototype.setCount = function ($event) {
        this.likesCount = $event;
    };
    WallpostDetailPage.prototype.openBrowser = function (link) {
        var domain = localStorage.getItem("community_url");
        var options = {
            location: "yes"
        };
        this.iab.create(domain + link, "_system", options);
    };
    WallpostDetailPage.prototype.getUserByContentId = function () {
        var _this = this;
        this.translate.get("COMMONS.LOADING_WALLPOST").subscribe(function (res) {
            var loading = _this.loadingCtrl.create({
                content: res
            });
            loading.present();
            _this.contentProvider.getWallPost(_this.contentId)
                .finally(function () { return loading.dismiss(); })
                .subscribe(function (res) {
                _this.contentDetail = res.ResponseData;
                console.log(_this.contentDetail);
            });
        });
    };
    WallpostDetailPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        if (this.infiniteScroll) {
            this.infiniteScroll.enable(true);
        }
        this.taptic.impact({ style: 'light' });
        this.vibrate();
        this.contentProvider.getWallPost(this.contentId)
            .finally(function () { return refresher.complete(); })
            .subscribe(function (res) {
            _this.contentDetail = res.ResponseData;
            _this.singleComponentLikeComponent.getLikeCount();
        });
        // this.page = 1;
        // this.comments = [];
        // this.contentProvider.getContentComments(this.contentId, this.page)
        //   .subscribe(res => {
        //     this.handleComments(res);
        //   })
    };
    // getComments(infiniteScroll?: InfiniteScroll){
    //   if(infiniteScroll){
    //     this.infiniteScroll = infiniteScroll;
    //   }
    //   if (this.comments.length == 0 && infiniteScroll){
    //     infiniteScroll.enable(false);
    //   }
    //   if (this.comments.length >= 0 && this.comments.length < 10 && infiniteScroll){
    //     infiniteScroll.enable(false);
    //   }
    //   this.page++;
    //   this.contentProvider.getContentComments(this.contentId, this.page)
    //     .finally(() => {
    //       if (infiniteScroll) {
    //         infiniteScroll.complete();
    //       }
    //     })
    //     .do(response => {
    //       if (!response.ResponseData && infiniteScroll) {
    //         infiniteScroll.enable(false);
    //         this.page--; // Restore page back to the last correct page
    //       }
    //     })
    //     .subscribe(res => {
    //       this.handleComments(res);
    //       if (res.ResponseData && res.ResponseData.length < 10 && infiniteScroll){
    //         infiniteScroll.enable(false);
    //       }
    //     })
    // }
    // private handleComments(response) {
    //   if (response.ResponseData){
    //     this.comments = this.comments.concat(response.ResponseData);
    //     this.comments = this.contentProvider.getNestedChildren(this.comments, 0);
    //   }
    // }
    WallpostDetailPage.prototype.getTitle = function () {
        return "TITLES.WALLPOST";
    };
    WallpostDetailPage.prototype.openModal = function ($event) {
        var _this = this;
        var data = {
            entity: this.contentDetail,
        };
        if ($event) {
            data['parentComment'] = $event;
        }
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__components_comment_modal_comment_modal__["a" /* CommentModalComponent */], data);
        modal.present();
        modal.onDidDismiss(function (data) {
            // this.comments = data.comments;
            _this.contentDetail.CommentCount += data.count;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_6__components_single_content_like_single_content_like__["a" /* SingleContentLikeComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6__components_single_content_like_single_content_like__["a" /* SingleContentLikeComponent */])
    ], WallpostDetailPage.prototype, "singleComponentLikeComponent", void 0);
    WallpostDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-wallpost-detail',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/wallpost/wallpost-detail/wallpost-detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{ getTitle() | translate}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n\n\n  <div class="banner" *ngIf="contentDetail?.ContentFeaturedImageFullURL">\n\n    <img [src]="contentDetail?.ContentFeaturedImageFullURL | secure | async">\n\n  </div>\n\n\n\n  <div class="article-content" padding>\n\n    <div class="article-title-detail" text-center>\n\n      <img class="profile-img" [class.hasCover]="!!contentDetail?.ContentFeaturedImageFullURL" *ngIf="contentDetail?.UserAvatarFullUrl"\n\n        [src]="contentDetail?.UserAvatarFullUrl | secure | async">\n\n      <h3 [innerHtml]="contentDetail?.ContentTitle"></h3>\n\n      <p>\n\n        <span>{{contentDetail?.DateCreatedString}}</span>\n\n        <span>{{"ARTICLE.BY" | translate}}</span>&nbsp;\n\n        <span [innerHtml]="contentDetail?.UserDisplayName"></span>\n\n      </p>\n\n      <p>\n\n        {{"ARTICLE.POSTEDIN" | translate}}\n\n        <span *ngIf="contentDetail?.SpaceID > 0">{{ contentDetail?.SpaceName }}</span>\n\n        <span *ngIf="contentDetail?.SpaceID === 0">Top Level Community</span>\n\n      </p>\n\n\n\n      <p>\n\n        <!-- <span>{{contentDetail?.ViewCount}} {{"ARTICLE.VIEWS" | translate}}</span>\n\n          &nbsp; -->\n\n        <span *ngIf="contentDetail?.CommentCount == 1">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENT" | translate}}</span>\n\n        <span *ngIf="contentDetail?.CommentCount > 1 || contentDetail?.CommentCount == 0">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENTS" | translate}}</span>\n\n      </p>\n\n    </div>\n\n\n\n    <div class="article-desc">\n\n      <p [innerHtml]="contentDetail?.WallTextHtmlFormatted"></p>\n\n    </div>\n\n    <!-- \n\n        Photo Slides\n\n       -->\n\n    <ion-slides>\n\n      <ion-slide *ngFor="let item of contentDetail?.ChildNewsFeed?.Photos">\n\n        <img [src]="item.ContentMediaUrl | secure | async">\n\n      </ion-slide>\n\n    </ion-slides>\n\n\n\n    <ion-row>\n\n      <ion-col no-padding col-12 *ngFor="let item of contentDetail?.ChildNewsFeed?.Files">\n\n        <h6 (click)="openBrowser(item.ContentMediaUrl)">{{ item?.ContentTitle }}\n\n          <fa-icon name="external-link" item-end></fa-icon>\n\n        </h6>\n\n      </ion-col>\n\n    </ion-row>\n\n    <!-- <show-attachments [entity]="{id: contentId, type: 10}"></show-attachments> -->\n\n  </div>\n\n  <ion-list no-margin class="article-tags" padding-horizontal *ngIf="contentDetail?.TagsCSV" no-lines>\n\n    <ion-item>\n\n      <h6>{{"ARTICLE.TAGS" | translate}}</h6>\n\n      <h6>{{contentDetail?.TagsCSV}}</h6>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <ion-row class="article-likes-comments" padding-horizontal>\n\n    <ion-col no-padding>\n\n      <content-like [likesCount]="likesCount"></content-like>\n\n    </ion-col>\n\n    <ion-col no-padding>\n\n      <p text-right *ngIf="contentDetail?.CommentCount == 1">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENT" | translate}}</p>\n\n      <p text-right *ngIf="contentDetail?.CommentCount > 1 || contentDetail?.CommentCount == 0">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENTS" | translate}}</p>\n\n    </ion-col>\n\n  </ion-row>\n\n  <div class="article-response like-button-section" padding-horizontal>\n\n    <single-content-like *ngIf="!isRefreshing" (getCount)="setCount($event)" [contentID]="contentDetail?.WallID" [entityType]="10"></single-content-like>\n\n  </div>\n\n  <div class="article-response write-comment-section" padding-horizontal>\n\n    <write-comment (click)="openModal()"></write-comment>\n\n  </div>\n\n  <div class="article-comments">\n\n    <comment [comments]="contentDetail?.WallComment" (sendParent)="openModal($event)" [step]="0"></comment>\n\n    <!-- <ion-infinite-scroll (ionInfinite)="getComments($event)" threshold="1000px">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll> -->\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/wallpost/wallpost-detail/wallpost-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["c" /* TranslateService */]])
    ], WallpostDetailPage);
    return WallpostDetailPage;
}());

//# sourceMappingURL=wallpost-detail.js.map

/***/ })

});
//# sourceMappingURL=20.js.map