webpackJsonp([53],{

/***/ 663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscussionItemPageModule", function() { return DiscussionItemPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__discussion_item__ = __webpack_require__(736);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var DiscussionItemPageModule = /** @class */ (function () {
    function DiscussionItemPageModule() {
    }
    DiscussionItemPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__discussion_item__["a" /* DiscussionItemPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__discussion_item__["a" /* DiscussionItemPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__["a" /* PipesModule */]
            ],
        })
    ], DiscussionItemPageModule);
    return DiscussionItemPageModule;
}());

//# sourceMappingURL=discussion-item.module.js.map

/***/ }),

/***/ 736:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscussionItemPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_spaces__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_forum_topic_comment_modal_forum_topic_comment_modal__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_device__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var DiscussionItemPage = /** @class */ (function () {
    function DiscussionItemPage(navCtrl, navParams, contentProvider, spacesProvider, modalCtrl, taptic, vibration, platform, translate, loadingCtrl, device, sanitizer) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contentProvider = contentProvider;
        this.spacesProvider = spacesProvider;
        this.modalCtrl = modalCtrl;
        this.taptic = taptic;
        this.vibration = vibration;
        this.platform = platform;
        this.translate = translate;
        this.loadingCtrl = loadingCtrl;
        this.device = device;
        this.sanitizer = sanitizer;
        this.id = this.navParams.get('id');
        this.sort = 0;
        this.content = [];
        this.comments = [];
        this.canedit = false;
        this.isIos = false;
        this.isIphoneX = false;
        this.translate.get("COMMONS.LOADING_DISCUSSION").subscribe(function (res) {
            _this.loader = _this.loadingCtrl.create({
                content: res,
            });
            _this.loader.present();
            _this.getContent();
        });
        if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
            this.isIphoneX = true;
        }
        if (this.platform.is("ios")) {
            this.isIos = true;
        }
    }
    DiscussionItemPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    DiscussionItemPage.prototype.getContent = function (refresher) {
        var _this = this;
        if (refresher) {
            this.taptic.impact({ style: 'light' });
            this.vibrate();
        }
        this.contentProvider.getContentByID(this.id).finally(function () {
            if (refresher) {
                refresher.complete();
            }
        }).subscribe(function (res) {
            _this.content = res.ResponseData;
            _this.content.ContentBody = _this.sanitizer.bypassSecurityTrustHtml(_this.content.ContentBody);
            console.log(_this.content);
            _this.checkPermission();
            if (_this.content.SpaceID == 0) {
                _this.getSpace(0);
            }
            _this.getCommentList();
        });
    };
    DiscussionItemPage.prototype.getCommentList = function () {
        var _this = this;
        var data = {
            EntityType: 54,
            SpaceID: this.content.SpaceID,
            ParentContentID: this.content.ContentID
        };
        this.contentProvider.getContentList(data).subscribe(function (res) {
            _this.comments = res.ResponseData;
            _this.comments.pop();
            _this.sortByDate();
            _this.loader.dismiss();
        });
    };
    DiscussionItemPage.prototype.getSpace = function (id) {
        var _this = this;
        this.spacesProvider.getSpace(id).subscribe(function (res) {
            _this.content["SpaceName"] = res.SpaceName;
        });
    };
    DiscussionItemPage.prototype.sortByDate = function () {
        this.comments.sort(function (a, b) {
            return new Date(a.DateCreated).getTime() - new Date(b.DateCreated).getTime();
        });
    };
    DiscussionItemPage.prototype.ionViewDidLoad = function () {
    };
    DiscussionItemPage.prototype.openModal = function () {
        var _this = this;
        if (this.content.LockedByUserID != 0)
            return;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__components_forum_topic_comment_modal_forum_topic_comment_modal__["a" /* ForumTopicCommentModalComponent */], {
            id: this.content.ContentID,
            forumTopic: this.content
        });
        modal.onDidDismiss(function (data) {
            _this.getCommentList();
        });
        modal.present();
    };
    DiscussionItemPage.prototype.setCount = function ($event) {
        this.likes = $event;
    };
    DiscussionItemPage.prototype.goToProfile = function () {
        this.navCtrl.push("profile", {
            id: this.content.AuthorID
        });
    };
    DiscussionItemPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    DiscussionItemPage.prototype.checkPermission = function () {
        var _this = this;
        if (this.content.AuthorID == localStorage.getItem('UserID')) {
            this.contentProvider.checkPermission({
                entitytype: 1,
                spaceid: this.content.SpaceID,
            })
                .finally(function () {
            })
                .subscribe(function (res) {
                _this.canedit = res.ResponseData.update;
            });
        }
        else {
            this.contentProvider.checkPermission({
                entitytype: 1,
                spaceid: this.content.SpaceID,
            })
                .finally(function () {
            })
                .subscribe(function (res) {
                _this.canedit = res.ResponseData.AdminEntityUpdate;
            });
        }
    };
    DiscussionItemPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-discussion-item',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/disscusions/discussion-item/discussion-item.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{ content?.SpaceName }}</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-header>\n\n  <ion-toolbar>\n\n    <ion-buttons left>\n\n      <button ion-button icon-only (click)="cancel()">\n\n        <ion-icon name="ios-arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title><span [innerHTML]="content?.SpaceName"></span></ion-title>\n\n    <ion-buttons right>\n\n      <edit-button [entity]=\'{contentId: id, entityType: "discussion"}\' [hidden]=\'!canedit\'></edit-button>\n\n    </ion-buttons>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content [ngClass]="{\'is-ios\': isIos}">\n\n  <!-- <loader *ngIf="isLoading"></loader> -->\n\n  <ion-refresher (ionRefresh)="getContent($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <ion-card card-title>\n\n    <ion-card-content>\n\n      {{ content?.ContentTitle }}\n\n      <span>{{ "ARTICLE.IN" | translate }}\n\n        <span [innerHtml]="content?.ParentContentTitle"></span>\n\n      </span>\n\n      <!-- <edit-button [entity]=\'{contentId: id, entityType: "discussion"}\'></edit-button> -->\n\n    </ion-card-content>\n\n  </ion-card>\n\n  <ion-card no-margin>\n\n    <ion-item>\n\n      <ion-avatar item-start>\n\n        <img [src]="content?.AuthorAvatarImageUrl | secure | async">\n\n      </ion-avatar>\n\n      <h2 (click)="goToProfile()" [innerHtml]="content?.AuthorDisplayName"></h2>\n\n      <p>{{ content?.DateCreatedString }}</p>\n\n    </ion-item>\n\n    <ion-card-content>\n\n      <span class="forum-content" [innerHtml]="content?.ContentBody"></span>\n\n      <show-attachments [entity]="{id: id, type: 55}"></show-attachments>\n\n    </ion-card-content>\n\n    <ion-list padding-horizontal *ngIf="content.TagsCSV">\n\n      <ion-item no-padding>\n\n        <ion-row>\n\n          <ion-col no-padding tags>\n\n            {{"ARTICLE.TAGS" | translate}}\n\n            <div>{{ content?.TagsCSV }}</div>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-item>\n\n    </ion-list>\n\n    <div class="likes-count">\n\n      <content-like [likesCount]="likes"></content-like>\n\n    </div>\n\n    <div class="forum-detail-like">\n\n      <single-content-like left (getCount)="setCount($event)" [contentID]="content?.ContentID" [entityType]="55"></single-content-like>\n\n    </div>\n\n  </ion-card>\n\n\n\n  <forum-topic-comment *ngFor="let comment of comments" [comment]="comment"></forum-topic-comment>\n\n\n\n</ion-content>\n\n\n\n<ion-footer (click)="openModal()" *ngIf="content.LockedByUserID == 0">\n\n  <ion-toolbar add-comment>\n\n    <ion-buttons left>\n\n      <ion-icon name="text"></ion-icon>\n\n    </ion-buttons>\n\n    <span>{{ \'COMMONS.ADD_COMMENT\' | translate }} ...</span>\n\n  </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/disscusions/discussion-item/discussion-item.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_spaces__["a" /* SpacesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["c" /* DomSanitizer */]])
    ], DiscussionItemPage);
    return DiscussionItemPage;
}());

//# sourceMappingURL=discussion-item.js.map

/***/ })

});
//# sourceMappingURL=53.js.map