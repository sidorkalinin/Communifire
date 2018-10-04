webpackJsonp([46],{

/***/ 666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaDetailPageModule", function() { return IdeaDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idea_detail__ = __webpack_require__(739);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_modals_module__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_modules__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var IdeaDetailPageModule = /** @class */ (function () {
    function IdeaDetailPageModule() {
    }
    IdeaDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__idea_detail__["a" /* IdeaDetailPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__idea_detail__["a" /* IdeaDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__modals_modals_module__["a" /* ModalModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]
            ]
        })
    ], IdeaDetailPageModule);
    return IdeaDetailPageModule;
}());

//# sourceMappingURL=idea-detail.module.js.map

/***/ }),

/***/ 739:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdeaDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_invite_people_modal_invite_people_modal__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_comment_modal_comment_modal__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_single_content_like_single_content_like__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_device__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_app_center_analytics__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_platform_browser__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var IdeaDetailPage = /** @class */ (function () {
    function IdeaDetailPage(navCtrl, navParams, modalCtrl, contentProvider, loadingCtrl, taptic, vibration, platform, translate, device, appCenterAnalytics, sanitizer) {
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
        this.sanitizer = sanitizer;
        this.contentId = this.navParams.get('id');
        this.canedit = false;
        this.isIphoneX = false;
        this.page = 0;
        this.comments = [];
        if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
            this.isIphoneX = true;
        }
    }
    IdeaDetailPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    IdeaDetailPage.prototype.ngOnInit = function () {
        this.getUserByContentId();
        this.getComments();
        this.getIdeaVote();
    };
    IdeaDetailPage.prototype.adduser = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__modals_invite_people_modal_invite_people_modal__["a" /* InvitePeopleModalComponent */]);
        modal.present();
    };
    IdeaDetailPage.prototype.setCount = function ($event) {
        this.likesCount = $event;
    };
    IdeaDetailPage.prototype.voteUp = function () {
        var _this = this;
        this.contentProvider.ideaVoteUp(this.contentId).subscribe(function (res) {
            _this.contentDetail.VoteCount = res.ResponseData.VoteCount;
            _this.voteStatus = 1;
        });
    };
    IdeaDetailPage.prototype.voteDown = function () {
        var _this = this;
        this.contentProvider.ideaVoteDown(this.contentId).subscribe(function (res) {
            _this.contentDetail.VoteCount = res.ResponseData.VoteCount;
            _this.voteStatus = -1;
        });
    };
    IdeaDetailPage.prototype.getIdeaVote = function () {
        var _this = this;
        this.contentProvider.getIdeaVote(this.contentId).subscribe(function (res) {
            // console.log(res);
            _this.voteStatus = res.ResponseData;
        });
    };
    IdeaDetailPage.prototype.getUserByContentId = function () {
        var _this = this;
        this.translate.get("COMMONS.LOADING_IDEA").subscribe(function (res) {
            var loading = _this.loadingCtrl.create({
                content: res
            });
            loading.present();
            _this.contentProvider.getContentByID(_this.contentId)
                .finally(function () { return loading.dismiss(); })
                .subscribe(function (res) {
                _this.contentDetail = res.ResponseData;
                _this.contentDetail.ContentBody = _this.sanitizer.bypassSecurityTrustHtml(_this.contentDetail.ContentBody);
                _this.checkPermission();
                _this.appCenterAnalytics.isEnabled().then(function (b) {
                    if (b) {
                        _this.appCenterAnalytics.trackEvent('Article Detail Load.', { id: _this.contentId, userid: localStorage.getItem('UserID') }).then(function () {
                            console.log('Article Detail Load Event tracked');
                        });
                    }
                });
            });
        });
    };
    IdeaDetailPage.prototype.doRefresh = function (refresher) {
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
            _this.singleComponentLikeComponent.getLikeCount();
        });
        this.page = 1;
        this.comments = [];
        this.contentProvider.getContentComments(this.contentId, this.page)
            .subscribe(function (res) {
            _this.handleComments(res);
        });
        this.getIdeaVote();
    };
    IdeaDetailPage.prototype.getComments = function (infiniteScroll) {
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
    IdeaDetailPage.prototype.handleComments = function (response) {
        if (response.ResponseData) {
            this.comments = this.comments.concat(response.ResponseData);
            this.comments = this.contentProvider.getNestedChildren(this.comments, 0);
        }
    };
    IdeaDetailPage.prototype.openModal = function ($event) {
        var _this = this;
        var data = {
            entity: this.contentDetail,
        };
        if ($event) {
            data['parentComment'] = $event;
        }
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__components_comment_modal_comment_modal__["a" /* CommentModalComponent */], data);
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.comments = data.comments;
            _this.contentDetail.CommentCount += data.count;
        });
    };
    IdeaDetailPage.prototype.navToList = function () {
        var active = this.navCtrl.getActive();
        var parent = this.navCtrl.getPrevious();
        if (this.contentDetail.SpaceID === 0) {
            this.navCtrl.push("idea-list", {
                title: this.contentDetail.ReportedByUserName,
                UserID: this.contentDetail.UserID
            }, {
                direction: "back"
            });
        }
        else {
            this.navCtrl.push("idea-list", {
                title: this.contentDetail.SpaceName,
                SpaceID: this.contentDetail.SpaceID
            }, {
                direction: "back"
            });
        }
        this.navCtrl.removeView(active);
        this.navCtrl.removeView(parent);
    };
    IdeaDetailPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    IdeaDetailPage.prototype.checkPermission = function () {
        var _this = this;
        if (this.contentDetail.AuthorID == localStorage.getItem('UserID')) {
            this.contentProvider.checkPermission({
                entitytype: 44,
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
                entitytype: 44,
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_7__components_single_content_like_single_content_like__["a" /* SingleContentLikeComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_7__components_single_content_like_single_content_like__["a" /* SingleContentLikeComponent */])
    ], IdeaDetailPage.prototype, "singleComponentLikeComponent", void 0);
    IdeaDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-idea-detail',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/ideas/idea-detail/idea-detail.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <ion-title (click)="navToList()">{{ "IDEA.TITLE" | translate}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-header>\n\n  <ion-toolbar>\n\n    <ion-buttons left>\n\n      <button ion-button icon-only (click)="cancel()">\n\n        <ion-icon name="ios-arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title (click)="navToList()">{{ "IDEA.TITLE" | translate}}</ion-title>\n\n    <ion-buttons right>\n\n      <edit-button [entity]=\'{contentId: contentId, entityType: "idea"}\' [hidden]=\'!canedit\'></edit-button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="banner" *ngIf="contentDetail?.ContentFeaturedImageFullURL">\n\n    <img [src]="contentDetail?.ContentFeaturedImageFullURL | secure | async">\n\n  </div>\n\n\n\n  <div class="article-content">\n\n    <div class="article-title-detail" text-center>\n\n      <img class="profile-img" [class.hasCover]="!!contentDetail?.ContentFeaturedImageFullURL" *ngIf="contentDetail?.AuthorAvatarImageUrl"\n\n        [src]="contentDetail?.AuthorAvatarImageUrl">\n\n      <ion-row>\n\n        <ion-col col-4>\n\n          <div rating>\n\n            <button [ngClass]="{\'vote-green\': voteStatus == 1}" ion-button icon-only color="light" (click)="voteUp()">\n\n              <ion-icon name="ios-arrow-up"></ion-icon>\n\n            </button>\n\n            <span>{{ contentDetail?.VoteCount }}</span>\n\n            <button [ngClass]="{\'vote-red\': voteStatus == -1}" ion-button icon-only color="light" (click)="voteDown()">\n\n              <ion-icon name="ios-arrow-down"></ion-icon>\n\n            </button>\n\n          </div>\n\n        </ion-col>\n\n        <ion-col col-7 text-left centered-flex>\n\n          <h3>\n\n            {{contentDetail?.ContentTitle}}\n\n          </h3>\n\n          <div>\n\n            <p>\n\n              <span>{{contentDetail?.DateCreatedString}}</span>\n\n              <span>{{"ARTICLE.BY" | translate}}</span>&nbsp;\n\n              <span [innerHtml]="contentDetail?.AuthorDisplayName"></span>\n\n            </p>\n\n            <p>\n\n              {{"ARTICLE.POSTEDIN" | translate}}\n\n              <span *ngIf="contentDetail?.SpaceID > 0">{{ contentDetail?.SpaceName }}</span>\n\n              <span *ngIf="contentDetail?.SpaceID === 0">Top Level Community</span>\n\n            </p>\n\n          </div>\n\n\n\n          <p>\n\n            <span>{{contentDetail?.ViewCount}} {{"ARTICLE.VIEWS" | translate}}</span>\n\n            &nbsp;\n\n            <span *ngIf="contentDetail?.CommentCount == 1">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENT" | translate}}</span>\n\n            <span *ngIf="contentDetail?.CommentCount > 1 || contentDetail?.CommentCount == 0">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENTS" | translate}}</span>\n\n          </p>\n\n        </ion-col>\n\n      </ion-row>\n\n      <div class="article-desc" text-left style=\'margin-bottom: 20px;\'>\n\n        <span [innerHtml]="contentDetail?.ContentBody"></span>\n\n      </div>\n\n      <show-attachments [entity]="{id: contentId, type: 44}"></show-attachments>\n\n    </div>\n\n\n\n    <ion-list no-lines no-margin class="article-tags" padding-horizontal *ngIf="contentDetail?.TagsCSV" no-lines>\n\n      <ion-item>\n\n        <h6>{{"ARTICLE.TAGS" | translate}}</h6>\n\n        <h6>{{contentDetail?.TagsCSV}}</h6>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <ion-row class="article-likes-comments" padding-horizontal>\n\n      <ion-col no-padding>\n\n        <content-like [likesCount]="likesCount"></content-like>\n\n      </ion-col>\n\n      <ion-col no-padding>\n\n        <p text-right *ngIf="contentDetail?.CommentCount == 1">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENT" | translate}}</p>\n\n        <p text-right *ngIf="contentDetail?.CommentCount > 1 || contentDetail?.CommentCount == 0">{{ contentDetail?.CommentCount }} {{"MYACCOUNTCARD.CARDCONTENT.COMMENTS" | translate}}</p>\n\n      </ion-col>\n\n    </ion-row>\n\n    <div class="article-response like-button-section" padding-horizontal>\n\n      <single-content-like (getCount)="setCount($event)" [contentID]="contentDetail?.ContentID" [entityType]="44"></single-content-like>\n\n    </div>\n\n    <div class="article-response write-comment-section" padding-horizontal>\n\n      <write-comment (click)="openModal()"></write-comment>\n\n    </div>\n\n\n\n\n\n  </div>\n\n  <div class="article-comments">\n\n    <comment [comments]="comments" (sendParent)="openModal($event)" [step]="0"></comment>\n\n    <ion-infinite-scroll (ionInfinite)="getComments($event)" threshold="1000px">\n\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/ideas/idea-detail/idea-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
            __WEBPACK_IMPORTED_MODULE_13__angular_platform_browser__["c" /* DomSanitizer */]])
    ], IdeaDetailPage);
    return IdeaDetailPage;
}());

//# sourceMappingURL=idea-detail.js.map

/***/ })

});
//# sourceMappingURL=46.js.map