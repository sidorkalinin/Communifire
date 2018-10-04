webpackJsonp([51],{

/***/ 701:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDetailPageModule", function() { return EventDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_detail__ = __webpack_require__(774);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_moment__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_modules__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var EventDetailPageModule = /** @class */ (function () {
    function EventDetailPageModule() {
    }
    EventDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_detail__["a" /* EventDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_detail__["a" /* EventDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
            ]
        })
    ], EventDetailPageModule);
    return EventDetailPageModule;
}());

//# sourceMappingURL=event-detail.module.js.map

/***/ }),

/***/ 774:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_invite_people_modal_invite_people_modal__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_comment_modal_comment_modal__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_authentication__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_single_content_like_single_content_like__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_device__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_app_center_analytics__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var EventDetailPage = /** @class */ (function () {
    function EventDetailPage(navCtrl, navParams, modalCtrl, contentProvider, loadingCtrl, authentificationProvider, taptic, vibration, platform, translate, device, appCenterAnalytics) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.contentProvider = contentProvider;
        this.loadingCtrl = loadingCtrl;
        this.authentificationProvider = authentificationProvider;
        this.taptic = taptic;
        this.vibration = vibration;
        this.platform = platform;
        this.translate = translate;
        this.device = device;
        this.appCenterAnalytics = appCenterAnalytics;
        this.contentId = this.navParams.get('id');
        this.going = 0;
        this.userId = null;
        this.confirmation = null;
        this.noComments = false;
        this.invited = 0;
        this.canedit = false;
        this.bRSVPChange = false;
        this.isIphoneX = false;
        this.page = 0;
        this.comments = [];
        this.authentificationProvider.user$.filter(function (user) { return user !== null; }).subscribe(function (user) {
            _this.userId = user.UserID;
        });
        if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
            this.isIphoneX = true;
        }
    }
    EventDetailPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    EventDetailPage.prototype.getEventStatus = function (eventId) {
        var _this = this;
        this.contentProvider.getEventStatus(eventId).subscribe(function (res) {
            console.log(res);
            _this.confirmation = res;
        });
    };
    EventDetailPage.prototype.setCount = function ($event) {
        this.likesCount = $event;
    };
    EventDetailPage.prototype.openModal = function ($event) {
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
    EventDetailPage.prototype.adduser = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__modals_invite_people_modal_invite_people_modal__["a" /* InvitePeopleModalComponent */], {
            eventId: this.contentDetail.EventID,
            spaceId: this.contentDetail.SpaceID
        });
        modal.present();
        modal.onDidDismiss(function (res) {
            _this.invited += (res.count ? res.count : 0);
        });
    };
    EventDetailPage.prototype.getUserByContentId = function () {
        var _this = this;
        this.translate.get("COMMONS.LOADING_EVENT").subscribe(function (res) {
            var loading = _this.loadingCtrl.create({
                content: res
            });
            loading.present();
            _this.contentProvider.getEventByID(_this.contentId)
                .finally(function () { return loading.dismiss(); })
                .subscribe(function (res) {
                _this.contentDetail = res.ResponseData;
                console.log(_this.contentDetail);
                _this.checkPermission();
                _this.getEventStatus(_this.contentDetail.EventID);
                _this.going = _this.contentDetail.Users.filter(function (user) { return user.AttendanceType === 1; }).reduce(function (acc, user) { return ++acc; }, 0);
                _this.appCenterAnalytics.isEnabled().then(function (b) {
                    if (b) {
                        _this.appCenterAnalytics.trackEvent('Event Detail Load.', { id: _this.contentDetail.EventID, userid: localStorage.getItem('UserID') }).then(function () {
                            console.log('Event Detail Load Event tracked');
                        });
                    }
                });
            });
        });
    };
    EventDetailPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        if (this.infiniteScroll) {
            this.infiniteScroll.enable(true);
        }
        this.taptic.impact({ style: 'light' });
        this.vibrate();
        this.contentProvider.getEventByID(this.contentId)
            .finally(function () { return refresher.complete(); })
            .subscribe(function (res) {
            _this.contentDetail = res.ResponseData;
            _this.getEventStatus(_this.contentDetail.EventID);
            _this.going = _this.contentDetail.Users.filter(function (user) { return user.AttendanceType === 1; }).reduce(function (acc, user) { return ++acc; }, 0);
        });
        this.page = 1;
        this.comments = [];
        this.contentProvider.getContentComments(this.contentId, this.page)
            .subscribe(function (res) {
            _this.handleComments(res);
        });
    };
    EventDetailPage.prototype.getComments = function (infiniteScroll) {
        var _this = this;
        if (infiniteScroll) {
            this.infiniteScroll = infiniteScroll;
        }
        if (this.comments.length == 0 && infiniteScroll) {
            infiniteScroll.enable(false);
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
    EventDetailPage.prototype.handleComments = function (response) {
        if (response.ResponseData) {
            this.comments = this.comments.concat(response.ResponseData);
            this.comments = this.contentProvider.getNestedChildren(this.comments, 0);
        }
    };
    EventDetailPage.prototype.onChangeModel = function ($event) {
        this.bRSVPChange = true;
        console.log(this.confirmation);
        if (this.confirmation !== null) {
            this.contentProvider.setEventStatus(this.contentDetail.EventID, this.userId, $event).subscribe(function (res) {
            });
        }
    };
    EventDetailPage.prototype.ngOnInit = function () {
        this.getUserByContentId();
        this.getComments();
    };
    EventDetailPage.prototype.navToList = function () {
        // let active = this.navCtrl.getActive();
        // let parent = this.navCtrl.getPrevious();
        if (this.contentDetail.SpaceID === 0) {
            this.navCtrl.setRoot("event-list", {
                title: this.contentDetail.ReportedByUserName,
                UserID: this.contentDetail.UserID
            }, {
                direction: "back"
            });
        }
        else {
            this.navCtrl.setRoot("event-list", {
                title: this.contentDetail.SpaceName,
                SpaceID: this.contentDetail.SpaceID
            }, {
                direction: "back"
            });
        }
        // this.navCtrl.removeView(active);
        // this.navCtrl.removeView(parent);
    };
    EventDetailPage.prototype.cancel = function () {
        if (this.bRSVPChange) {
            this.navToList();
        }
        else {
            this.navCtrl.pop();
        }
    };
    EventDetailPage.prototype.checkPermission = function () {
        var _this = this;
        if (this.contentDetail.AuthorID == localStorage.getItem('UserID')) {
            this.contentProvider.checkPermission({
                entitytype: 5,
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
                entitytype: 5,
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_8__components_single_content_like_single_content_like__["a" /* SingleContentLikeComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8__components_single_content_like_single_content_like__["a" /* SingleContentLikeComponent */])
    ], EventDetailPage.prototype, "singleComponentLikeComponent", void 0);
    EventDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-detail',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/events/event-detail/event-detail.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <ion-title (click)="navToList()">Event</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="adduser()">\n\n        <ion-icon name="ios-person-add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-header>\n\n  <ion-toolbar>\n\n    <ion-buttons left>\n\n      <button ion-button icon-only (click)="cancel()">\n\n        <ion-icon name="ios-arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>Event</ion-title>\n\n    <ion-buttons right>\n\n      <edit-button [entity]=\'{contentId: contentId, entityType: "event"}\' [hidden]=\'!canedit\'></edit-button>\n\n      <button ion-button icon-only (click)="adduser()">\n\n        <ion-icon name="ios-person-add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content no-margin>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="banner" *ngIf="contentDetail?.ImageURL">\n\n    <img [src]="contentDetail?.ImageURL | secure | async">\n\n  </div>\n\n\n\n  <div class="article-content" padding>\n\n    <div class="article-title-detail" text-center>\n\n      <div class="event-date date-avatar" [class.hasCover]="!!contentDetail?.ImageURL">\n\n        <h4>{{ contentDetail?.StartDateWithRespectToUser | amDateFormat:\'MMM\'}}</h4>\n\n        <h2>{{ contentDetail?.StartDateWithRespectToUser | amDateFormat:\'DD\'}}</h2>\n\n      </div>\n\n      <span>\n\n        <h3>\n\n          {{contentDetail?.Title}}\n\n        </h3>\n\n      </span>\n\n      <p>\n\n        <span>{{"ARTICLE.BY" | translate}}</span>\n\n        <span [innerHtml]="contentDetail?.UserDisplayName"></span> {{"ARTICLE.ON" | translate}}\n\n        <span>{{contentDetail?.CreatedOnDate | amDateFormat:\'MMM Do, YYYY\'}}</span>\n\n      </p>\n\n\n\n\n\n      <p>\n\n        {{"ARTICLE.POSTEDIN" | translate}}\n\n        <span *ngIf="contentDetail?.SpaceID > 0" [innerHtml]="contentDetail?.SpaceName"></span>\n\n        <span *ngIf="contentDetail?.SpaceID === 0">Top Level Community</span>\n\n      </p>\n\n\n\n    </div>\n\n\n\n    <div class="event-details">\n\n      <div class="primary-details" text-center>\n\n        <p>{{contentDetail?.StartDateWithRespectToUser | amDateFormat:\'dddd, MMMM Do, YYYY\'}}</p>\n\n        <p *ngIf="!contentDetail?.IsAllDay">{{ contentDetail?.StartDateWithRespectToUser | amDateFormat:\'HH:mm A\'}} to {{ contentDetail?.EndDateWithRespectToUser\n\n          | amDateFormat:\'HH:mm A\'}}</p>\n\n        <p *ngIf="contentDetail?.IsAllDay">{{ "EVENT.ALL_DAY" | translate }}</p>\n\n\n\n        <p *ngIf="contentDetail?.VenueName">{{ contentDetail?.VenueName }}</p>\n\n        <p *ngIf="contentDetail?.IsRepeat" [style.fontSize]="\'14px\'" [style.color]="\'#9a9a9a\'">{{ "COMMONS.REPEATS" | translate }} {{contentDetail?.RepeatSummary}}</p>\n\n\n\n\n\n        <h6>Will you be attending?</h6>\n\n        <ion-segment [(ngModel)]="confirmation" (ngModelChange)="onChangeModel($event)" color="secondary">\n\n          <ion-segment-button [value]="1">Going</ion-segment-button>\n\n          <ion-segment-button [value]="2">Maybe</ion-segment-button>\n\n          <ion-segment-button [value]="3">No</ion-segment-button>\n\n        </ion-segment>\n\n\n\n        <p>{{ contentDetail?.Users?.length + invited }} Invited - {{ going }} Going</p>\n\n      </div>\n\n      <ion-list no-margin no-lines class="info-list">\n\n        <ion-item *ngIf="contentDetail?.Description && contentDetail?.Description !== \' \'" no-padding>\n\n          <h6>More Info:</h6>\n\n          <p [style.whiteSpace]="\'normal\'" [innerHTML]="contentDetail?.Description"></p>\n\n        </ion-item>\n\n\n\n        <ion-item *ngIf="contentDetail?.WhoShouldAttend" no-padding>\n\n          <h6>Who should attend:</h6>\n\n          <p [style.whiteSpace]="\'normal\'" [innerHTML]="contentDetail?.WhoShouldAttend"></p>\n\n        </ion-item>\n\n\n\n        <ion-item *ngIf="contentDetail?.Website" no-padding>\n\n          <h6>Website:</h6>\n\n          <p [style.whiteSpace]="\'normal\'" [innerHTML]="contentDetail?.Website"></p>\n\n        </ion-item>\n\n\n\n        <ion-item *ngIf="contentDetail?.Telephone" no-padding>\n\n          <h6>Phone:</h6>\n\n          <p [style.whiteSpace]="\'normal\'" [innerHTML]="contentDetail?.Telephone"></p>\n\n        </ion-item>\n\n\n\n        <ion-item *ngIf="contentDetail?.Organization" no-padding>\n\n          <h6>Organizations:</h6>\n\n          <p [style.whiteSpace]="\'normal\'" [innerHTML]="contentDetail?.Organization"></p>\n\n        </ion-item>\n\n      </ion-list>\n\n    </div>\n\n\n\n    <div class="article-desc">\n\n      <p [innerHTML]="contentDetail?.ContentSummary"></p>\n\n    </div>\n\n\n\n    <show-attachments [entity]="{id: contentId, type: 5}"></show-attachments>\n\n  </div>\n\n\n\n  <ion-list no-margin class="article-tags" padding-horizontal *ngIf="contentDetail?.Keywords" no-lines>\n\n    <ion-item>\n\n      <h6>{{"ARTICLE.TAGS" | translate}}</h6>\n\n      <h6>{{contentDetail?.Keywords}}</h6>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <ion-row class="article-likes-comments" padding-horizontal>\n\n    <ion-col no-padding>\n\n      <content-like [likesCount]="likesCount"></content-like>\n\n    </ion-col>\n\n    <ion-col no-padding>\n\n      <p [style.textAlign]="\'end\'" *ngIf="contentDetail?.CommentCount == 1" class="comment-color">{{contentDetail?.CommentCount}} {{"MYACCOUNTCARD.CARDCONTENT.COMMENT" | translate}}</p>\n\n      <p [style.textAlign]="\'end\'" *ngIf="contentDetail?.CommentCount > 1" class="comment-color">{{contentDetail?.CommentCount}} {{"MYACCOUNTCARD.CARDCONTENT.COMMENTS" | translate}}</p>\n\n    </ion-col>\n\n  </ion-row>\n\n\n\n  <div class="article-response like-button-section" padding-horizontal>\n\n    <single-content-like (getCount)="setCount($event)" [contentID]="contentDetail?.EventID" [entityType]="5"></single-content-like>\n\n  </div>\n\n\n\n  <div class="article-response write-comment-section" padding-horizontal>\n\n    <write-comment (click)="openModal()"></write-comment>\n\n  </div>\n\n  <div class="article-comments">\n\n    <comment [comments]="comments" (sendParent)="openModal($event)" [step]="0"></comment>\n\n    <ion-infinite-scroll (ionInfinite)="getComments($event)" threshold="1000px" threshold="1000px">\n\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n  </div>\n\n\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/events/event-detail/event-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_authentication__["a" /* AuthenticationProvider */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_11__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]])
    ], EventDetailPage);
    return EventDetailPage;
}());

//# sourceMappingURL=event-detail.js.map

/***/ })

});
//# sourceMappingURL=51.js.map