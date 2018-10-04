webpackJsonp([28],{

/***/ 707:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpaceDetailsPageModule", function() { return SpaceDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__space_details__ = __webpack_require__(780);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_people__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_spaces__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_modules__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_center_analytics__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var SpaceDetailsPageModule = /** @class */ (function () {
    function SpaceDetailsPageModule() {
    }
    SpaceDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__space_details__["a" /* SpaceDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__space_details__["a" /* SpaceDetailsPage */]),
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_7__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__providers_people__["a" /* PeopleProvider */],
                __WEBPACK_IMPORTED_MODULE_6__providers_spaces__["a" /* SpacesProvider */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]
            ]
        })
    ], SpaceDetailsPageModule);
    return SpaceDetailsPageModule;
}());

//# sourceMappingURL=space-details.module.js.map

/***/ }),

/***/ 780:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpaceDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_spaces__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_center_analytics__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SpaceDetailsPage = /** @class */ (function () {
    function SpaceDetailsPage(viewCtrl, navParams, spacesProvider, navCtrl, appCenterAnalytics, translate) {
        var _this = this;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.spacesProvider = spacesProvider;
        this.navCtrl = navCtrl;
        this.appCenterAnalytics = appCenterAnalytics;
        this.translate = translate;
        this.page = 0;
        this.spaceId = this.navParams.get('id');
        this.spaceView = 0;
        this.spaceActivities = [];
        this.spaceUsers = [];
        this.searchtext = '';
        this.communityUrl = localStorage.getItem('community_url');
        this.isLoading = false;
        this.isLoadingActivity = false;
        this.isLoadingUsers = false;
        this.peoplePage = 0;
        this.buttons = [
            // {
            //   icon: 'ios-home',
            //   text: 'Home'
            // },
            {
                icon: 'ios-list',
                text: 'PROFILE.BUTTONGROUP.ACTIVITY'
            }, {
                icon: 'ios-people',
                text: 'PEOPLE.HEADING'
            }, {
                icon: 'ios-cog',
                text: 'PROFILE.BUTTONGROUP.MORE'
            }
        ];
        this.list = [
            {
                id: 3,
                icon: "file",
                title: "Articles",
                name: "article-list",
                meta: "Article"
            },
            {
                id: 4,
                icon: "files-o",
                title: "Blogs",
                name: "blog-list",
                meta: "Blog"
            },
            {
                id: 19,
                icon: "briefcase",
                title: "Cases",
                name: "case-list",
                meta: "Issue"
            },
            {
                id: 1,
                icon: "comments",
                title: "Discussions",
                name: "discussion-list",
                meta: "Forum"
            },
            {
                id: 14,
                icon: "folder-open",
                title: "Files",
                name: "file-list",
                meta: "File"
            },
            {
                id: 44,
                icon: "lightbulb-o",
                title: "Ideas",
                name: "idea-list",
                meta: "Idea"
            },
            {
                id: 18,
                icon: "picture-o",
                title: "Photos",
                name: "photo-list",
                meta: "Photo"
            },
            {
                id: 7,
                icon: "video-camera",
                title: "Videos",
                name: "video-list",
                meta: "Video"
            },
            {
                id: 9,
                icon: "book",
                title: "Wiki",
                name: "wiki-list",
                meta: "Wiki"
            },
            {
                id: 64,
                icon: "bell",
                title: "Announcement",
                name: "page-space-announcement",
                meta: "Announcement"
            }
        ];
        this.entitiesAccess = {
            Article: false,
            Blog: false,
            Issue: false,
            Forum: false,
            File: false,
            Idea: false,
            Video: false,
            Photo: false,
            Wiki: false,
            Announcement: false
        };
        this.isOneEnabled = true;
        var string = "";
        for (var i = 0; i < this.list.length; ++i) {
            if (this.list[i].id == 18) {
                string += 6 + ",";
            }
            else {
                string += this.list[i].id + ",";
            }
        }
        localStorage.setItem('SpaceID', this.spaceId);
        this.spacesProvider.checkEntities(this.spaceId, string).subscribe(function (res) {
            _this.entitiesAccess = res.ResponseData;
            console.log(_this.entitiesAccess);
            _this.entitiesAccess['Announcement'] = true;
            _this.checkAccess();
        });
        this.translate.get(["TITLES.ARTICLES", "TITLES.BLOGS", "TITLES.CASES", "TITLES.DISCUSSIONS", "TITLES.FILES", "TITLES.IDEAS",
            "TITLES.PHOTOS", "TITLES.VIDEOS", "TITLES.WIKIS", "ANNOUNCEMENT.ANNOUNCEMENTS"
        ]).subscribe(function (res) {
            _this.list = [
                {
                    id: 3,
                    icon: "file",
                    title: res["TITLES.ARTICLES"],
                    name: "article-list",
                    meta: "Article"
                },
                {
                    id: 4,
                    icon: "files-o",
                    title: res["TITLES.BLOGS"],
                    name: "blog-list",
                    meta: "Blog"
                },
                {
                    id: 19,
                    icon: "briefcase",
                    title: res["TITLES.CASES"],
                    name: "case-list",
                    meta: "Issue"
                },
                {
                    id: 1,
                    icon: "comments",
                    title: res["TITLES.DISCUSSIONS"],
                    name: "discussion-list",
                    meta: "Forum"
                },
                {
                    id: 14,
                    icon: "folder-open",
                    title: res["TITLES.FILES"],
                    name: "file-list",
                    meta: "File"
                },
                {
                    id: 44,
                    icon: "lightbulb-o",
                    title: res["TITLES.IDEAS"],
                    name: "idea-list",
                    meta: "Idea"
                },
                {
                    id: 18,
                    icon: "picture-o",
                    title: res["TITLES.PHOTOS"],
                    name: "photo-list",
                    meta: "Photo"
                },
                {
                    id: 7,
                    icon: "video-camera",
                    title: res["TITLES.VIDEOS"],
                    name: "video-list",
                    meta: "Video"
                },
                {
                    id: 9,
                    icon: "book",
                    title: res["TITLES.WIKIS"],
                    name: "wiki-list",
                    meta: "Wiki"
                },
                {
                    id: 64,
                    icon: "bell",
                    title: res["ANNOUNCEMENT.ANNOUNCEMENTS"],
                    name: "page-space-announcement",
                    meta: "Announcement"
                },
            ];
        });
    }
    SpaceDetailsPage.prototype.checkAccess = function () {
        var keyArray = ["Article", "Blog", "Issue", "Forum", "File", "Idea", "Photo", "Video", "Wiki", 'Announcement'];
        var flag = false;
        for (var i = 0; i < keyArray.length; ++i) {
            if (this.entitiesAccess[keyArray[i]] === true) {
                flag = true;
            }
        }
        this.isOneEnabled = flag;
    };
    SpaceDetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        console.log(this.spaceId);
        this.spacesProvider
            .getSpace(this.spaceId)
            .finally(function () { return _this.isLoading = false; })
            .subscribe(function (space) {
            _this.space = space;
            if (_this.spaceId == 0) {
                _this.space.SpaceVisibility = 4;
            }
            _this.appCenterAnalytics.isEnabled().then(function (b) {
                if (b) {
                    _this.appCenterAnalytics.trackEvent('Space Detail Load.', { id: _this.spaceId, userid: localStorage.getItem('UserID') }).then(function () {
                        console.log('Space Detail Load Event tracked');
                    });
                }
            });
        });
        if (this.spaceId == 0) {
            this.spaceView = 2;
        }
        // this.getSpaceActivities();
        console.log(this.list);
    };
    SpaceDetailsPage.prototype.doRefresh = function (refresh) {
        var _this = this;
        this.page = 1;
        this.spaceActivity()
            .finally(function () {
            refresh.complete();
        })
            .subscribe(function (res) {
            _this.spaceActivities = [];
            _this.handleSpace(res);
        });
    };
    SpaceDetailsPage.prototype.goToEntity = function (item) {
        this.navCtrl.push(item.name, {
            id: item.id,
            title: this.space.SpaceName,
            subTitle: item.title,
            SpaceID: this.space.SpaceID
        });
    };
    SpaceDetailsPage.prototype.refreshPage = function ($event) {
        console.log($event);
        this.spaceActivities.unshift($event);
        this.spaceActivities.pop();
    };
    SpaceDetailsPage.prototype.ionViewDidLoad = function () {
        this.viewCtrl.setBackButtonText(null);
        this.getSpaceActivities();
    };
    SpaceDetailsPage.prototype.switchSpaceView = function (view) {
        this.spaceView = view.index;
        if (this.spaceView === 0 && !this.spaceActivities.length) {
            this.getSpaceActivities();
        }
        else if (this.spaceView === 1 && !this.spaceUsers.length) {
            this.getSpaceUsers();
        }
    };
    SpaceDetailsPage.prototype.spaceActivity = function () {
        // Fetch Space Activity
        return this.spacesProvider.getSpaceActivity(this.spaceId, this.page);
    };
    SpaceDetailsPage.prototype.getSpaceUsers = function (infiniteScroll) {
        var _this = this;
        if (!infiniteScroll) {
            this.isLoadingUsers = true;
        }
        if (this.spaceUsers.length > 0 && this.spaceUsers.length < 15) {
            infiniteScroll.enable(false);
            return;
        }
        ++this.peoplePage;
        // Fetch Space user by Id
        this.spacesProvider.getSpaceUsers(this.spaceId, this.peoplePage, 15)
            .finally(function () {
            if (!infiniteScroll) {
                _this.isLoadingUsers = false;
            }
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
        })
            .do(function (response) {
            if (infiniteScroll && !response.ResponseData.length) {
                infiniteScroll.enable(false);
            }
        })
            .subscribe(function (res) {
            _this.spaceUsers = _this.spaceUsers.concat(res.ResponseData);
            if (res.ResponseData.length < 15 && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    SpaceDetailsPage.prototype.getSpaceActivities = function (infiniteScroll) {
        var _this = this;
        if (this.spaceActivities.length > 0 && this.spaceActivities.length < 10) {
            infiniteScroll.enable(false);
        }
        if (!infiniteScroll) {
            this.isLoadingActivity = true;
        }
        this.page++;
        this.spaceActivity()
            .finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            else {
                _this.isLoadingActivity = false;
            }
        })
            .do(function (response) {
            console.log(response);
            if (!response.ResponseData.length && infiniteScroll || response.ResponseData.length && response.ResponseData.length == 0 && infiniteScroll) {
                infiniteScroll.enable(false);
                _this.page--; // Restore page back to the last correct page
            }
        })
            .subscribe(function (res) {
            _this.handleSpace(res);
            if (infiniteScroll && res.ResponseData.length < 10) {
                infiniteScroll.enable(false);
            }
        });
    };
    SpaceDetailsPage.prototype.handleSpace = function (response) {
        this.spaceActivities = this.spaceActivities.concat(response.ResponseData);
    };
    SpaceDetailsPage.prototype.managePeople = function () {
        this.navCtrl.push('manage-user', {
            id: this.spaceId
        });
    };
    SpaceDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-space-details',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/spaces/space-details/space-details.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{ "TITLES.Space" | translate}}</ion-title>\n\n    <ion-buttons right>\n\n      <button ion-button icon-only (click)="managePeople()" *ngIf="spaceView === 1">\n\n        {{ "EXTRA.MANAGE" | translate }}\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>  \n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)" *ngIf="spaceView === 0">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <ion-card class="space-details-card">\n\n    <img *ngIf="space?.SpaceIconFileName" class="img-cover" [src]="space?.SpaceImageURL">\n\n    <img *ngIf="!space?.SpaceIconFileName" class="img-cover" [src]="space?.SpaceImageURL">\n\n    <ion-item class="space-details-card-content" [style.background]="\'rgba(0,0,0,.6)\'" [style.bottom]="0" [style.left]="0" [style.top]="0">\n\n      <ion-thumbnail item-start>\n\n        <ng-container *ngIf="space?.SpaceIconFileName || space?.SpaceID == 0">\n\n          <img class="space-details-card-thumbnail" *ngIf="space?.SpaceImageURL" [src]="space?.SpaceImageURL">\n\n        </ng-container>\n\n\n\n        <ng-container *ngIf="!space?.SpaceIconFileName && space?.SpaceID != 0">\n\n          <img class="space-details-card-thumbnail" *ngIf="space?.SpaceImageURL" [src]="space?.SpaceImageURL">\n\n        </ng-container>\n\n      </ion-thumbnail>\n\n      <h2 class="space-details-card-title">{{ space?.SpaceName }}</h2>\n\n      <div class="space-details-card-subtitle">\n\n        <span *ngIf="space?.SpaceVisibility === 0">{{ \'SPACEVISIBILITY.PRIVATE\' | translate }}</span>\n\n        <span *ngIf="space?.SpaceVisibility === 1">{{ \'SPACEVISIBILITY.PUBLIC\' | translate }}</span>\n\n        <span *ngIf="space?.SpaceVisibility === 3">{{ \'SPACEVISIBILITY.ISOLATED\' | translate }}</span>\n\n      </div>\n\n    </ion-item>\n\n  </ion-card>\n\n\n\n  <button-group *ngIf=\'spaceId != 0\' [buttons]="buttons" (changed)="switchSpaceView($event)"></button-group>\n\n\n\n  <ng-container [ngSwitch]="spaceView">\n\n    <!-- <div class="space-home" *ngSwitchCase="0" padding>\n\n      <loader *ngIf="isLoading"></loader>\n\n    </div> -->\n\n\n\n    <div class="space-activity" *ngSwitchCase="0">\n\n      <status-modal [spaceId]=\'spaceId\' (modalClose)="refreshPage($event)"></status-modal>\n\n      <!-- <loader *ngIf="isLoadingActivity"></loader> -->\n\n\n\n      <div *ngIf="isLoadingActivity">\n\n        <empty-card *ngFor="let item of [1, 2, 3]"></empty-card>\n\n      </div>\n\n\n\n      <content-card-list [activities]="spaceActivities"></content-card-list>\n\n      <ion-infinite-scroll *ngIf="!isLoadingActivity" (ionInfinite)="getSpaceActivities($event)">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n\n\n    <div class="space-people" *ngSwitchCase="1">\n\n      <people-list [isLoading]="isLoadingUsers" [peoples]="spaceUsers | search: searchtext:\'UserInfoDisplayName\' " (doSearch)="searchtext = $event"></people-list>\n\n      <ion-infinite-scroll *ngIf="!isLoadingUsers" (ionInfinite)="getSpaceUsers($event)">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n\n\n    <div class="space-more" *ngSwitchCase="2">\n\n      <ion-list no-lines>\n\n        <div *ngFor="let item of list">\n\n          <list-button (click)="goToEntity(item)" *ngIf="entitiesAccess[item.meta]" [icon]="item.icon" [title]="item.title"></list-button>\n\n        </div>\n\n        <div class="all-disabled" *ngIf="!isOneEnabled">\n\n          {{ "COMMONS.ALL_ENTITIES_DISABLED" | translate }}\n\n        </div>\n\n      </ion-list>\n\n    </div>\n\n  </ng-container>\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/spaces/space-details/space-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_spaces__["a" /* SpacesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */]])
    ], SpaceDetailsPage);
    return SpaceDetailsPage;
}());

//# sourceMappingURL=space-details.js.map

/***/ })

});
//# sourceMappingURL=28.js.map