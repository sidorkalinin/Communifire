webpackJsonp([58],{

/***/ 658:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CaseDetailPageModule", function() { return CaseDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__case_detail__ = __webpack_require__(731);
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








var CaseDetailPageModule = /** @class */ (function () {
    function CaseDetailPageModule() {
    }
    CaseDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__case_detail__["a" /* CaseDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__case_detail__["a" /* CaseDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
            ]
        })
    ], CaseDetailPageModule);
    return CaseDetailPageModule;
}());

//# sourceMappingURL=case-detail.module.js.map

/***/ }),

/***/ 731:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CaseDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_case_comment_modal_case_comment_modal__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_center_analytics__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__util_constants__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var CaseDetailPage = /** @class */ (function () {
    function CaseDetailPage(navCtrl, navParams, contentProvider, modalCtrl, taptic, vibration, platform, translate, loadingCtrl, device, appCenterAnalytics, sanitizer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contentProvider = contentProvider;
        this.modalCtrl = modalCtrl;
        this.taptic = taptic;
        this.vibration = vibration;
        this.platform = platform;
        this.translate = translate;
        this.loadingCtrl = loadingCtrl;
        this.device = device;
        this.appCenterAnalytics = appCenterAnalytics;
        this.sanitizer = sanitizer;
        this.case = {};
        this.id = this.navParams.get('id');
        this.isLoading = true;
        this.isLoadingComments = true;
        this.isRefreshing = false;
        this.comments = [];
        this.page = 0;
        this.canedit = false;
        this.hasCreateCommentPermission = false;
        this.hasCaseCommentPermChecked = false;
        this.isIphoneX = false;
        this.modal = null;
        if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
            this.isIphoneX = true;
        }
    }
    CaseDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this.avatarImageURL = __WEBPACK_IMPORTED_MODULE_10__util_constants__["a" /* COMMON_URLS */].AVATAR_DEFAULT_IMAGE;
        this.translate.get("COMMONS.LOADING_CASE").subscribe(function (res) {
            _this.loader = _this.loadingCtrl.create({
                content: res,
            });
            _this.loader.present().then(function () {
                _this.getCase();
                _this.getComments();
            });
        });
    };
    CaseDetailPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    CaseDetailPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.taptic.impact({ style: 'light' });
        this.isRefreshing = true;
        this.vibrate();
        this.contentProvider.getCase(this.id).finally(function () {
            refresher.complete();
        }).subscribe(function (res) {
            _this.case = res.ResponseData;
            if (_this.case.SpaceID == 0) {
                _this.case.SpaceName = "Top Level Community";
            }
            console.log(_this.case);
            _this.isRefreshing = false;
        });
        this.isLoadingComments = true;
        this.getComments();
    };
    CaseDetailPage.prototype.getCase = function () {
        var _this = this;
        this.contentProvider.getCase(this.id).finally(function () {
            _this.isLoading = false;
            if (_this.loader) {
                _this.loader.dismiss();
            }
        }).subscribe(function (res) {
            _this.case = res.ResponseData;
            _this.case.IssueDescription = _this.sanitizer.bypassSecurityTrustHtml(_this.case.IssueDescription);
            _this.checkPermission();
            if (_this.platform.is('cordova')) {
                _this.appCenterAnalytics.isEnabled().then(function (b) {
                    if (b) {
                        _this.appCenterAnalytics.trackEvent('Case Detail Load.', { id: _this.case, userid: localStorage.getItem('UserID') }).then(function () {
                            console.log('Case Detail Load Event tracked');
                        });
                    }
                });
            }
        });
    };
    CaseDetailPage.prototype.openModal = function () {
        var _this = this;
        this.modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__components_case_comment_modal_case_comment_modal__["a" /* CaseCommentModalComponent */], {
            id: this.case.IssueID,
            case: this.case
        });
        this.modal.onDidDismiss(function (data) {
            if (data.update) {
                _this.getCase();
            }
            _this.getComments();
        });
        this.modal.present();
    };
    CaseDetailPage.prototype.ionViewWillLeave = function () {
        if (this.modal) {
            this.modal.dismiss();
        }
    };
    CaseDetailPage.prototype.getComments = function () {
        var _this = this;
        this.page++;
        this.contentProvider.getCaseComments(this.id)
            .finally(function () {
            _this.isLoadingComments = false;
        })
            .subscribe(this.handleComments.bind(this));
    };
    CaseDetailPage.prototype.handleComments = function (response) {
        if (response.ResponseData) {
            this.comments = response.ResponseData;
        }
    };
    CaseDetailPage.prototype.setCount = function ($event) {
        this.likes = $event;
    };
    CaseDetailPage.prototype.ionViewDidLoad = function () {
    };
    CaseDetailPage.prototype.goToProfile = function () {
        this.navCtrl.push("profile", {
            id: this.case.ReportedByUserID
        });
    };
    CaseDetailPage.prototype.navToList = function () {
        var active = this.navCtrl.getActive();
        var parent = this.navCtrl.getPrevious();
        if (this.case.SpaceID === 0) {
            this.navCtrl.push("case-list", {
                title: this.case.ReportedByUserName,
                UserID: this.case.UserID
            }, {
                direction: "back"
            });
        }
        else {
            this.navCtrl.push("case-list", {
                title: this.case.SpaceName,
                SpaceID: this.case.SpaceID
            }, {
                direction: "back"
            });
        }
        this.navCtrl.removeView(active);
        console.log(this.navCtrl.length());
        if (this.navCtrl.length() > 2) {
            this.navCtrl.removeView(parent);
        }
    };
    CaseDetailPage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    CaseDetailPage.prototype.checkPermission = function () {
        var _this = this;
        console.log("Going to check permissions");
        // Check EDIT permission
        this.contentProvider.checkPermission({
            entitytype: 19,
            spaceid: this.case.SpaceID
        }, "AdminEntityUpdate,Update")
            .subscribe(function (res) {
            if (_this.case.UserID == localStorage.getItem('UserID')) {
                _this.canedit = res.ResponseData.Update;
            }
            else {
                _this.canedit = res.ResponseData.AdminEntityUpdate;
            }
        });
        // Check CREATE COMMENT permission
        this.contentProvider.checkPermission({
            entitytype: 20,
            spaceid: this.case.SpaceID
        }, "Create")
            .subscribe(function (res) {
            _this.hasCreateCommentPermission = res.ResponseData.Create;
            _this.hasCaseCommentPermChecked = true;
            console.log("hasCaseCommentPermChecked: " + _this.hasCaseCommentPermChecked);
        });
    };
    CaseDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-case-detail',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/cases/case-detail/case-detail.html"*/'<!-- <ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{ case?.SpaceName }}</ion-title>\n\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-header>\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button ion-button icon-only (click)="cancel()">\n\n        <ion-icon name="ios-arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>{{ case?.SpaceName }}</ion-title>\n\n    <ion-buttons right>\n\n      <edit-button [entity]=\'{contentId: id, entityType: "case"}\' [hidden]=\'!canedit\'></edit-button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <ion-card card-title>\n\n    <ion-card-content>\n\n      <div (click)="navToList()">{{ "TITLES.CASES" | translate }}</div>\n\n      <!-- <span class="edit">Edit</span> -->\n\n    </ion-card-content>\n\n  </ion-card>\n\n  <ion-row>\n\n    <ion-item no-lines no-wrap>\n\n      <h3>\n\n        {{case?.IssueTitle}}\n\n      </h3>\n\n    </ion-item>\n\n  </ion-row>\n\n  <ion-row border-top>\n\n    <ion-item no-lines>\n\n      <div class="line">\n\n        <div class="status">\n\n          <ion-badge [ngClass]="case?.StatusColorCssClass">{{ case?.IssueStatusName }}</ion-badge>\n\n        </div>\n\n        <div class="comments">\n\n          {{ comments?.length }}\n\n          <ion-icon name="ios-text"></ion-icon>\n\n        </div>\n\n      </div>\n\n    </ion-item>\n\n  </ion-row>\n\n  <ion-row>\n\n    <ion-item no-lines no-wrap>\n\n      <div class="line">\n\n        <div class="column">\n\n          <span>{{ "COMMONS.CREATED" | translate }}</span>\n\n          <span>{{ case?.DateCreatedWithRespectToUser | date:"d/M/yy" }}</span>\n\n        </div>\n\n        <div class="column">\n\n          <span>{{ "COMMONS.ASSIGNED" | translate }}</span>\n\n          <span [style.fontStyle]="\'italic\'" *ngIf="case.AssignedToUserID == 0">{{ "COMMONS.NOT_ASSIGNED" | translate }}</span>\n\n          <span [innerHtml]="case?.AssignedToUserDisplayName"></span>\n\n        </div>\n\n        <div class="column">\n\n          <span>{{ "COMMONS.PRIORITY" | translate }}</span>\n\n          <span>{{ case?.IssuePriorityName }}</span>\n\n        </div>\n\n      </div>\n\n    </ion-item>\n\n  </ion-row>\n\n  <ion-row border-bottom>\n\n    <ion-item no-lines no-wrap>\n\n      <div class="line">\n\n        <div class="column">\n\n          <span>{{ "COMMONS.PROJECT" | translate }}</span>\n\n          <span>{{ case?.ProjectTitle }}</span>\n\n        </div>\n\n        <div class="column">\n\n          <span>{{ "TITLES.Milestone" | translate }}</span>\n\n          <span [style.fontStyle]="\'italic\'" *ngIf="case.MilestoneID == 0">{{ "COMMONS.NOT_SET" | translate }}</span>\n\n          <span>{{ case?.MilestoneTitle }}</span>\n\n        </div>\n\n        <div class="column">\n\n          <span>{{ "COMMONS.CATEGORY" | translate }}</span>\n\n          <span [style.fontStyle]="\'italic\'" *ngIf="case.ProjectSectionID == 0">{{ "COMMONS.NOT_SET" | translate }}</span>\n\n          <span>{{ case?.ProjectSectionName }}</span>\n\n        </div>\n\n      </div>\n\n    </ion-item>\n\n  </ion-row>\n\n\n\n  <ion-card no-margin case-description>\n\n    <ion-item>\n\n      <ion-avatar item-start>\n\n        <img *ngIf="!isImgLoaded" [src]="avatarImageURL">\n\n        <img [hidden]="!isImgLoaded" (load)="isImgLoaded = true" [src]="case?.ReportedByUserAvatarImageUrl | secure | async">\n\n      </ion-avatar>\n\n      <h2 (click)="goToProfile()" [innerHtml]="case?.ReportedByUserDisplayName" class="username-display"></h2>\n\n      <p class="date-display">{{ case?.DateCreatedWithRespectToUser | amTimeAgo }}</p>\n\n    </ion-item>\n\n    <ion-card-content>\n\n      <span class="case-text" [innerHtml]="case?.IssueDescription"></span>\n\n    </ion-card-content>\n\n    <show-attachments [entity]="{id: id, type: 19}"></show-attachments>\n\n    <!-- <ion-scroll scrollX="true" style="width:100vw; height:140px" *ngIf="case.Attachments">\n\n      <ion-row nowrap>\n\n        <div *ngFor="let item of case?.Attachments" class="attachment-item" [ngClass]="{ \'isImage\': item.IsImage}" >\n\n          <img [src]="item.MediaServerRootURL + \'/\' + item.FileName" *ngIf="item.IsImage">\n\n          <p *ngIf="!item.IsImage" [innerHtml]="item?.Caption"></p>\n\n          <div class="size" *ngIf="!item.IsImage">\n\n            <ion-icon name="document"></ion-icon>\n\n            <span>{{ item.FileSizeText }}</span>\n\n          </div>\n\n        </div>\n\n      </ion-row>\n\n    </ion-scroll> -->\n\n    <ion-list padding-horizontal no-lines *ngIf="case.Tagname">\n\n      <ion-item no-padding>\n\n        <ion-row>\n\n          <ion-col no-padding tags no-lines>\n\n            {{"ARTICLE.TAGS" | translate}}\n\n            <div [innerHtml]="case?.Tagname"></div>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-item>\n\n    </ion-list>\n\n    <div class="likes-count">\n\n      <content-like [likesCount]="likes"></content-like>\n\n    </div>\n\n    <div class="case-detail-like">\n\n      <single-content-like *ngIf="!isRefreshing" left (getCount)="setCount($event)" [contentID]="case?.IssueID" [entityType]="19"></single-content-like>\n\n    </div>\n\n  </ion-card>\n\n\n\n  <case-comment [comment]="comment" *ngFor="let comment of comments"></case-comment>\n\n</ion-content>\n\n\n\n<ion-footer (click)="openModal()" *ngIf="hasCaseCommentPermChecked">\n\n  <ion-toolbar add-comment>\n\n    <ion-buttons class="comment-icon" left>\n\n      <ion-icon *ngIf="hasCreateCommentPermission" name="text"></ion-icon>\n\n      <ion-icon *ngIf="!hasCreateCommentPermission" name="md-settings"></ion-icon>\n\n    </ion-buttons>\n\n    <span *ngIf="hasCreateCommentPermission">{{ \'COMMONS.ADD_COMMENT\' | translate }} ...</span>\n\n    <span *ngIf="!hasCreateCommentPermission">{{ \'COMMONS.UPDATE_CASE\' | translate }} ...</span>\n\n  </ion-toolbar>\n\n</ion-footer>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/cases/case-detail/case-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
            __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["c" /* DomSanitizer */]])
    ], CaseDetailPage);
    return CaseDetailPage;
}());

//# sourceMappingURL=case-detail.js.map

/***/ })

});
//# sourceMappingURL=58.js.map