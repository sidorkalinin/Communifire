webpackJsonp([45],{

/***/ 667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaListPageModule", function() { return IdeaListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__idea_list__ = __webpack_require__(740);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var IdeaListPageModule = /** @class */ (function () {
    function IdeaListPageModule() {
    }
    IdeaListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__idea_list__["a" /* IdeaListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__idea_list__["a" /* IdeaListPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]
            ]
        })
    ], IdeaListPageModule);
    return IdeaListPageModule;
}());

//# sourceMappingURL=idea-list.module.js.map

/***/ }),

/***/ 740:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IdeaListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_vibration__ = __webpack_require__(54);
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









var IdeaListPage = /** @class */ (function () {
    function IdeaListPage(navCtrl, navParams, content, taptic, vibration, platform, appCenterAnalytics) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.content = content;
        this.taptic = taptic;
        this.vibration = vibration;
        this.platform = platform;
        this.appCenterAnalytics = appCenterAnalytics;
        this.title = this.navParams.get('title');
        this.subTitle = this.navParams.get('subTitle');
        this.entityType = 44;
        this.userId = this.navParams.get('UserID');
        this.spaceId = this.navParams.get('SpaceID');
        this.profile = this.navParams.get('profile');
        this.searchfilter = "";
        this.page = 0;
        this.isLoading = false;
        this.ideas = [];
        this.isLoadingSearch = false;
        this.appCenterAnalytics.isEnabled().then(function (b) {
            if (b) {
                _this.appCenterAnalytics.trackEvent('Idea List Load Event.', { spaceId: _this.spaceId.toString(), userid: localStorage.getItem('UserID') }).then(function () {
                    console.log('Idea List Load Event tracked');
                });
            }
        });
    }
    IdeaListPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    IdeaListPage.prototype.ionViewDidLoad = function () {
        this.doInfinite();
    };
    IdeaListPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.searchfilter = "";
        if (this.infinteScroll) {
            this.infinteScroll.enable(true);
        }
        this.taptic.impact({ style: 'light' });
        this.vibrate();
        this.page = 1;
        var options = {
            EntityType: this.entityType,
            page: this.page,
        };
        this.isLoading = false;
        if (this.userId) {
            options['UserID'] = this.userId;
        }
        if (this.spaceId) {
            options['SpaceID'] = this.spaceId;
        }
        this.content.getContentByEntity(options)
            .finally(function () {
            if (refresher) {
                refresher.complete();
            }
            else {
                _this.isLoading = false;
            }
        })
            .subscribe(function (response) {
            _this.ideas = response.ResponseData;
        }, function (err) {
            if (refresher) {
                refresher.complete();
            }
        });
    };
    IdeaListPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.searchfilter.length > 0 && infiniteScroll) {
            this.search(infiniteScroll);
            return 0;
        }
        if (infiniteScroll) {
            this.infinteScroll = infiniteScroll;
        }
        else {
            this.page = 0;
        }
        if (this.ideas.length != 0 && this.ideas.length < 10) {
            infiniteScroll.enable(false);
            return 0;
        }
        ++this.page;
        if (!infiniteScroll) {
            this.isLoading = true;
        }
        var options = {
            EntityType: this.entityType,
            page: this.page,
        };
        if (this.userId) {
            options['UserID'] = this.userId;
        }
        if (this.spaceId) {
            options['SpaceID'] = this.spaceId;
        }
        this.content.getContentByEntity(options)
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
            }
        })
            .subscribe(function (response) {
            _this.ideas = _this.ideas.concat(response.ResponseData);
            if (infiniteScroll && response.ResponseData.length < 10) {
                infiniteScroll.enable(false);
            }
        }, function (err) {
            if (infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    IdeaListPage.prototype.search = function (infiniteScroll) {
        var _this = this;
        if (this.searchfilter.length === 0) {
            this.ideas = [];
            this.doInfinite();
            return 0;
        }
        if (infiniteScroll) {
            this.infinteScroll = infiniteScroll;
        }
        else {
            this.page = 0;
            this.ideas = [];
        }
        if (this.ideas.length != 0 && this.ideas.length < 10) {
            infiniteScroll.enable(false);
            return 0;
        }
        ++this.page;
        if (!infiniteScroll) {
            this.isLoadingSearch = true;
        }
        var options = {
            EntityType: this.entityType,
            page: this.page,
        };
        if (this.userId) {
            options['UserID'] = this.userId;
        }
        if (this.spaceId) {
            options['SpaceID'] = this.spaceId;
        }
        this.content.search(this.searchfilter, this.entityType, this.page, this.spaceId, this.userId)
            .finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            else {
                _this.isLoadingSearch = false;
            }
        })
            .do(function (response) {
            if (!response.ResponseData.length && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        })
            .subscribe(function (response) {
            _this.ideas = _this.ideas.concat(response.ResponseData);
            if (infiniteScroll && response.ResponseData.length < 10) {
                infiniteScroll.enable(false);
            }
        }, function (err) {
            if (infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    IdeaListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-idea-list',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/ideas/idea-list/idea-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{ title | translate}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher *ngIf="!isLoading" (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <ion-card card-title>\n\n    <ion-card-content>\n\n      <span>\n\n        {{ "TITLES.IDEAS" | translate }}\n\n      </span>\n\n      <add-button [entity]="{name: \'Idea\', spaceId: spaceId, userId: userId, title: title}" *ngIf=\'profile == undefined\'></add-button>\n\n    </ion-card-content>\n\n  </ion-card>\n\n  <ion-searchbar [(ngModel)]="searchfilter" (keydown)="isLoadingSearch = true; ideas = []" (ionInput)="search()" showCancelButton="true" placeholder="{{\'MODAL.SEARCH...\'|translate}}" cancelButtonText="{{\'TOAST.CANCEL\'|translate}}"></ion-searchbar>\n\n\n\n  <searching-for *ngIf="isLoadingSearch && searchfilter.length != 0" [text]="searchfilter"></searching-for>\n\n\n\n  <div *ngIf="isLoading">\n\n    <empty-card *ngFor="let item of [1, 2, 3]"></empty-card>\n\n  </div>\n\n\n\n  <no-results-found *ngIf="ideas.length == 0 && !isLoading && !isLoadingSearch"></no-results-found>\n\n  <home-activity-card [activity]="activity" *ngFor="let activity of ideas"></home-activity-card>\n\n\n\n  <ion-infinite-scroll *ngIf="!isLoading" (ionInfinite)="doInfinite($event)" threshold="1000px">\n\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/ideas/idea-list/idea-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]])
    ], IdeaListPage);
    return IdeaListPage;
}());

//# sourceMappingURL=idea-list.js.map

/***/ })

});
//# sourceMappingURL=45.js.map