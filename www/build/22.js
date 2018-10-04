webpackJsonp([22],{

/***/ 709:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoDetailPageModule", function() { return VideoDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__video_detail__ = __webpack_require__(782);
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







var VideoDetailPageModule = /** @class */ (function () {
    function VideoDetailPageModule() {
    }
    VideoDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__video_detail__["a" /* VideoDetailPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__video_detail__["a" /* VideoDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]
            ]
        })
    ], VideoDetailPageModule);
    return VideoDetailPageModule;
}());

//# sourceMappingURL=video-detail.module.js.map

/***/ }),

/***/ 782:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_comment_modal_comment_modal__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_single_content_like_single_content_like__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_device__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_center_analytics__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_platform_browser__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var VideoDetailPage = /** @class */ (function () {
    function VideoDetailPage(navCtrl, navParams, modalCtrl, contentProvider, loadingCtrl, taptic, vibration, platform, translate, device, appCenterAnalytics, domSanitizer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.contentProvider = contentProvider;
        this.loadingCtrl = loadingCtrl;
        this.taptic = taptic;
        this.vibration = vibration;
        this.platform = platform;
        this.translate = translate;
        this.device = device;
        this.appCenterAnalytics = appCenterAnalytics;
        this.domSanitizer = domSanitizer;
        this.contentId = this.navParams.get('id');
        this.canedit = false;
        this.isIframe = false;
        this.isLoadingIframe = false;
        this.isIphoneX = false;
        this.page = 0;
        this.comments = [];
        if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
            this.isIphoneX = true;
        }
    }
    VideoDetailPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    VideoDetailPage.prototype.ngOnInit = function () {
        this.getUserByContentId();
        this.getComments();
    };
    VideoDetailPage.prototype.setCount = function ($event) {
        this.likesCount = $event;
    };
    VideoDetailPage.prototype.dismissLoading = function () {
        this.isLoadingIframe = false;
    };
    VideoDetailPage.prototype.getUserByContentId = function () {
        var _this = this;
        this.translate.get("COMMONS.LOADING_VIDEO").subscribe(function (res) {
            var loading = _this.loadingCtrl.create({
                content: res
            });
            loading.present();
            _this.contentProvider.getContentByID(_this.contentId)
                .finally(function () { return loading.dismiss(); })
                .subscribe(function (res) {
                _this.contentDetail = res.ResponseData;
                _this.contentDetail.ContentBody = _this.domSanitizer.bypassSecurityTrustHtml(_this.contentDetail.ContentBody);
                console.log(_this.contentDetail);
                if ((_this.contentDetail.ContentMediaUrl.indexOf("youtube.com/") != -1) || (_this.contentDetail.ContentMediaUrl.indexOf("youtu.be/") != -1)) {
                    _this.isIframe = true;
                    if (_this.contentDetail.ContentMediaUrl.indexOf('watch?v=') == -1) {
                        var ttt = _this.contentDetail.ContentMediaUrl.split('/').pop();
                        _this.contentDetail.ContentMediaUrl = 'https://www.youtube.com/watch?v=' + ttt;
                    }
                    _this.trustedVideoUrl = _this.domSanitizer.bypassSecurityTrustResourceUrl(_this.contentDetail.ContentMediaUrl.replace('watch?v=', '/embed/'));
                    _this.isLoadingIframe = true;
                }
                else if (_this.contentDetail.ContentMediaUrl.indexOf('<iframe') != -1) {
                    _this.isIframe = true;
                    var ttt = _this.contentDetail.ContentMediaUrl.substring(_this.contentDetail.ContentMediaUrl.indexOf('<iframe>'), _this.contentDetail.ContentMediaUrl.indexOf('</iframe>'));
                    var srcposition = ttt.indexOf('src="') + 5;
                    while (ttt[srcposition] != '"') {
                        srcposition++;
                    }
                    _this.trustedVideoUrl = _this.domSanitizer.bypassSecurityTrustResourceUrl(ttt.substring(ttt.indexOf('src="') + 5, srcposition));
                    _this.isLoadingIframe = true;
                }
                else if (_this.contentDetail.ContentMediaUrl.indexOf('https://vimeo.com') != -1) {
                    _this.contentDetail.ContentMediaUrl = _this.contentDetail.ContentMediaUrl.replace('https://vimeo.com', 'https://player.vimeo.com/video');
                    console.log(_this.contentDetail.ContentMediaUrl);
                    _this.isIframe = true;
                    _this.trustedVideoUrl = _this.domSanitizer.bypassSecurityTrustResourceUrl(_this.contentDetail.ContentMediaUrl);
                    _this.isLoadingIframe = true;
                }
                else if ((_this.contentDetail.ContentMediaUrl.indexOf('http://') != -1) || (_this.contentDetail.ContentMediaUrl.indexOf('https://') != -1)) {
                    _this.isIframe = true;
                    _this.trustedVideoUrl = _this.domSanitizer.bypassSecurityTrustResourceUrl(_this.contentDetail.ContentMediaUrl);
                    _this.isLoadingIframe = true;
                }
                else {
                    _this.isIframe = false;
                }
                _this.checkPermission();
                _this.appCenterAnalytics.isEnabled().then(function (b) {
                    if (b) {
                        _this.appCenterAnalytics.trackEvent('Video Detail Load.', { id: _this.contentId, userid: localStorage.getItem('UserID') }).then(function () {
                            console.log('Video Detail Load Event tracked');
                        });
                    }
                });
            });
        });
    };
    VideoDetailPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        if (this.infiniteScroll) {
            this.infiniteScroll.enable(true);
        }
        this.taptic.impact({ style: 'light' });
        this.vibrate();
        this.contentProvider.getContentByID(this.contentId)
            .finally(function () { return refresher.complete(); })
            .subscribe(function (res) {
            _this.contentDetail = res.ResponseData;
            if (_this.contentDetail.ContentMediaUrl.indexOf("youtube.com/") != -1) {
                _this.isIframe = true;
                _this.trustedVideoUrl = _this.domSanitizer.bypassSecurityTrustResourceUrl(_this.contentDetail.ContentMediaUrl.replace('watch?v=', '/embed/'));
            }
            else {
                _this.isIframe = false;
            }
            _this.singleComponentLikeComponent.getLikeCount();
        });
        this.page = 1;
        this.comments = [];
        this.contentProvider.getContentComments(this.contentId, this.page)
            .subscribe(function (res) {
            _this.handleComments(res);
        });
    };
    VideoDetailPage.prototype.getComments = function (infiniteScroll) {
        var _this = this;
        if (infiniteScroll) {
            this.infiniteScroll = infiniteScroll;
        }
        if (this.comments.length >= 0 && this.comments.length < 10 && infiniteScroll) {
            infiniteScroll.enable(false);
        }
        this.page++;
        this.contentProvider.getContentComments(this.contentId, this.page)
            .finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
        })
            .do(function (response) {
            if (!response.ResponseData && infiniteScroll) {
                infiniteScroll.enable(false);
                _this.page--; // Restore page back to the last correct page
            }
        })
            .subscribe(function (res) {
            _this.handleComments(res);
            if (res.ResponseData && res.ResponseData.length < 10 && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    VideoDetailPage.prototype.handleComments = function (response) {
        if (response.ResponseData) {
            this.comments = this.comments.concat(response.ResponseData);
            this.comments = this.contentProvider.getNestedChildren(this.comments, 0);
        }
    };
    VideoDetailPage.prototype.getTitle = function () {
        return "TITLES.Video";
    };
    VideoDetailPage.prototype.openModal = function ($event) {
        var _this = this;
        var data = {
            entity: this.contentDetail,
        };
        if ($event) {
            data['parentComment'] = $event;
        }
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__components_comment_modal_comment_modal__["a" /* CommentModalComponent */], data);
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.comments = data.comments;
            _this.contentDetail.CommentCount += data.count;
        });
    };
    VideoDetailPage.prototype.navToList = function () {
        var active = this.navCtrl.getActive();
        var parent = this.navCtrl.getPrevious();
        if (this.contentDetail.SpaceID === 0) {
            this.navCtrl.push("video-list", {
                title: this.contentDetail.ReportedByUserName,
                UserID: this.contentDetail.UserID
            }, {
                direction: "back"
            });
        }
        else {
            this.navCtrl.push("video-list", {
                title: this.contentDetail.SpaceName,
                SpaceID: this.contentDetail.SpaceID
            }, {
                direction: "back"
            });
        }
        this.navCtrl.removeView(active);
        this.navCtrl.removeView(parent);
    };
    VideoDetailPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    VideoDetailPage.prototype.checkPermission = function () {
        var _this = this;
        if (this.contentDetail.AuthorID == localStorage.getItem('UserID')) {
            this.contentProvider.checkPermission({
                entitytype: 7,
                spaceid: this.contentDetail.SpaceID,
            })
                .finally(function () {
            })
                .subscribe(function (res) {
                _this.canedit = res.ResponseData.update;
            });
        }
        else {
            this.contentProvider.checkPermission({
                entitytype: 7,
                spaceid: this.contentDetail.SpaceID,
            })
                .finally(function () {
            })
                .subscribe(function (res) {
                _this.canedit = res.ResponseData.AdminEntityUpdate;
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_6__components_single_content_like_single_content_like__["a" /* SingleContentLikeComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_6__components_single_content_like_single_content_like__["a" /* SingleContentLikeComponent */])
    ], VideoDetailPage.prototype, "singleComponentLikeComponent", void 0);
    VideoDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-video-detail',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/videos/video-detail/video-detail.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <ion-title (click)="navToList()">{{ getTitle() | translate}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-header>\n\n  <ion-toolbar>\n\n    <ion-buttons left>\n\n      <button ion-button icon-only (click)="cancel()">\n\n        <ion-icon name="ios-arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title (click)="navToList()">{{ getTitle() | translate}}</ion-title>\n\n    <ion-buttons right>\n\n      <edit-button [entity]=\'{contentId: contentId, entityType: "video"}\' [hidden]=\'!canedit\'></edit-button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div *ngIf="isLoadingIframe">\n\n    <loader></loader>\n\n  </div>\n\n  <iframe width="100%" [src]="trustedVideoUrl" frameborder="0" allowfullscreen *ngIf="isIframe" (load)="dismissLoading()" [ngClass]="{\'hide-frame\':isLoadingIframe}" ></iframe>\n\n  <video controls class="video" [src]="contentDetail?.ContentMediaServerRootURL + \'/\' + contentDetail?.ContentMediaFileName"\n\n    *ngIf=\'!isIframe\' controlsList="nodownload"></video>\n\n\n\n  <div class="article-content" padding>\n\n    <div class="article-title-detail">\n\n      <h3>\n\n        {{contentDetail?.ContentTitle}}\n\n      </h3>\n\n      <ion-row>\n\n        <ion-col col-2 text-left>\n\n          <img class="profile-img video-page" [class.hasCover]="!!contentDetail?.ContentFeaturedImageFullURL" *ngIf="contentDetail?.AuthorAvatarImageUrl"\n\n            [src]="contentDetail?.AuthorAvatarImageUrl | secure | async">\n\n        </ion-col>\n\n        <ion-col col-10 text-left>\n\n          <p>\n\n            <span>{{contentDetail?.DateCreatedString}}</span>\n\n            <span>{{"ARTICLE.BY" | translate}}</span>&nbsp;\n\n            <span [innerHtml]="contentDetail?.AuthorDisplayName"></span>\n\n          </p>\n\n          <p>\n\n            {{"ARTICLE.POSTEDIN" | translate}}\n\n            <span *ngIf="contentDetail?.SpaceID > 0">{{ contentDetail?.SpaceName }}</span>\n\n            <span *ngIf="contentDetail?.SpaceID === 0">Top Level Community</span>\n\n          </p>\n\n          <p>\n\n            <span>{{contentDetail?.ViewCount}} {{"ARTICLE.VIEWS" | translate}}</span>\n\n            &nbsp;\n\n            <span *ngIf="contentDetail?.CommentCount == 1">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENT" | translate}}</span>\n\n            <span *ngIf="contentDetail?.CommentCount > 1 || contentDetail?.CommentCount == 0">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENTS" | translate}}</span>\n\n          </p>\n\n        </ion-col>\n\n      </ion-row>\n\n\n\n    </div>\n\n\n\n    <div class="article-desc">\n\n      <span [innerHtml]="contentDetail?.ContentBody"></span>\n\n    </div>\n\n\n\n    <show-attachments [entity]="{id: contentId, type: 7}"></show-attachments>\n\n  </div>\n\n  <ion-list no-margin class="article-tags" padding-horizontal *ngIf="contentDetail?.TagsCSV" no-lines>\n\n    <ion-item>\n\n      <h6>{{"ARTICLE.TAGS" | translate}}</h6>\n\n      <h6>{{contentDetail?.TagsCSV}}</h6>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <ion-row class="article-likes-comments" padding-horizontal>\n\n    <ion-col no-padding>\n\n      <content-like [likesCount]="likesCount"></content-like>\n\n    </ion-col>\n\n    <ion-col no-padding>\n\n      <p text-right *ngIf="contentDetail?.CommentCount == 1">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENT" | translate}}</p>\n\n      <p text-right *ngIf="contentDetail?.CommentCount > 1 || contentDetail?.CommentCount == 0">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENTS" | translate}}</p>\n\n    </ion-col>\n\n  </ion-row>\n\n  <div class="article-response like-button-section" padding-horizontal>\n\n    <single-content-like (getCount)="setCount($event)" [contentID]="contentDetail?.ContentID" [entityType]="7"></single-content-like>\n\n  </div>\n\n  <div class="article-response write-comment-section" padding-horizontal>\n\n    <write-comment (click)="openModal()"></write-comment>\n\n  </div>\n\n  <div class="article-comments">\n\n    <comment [comments]="comments" [step]="0"></comment>\n\n    <ion-infinite-scroll (ionInfinite)="getComments($event)" threshold="1000px">\n\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/videos/video-detail/video-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
            __WEBPACK_IMPORTED_MODULE_12__angular_platform_browser__["c" /* DomSanitizer */]])
    ], VideoDetailPage);
    return VideoDetailPage;
}());

//# sourceMappingURL=video-detail.js.map

/***/ })

});
//# sourceMappingURL=22.js.map