webpackJsonp([39],{

/***/ 671:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_people__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_modules__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_authentication__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
                __WEBPACK_IMPORTED_MODULE_5__providers_people__["a" /* PeopleProvider */],
                __WEBPACK_IMPORTED_MODULE_8__providers_authentication__["a" /* AuthenticationProvider */]
            ]
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_people__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_device__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_authentication__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ProfilePage = /** @class */ (function () {
    function ProfilePage(navParams, peopleProvider, device, navCtrl, appCenterAnalytics, translate, authenticationProvider) {
        var _this = this;
        this.navParams = navParams;
        this.peopleProvider = peopleProvider;
        this.device = device;
        this.navCtrl = navCtrl;
        this.appCenterAnalytics = appCenterAnalytics;
        this.translate = translate;
        this.authenticationProvider = authenticationProvider;
        this.page = 0;
        this.userId = this.navParams.get('id');
        this.profileView = 0;
        this.activities = [];
        this.isLoading = false;
        this.isme = false;
        this.buttons = [{
                icon: 'ios-contact',
                text: 'PROFILE.BUTTONGROUP.PROFILE'
            },
            {
                icon: 'ios-list',
                text: 'PROFILE.BUTTONGROUP.ACTIVITY'
            },
            // {
            //   icon: 'ios-chatbubbles',
            //   text: 'PROFILE.BUTTONGROUP.MESSAGE'
            // },
            {
                icon: 'ios-cog',
                text: 'PROFILE.BUTTONGROUP.MORE'
            }];
        this.list = [
            {
                id: 3,
                icon: "file",
                title: "Articles",
                name: "article-list"
            },
            {
                id: 4,
                icon: "files-o",
                title: "Blogs",
                name: "blog-list"
            },
            {
                id: 111,
                icon: "briefcase",
                title: "Cases",
                name: "case-list"
            },
            {
                id: 1,
                icon: "comments",
                title: "Discussions",
                name: "discussion-list"
            },
            {
                id: 14,
                icon: "folder-open",
                title: "Files",
                name: "file-list"
            },
            {
                id: 44,
                icon: "lightbulb-o",
                title: "Ideas",
                name: "idea-list"
            },
            {
                id: 18,
                icon: "picture-o",
                title: "Photos",
                name: "photo-list"
            },
            {
                id: 7,
                icon: "video-camera",
                title: "Videos",
                name: "video-list"
            },
            {
                id: 9,
                icon: "book",
                title: "Wiki",
                name: "wiki-list"
            },
        ];
        this.isIphoneX = false;
        if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
            this.isIphoneX = true;
        }
        this.appCenterAnalytics.isEnabled().then(function (b) {
            if (b) {
                _this.appCenterAnalytics.trackEvent('Profile Page Load Event.', { profile: _this.userId, userid: localStorage.getItem('UserID') }).then(function () {
                    console.log('Profile Page Load Event tracked');
                });
            }
        });
    }
    ProfilePage.prototype.ngOnInit = function () {
        var _this = this;
        this.authenticationProvider.getMyDetails().subscribe(function (user) {
            _this.isme = (_this.userId == user.UserID);
        });
        this.getUser();
    };
    ProfilePage.prototype.goToEntity = function (item) {
        this.navCtrl.push(item.name, {
            id: item.id,
            title: this.profile['First name'] + " " + this.profile['Last name'],
            subTitle: item.title,
            UserID: this.userId,
            profile: true
        });
    };
    ProfilePage.prototype.doRefresh = function (refresh) {
        var _this = this;
        this.page = 1;
        this.getUserActivity()
            .finally(function () {
            refresh.complete();
        })
            .subscribe(function (res) {
            _this.activities = [];
            _this.handleActivity(res);
        });
    };
    ProfilePage.prototype.refreshPage = function ($event) {
        if ($event.result) {
            if (this.activities.length >= 10) {
                this.activities.pop();
            }
            this.activities.unshift($event);
        }
    };
    ProfilePage.prototype.switchProfileView = function (view) {
        this.profileView = view.index;
        if (view.index == 1 && this.activities.length == 0) {
            this.doInfinite();
        }
    };
    ProfilePage.prototype.getUser = function () {
        var _this = this;
        this.isLoading = true;
        this.peopleProvider.getUser(this.userId)
            .finally(function () { return _this.isLoading = false; })
            .subscribe(function (res) {
            console.log(res);
            _this.profile = res.ResponseData;
        });
    };
    ProfilePage.prototype.getUserActivity = function () {
        return this.peopleProvider.getUserActivity(this.userId, this.page);
    };
    ProfilePage.prototype.handleActivity = function (response) {
        this.activities = this.activities.concat(response.ResponseData);
    };
    ProfilePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.activities.length > 0 && this.activities.length < 10) {
            infiniteScroll.enable(false);
        }
        this.page++;
        this.getUserActivity()
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
                _this.page--; // Restore page back to the last correct page
            }
        })
            .subscribe(function (res) {
            _this.handleActivity(res);
            if (infiniteScroll && res.ResponseData.length < 10) {
                infiniteScroll.enable(false);
            }
        });
    };
    ProfilePage.prototype.manageFriends = function () {
        this.navCtrl.push('manage-friend');
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-profile',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/people/profile/profile.html"*/'<ion-header [ngClass]="{\'is-iphone-x\': isIphoneX}">\n\n  <ion-navbar>\n\n    <ion-title>{{ \'PROFILE.HEADING\' | translate}}</ion-title>\n\n    <ion-buttons right>\n\n      <button ion-button icon-only (click)="manageFriends()" *ngIf="isme">\n\n        {{ "EXTRA.CONNECTIONS" | translate }}\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>  \n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)" *ngIf="profileView === 1">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <div class="communifire-card" *ngIf="profile">\n\n    <div *ngIf="profile[\'Cover photo\']" class="avatar-box" [style.backgroundImage]="\'url(\' + profile[\'Cover photo\'] + \')\'" [style.backgroundSize]="\'cover\'">\n\n      <img *ngIf="profile[\'Profile photo\']" [src]="profile[\'Profile photo\'][1] | secure | async" alt="images">\n\n      <img *ngIf="profile[\'Profile Photo\']" [src]="profile[\'Profile Photo\'][1] | secure | async" alt="images">\n\n      <img *ngIf="profile.ProfilePhoto" [src]="profile.ProfilePhoto[1] | secure | async" alt="images">\n\n    </div>\n\n    <div *ngIf="profile.CoverPhoto" class="avatar-box" [style.backgroundImage]="\'url(\' + profile.CoverPhoto + \')\'" [style.backgroundSize]="\'cover\'">\n\n      <img *ngIf="profile[\'Profile photo\']" [src]="profile[\'Profile photo\'][1] | secure | async" alt="images">\n\n      <img *ngIf="profile[\'Profile Photo\']" [src]="profile[\'Profile Photo\'][1] | secure | async" alt="images">\n\n    </div>\n\n    <div class="avatar-content" padding text-center>\n\n      <h3>\n\n        <span *ngIf="profile[\'First name\']">{{ profile[\'First name\'] }}</span>\n\n        <span *ngIf="profile.FirstName">{{ profile.FirstName }}</span>\n\n        <span *ngIf="profile[\'Last name\']">{{ profile[\'Last name\'] }}</span>\n\n        <span *ngIf="profile.LastName">{{ profile.LastName }}</span>\n\n      </h3>\n\n      <p *ngIf="profile[\'About me\']" [innerHtml]="profile[\'About me\']"></p>\n\n      <p>{{ profile.Department }}</p>\n\n    </div>\n\n  </div>\n\n  <button-group [buttons]="buttons" (changed)="switchProfileView($event)"></button-group>\n\n\n\n  <ng-container [ngSwitch]="profileView">\n\n    <loader *ngIf="isLoading"></loader>\n\n    <div class="communifire-profile" *ngSwitchCase="0" padding>\n\n      <ng-container *ngIf="profile">\n\n        <h5 margin-top>{{"PROFILELABELS.TITLE" | translate}}</h5>\n\n        <p>{{profile?.Email}}</p>\n\n\n\n        <h6 *ngIf="profile?.Phone">{{"PROFILELABELS.PHONE" | translate}}</h6>\n\n        <p>{{profile?.Phone}}</p>\n\n\n\n        <h6 *ngIf="profile?.CompanyName">{{"PROFILELABELS.COMPANY" | translate}}</h6>\n\n        <p *ngIf="profile.Company">{{profile?.Company}}</p>\n\n        <p *ngIf="profile.CompanyName">{{profile?.CompanyName}}</p>\n\n\n\n        <h6 *ngIf="profile.City || profile.State">{{"PROFILELABELS.LOCATION" | translate}}</h6>\n\n        <p>\n\n          {{ profile.City }}\n\n          <span *ngIf="profile.City && profile.State">, </span>\n\n          {{ profile.State }}\n\n        </p>\n\n\n\n        <h6 *ngIf="profile[\'About me\']">{{"PROFILELABELS.BIO" | translate}}</h6>\n\n        <p [innerHtml]="profile[\'About me\']"></p>\n\n\n\n        <h6 *ngIf="profile.Interests">{{"PROFILELABELS.INTERESTS" | translate}}</h6>\n\n        <p [innerHtml]="profile.Interests"></p>\n\n      </ng-container>\n\n    </div>\n\n\n\n    <div *ngSwitchCase="1">\n\n      <status-modal [toUser]="userId" (modalClose)="refreshPage($event)"></status-modal>\n\n      <div *ngIf="activities.length === 0">\n\n        <empty-card *ngFor="let item of [1, 2, 3]"></empty-card>\n\n      </div>\n\n      <content-card-list [activities]="activities"></content-card-list>\n\n      <ion-infinite-scroll (ionInfinite)="doInfinite($event)" threshold="1000px">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n\n\n    <div class="space-more" *ngSwitchCase="2">\n\n      <ion-list no-lines>\n\n        <list-button (click)="goToEntity(item)" *ngFor="let item of list" [icon]="item.icon" [title]="item.title"></list-button>\n\n      </ion-list>\n\n    </div>\n\n  </ng-container>\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/people/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_people__["a" /* PeopleProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
            __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_8__providers_authentication__["a" /* AuthenticationProvider */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ })

});
//# sourceMappingURL=39.js.map