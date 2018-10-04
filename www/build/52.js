webpackJsonp([52],{

/***/ 662:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscussionListPageModule", function() { return DiscussionListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__discussion_list__ = __webpack_require__(735);
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







var DiscussionListPageModule = /** @class */ (function () {
    function DiscussionListPageModule() {
    }
    DiscussionListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__discussion_list__["a" /* DiscussionListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__discussion_list__["a" /* DiscussionListPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
            ]
        })
    ], DiscussionListPageModule);
    return DiscussionListPageModule;
}());

//# sourceMappingURL=discussion-list.module.js.map

/***/ }),

/***/ 735:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscussionListPage; });
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









var DiscussionListPage = /** @class */ (function () {
    function DiscussionListPage(navCtrl, navParams, content, taptic, vibration, platform, appCenterAnalytics) {
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
        this.spaceId = this.navParams.get('SpaceID');
        this.userId = this.navParams.get('UserID');
        this.profile = this.navParams.get('profile');
        this.entityType = 55;
        this.searchfilter = "";
        this.bsearchbar = false;
        this.topics = [];
        this.isLoading = false;
        this.cases = [];
        this.page = 0;
        this.categories = [];
        this.isLoadingSearch = false;
        this.appCenterAnalytics.isEnabled().then(function (b) {
            if (b) {
                _this.appCenterAnalytics.trackEvent('Discussion Category List Load Event.', { spaceId: _this.spaceId.toString(), userid: localStorage.getItem('UserID') }).then(function () {
                    console.log('Discussion Category List Load Event tracked');
                });
            }
        });
    }
    DiscussionListPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    DiscussionListPage.prototype.ngOnInit = function () {
    };
    DiscussionListPage.prototype.ionViewDidLoad = function () {
        this.doInfinite();
    };
    DiscussionListPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.searchfilter = "";
        if (this.infinteScroll) {
            this.infinteScroll.enable(true);
        }
        this.taptic.impact({ style: 'light' });
        this.vibrate();
        this.page = 1;
        var options = {
            EntityType: 1,
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
            _this.categories = response.ResponseData;
        }, function (err) {
            if (refresher) {
                refresher.complete();
            }
        });
    };
    DiscussionListPage.prototype.doInfinite = function (infiniteScroll) {
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
        if (this.categories.length > 0 && this.categories.length < 10 && infiniteScroll) {
            infiniteScroll.enable(false);
            return 0;
        }
        ++this.page;
        if (!infiniteScroll) {
            this.isLoading = true;
        }
        var options = {
            EntityType: 1,
            page: this.page,
        };
        if (this.userId) {
            options['UserID'] = this.userId;
        }
        if (this.spaceId) {
            options['SpaceID'] = this.spaceId;
        }
        if (this.spaceId == 0) {
            options['SpaceID'] = 0;
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
            _this.categories = _this.categories.concat(response.ResponseData);
            if (infiniteScroll && response.ResponseData.length < 10) {
                infiniteScroll.enable(false);
            }
        }, function (err) {
            if (infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    DiscussionListPage.prototype.createDiscussion = function () {
        this.navCtrl.push('discussion-create', {
            spaceId: this.spaceId,
            title: this.title,
            subTitle: this.subTitle
        });
    };
    DiscussionListPage.prototype.search = function (infiniteScroll) {
        var _this = this;
        if (this.searchfilter.length === 0) {
            this.topics = [];
            this.doInfinite();
            return 0;
        }
        if (infiniteScroll) {
            this.infinteScroll = infiniteScroll;
        }
        else {
            this.page = 0;
            this.topics = [];
        }
        if (this.topics.length != 0 && this.topics.length < 10) {
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
            console.log('----------');
            console.log(response);
            _this.topics = _this.topics.concat(response.ResponseData);
            if (infiniteScroll && response.ResponseData.length < 10) {
                infiniteScroll.enable(false);
            }
        }, function (err) {
            if (infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    DiscussionListPage.prototype.showSearchBar = function () {
        this.bsearchbar = true;
    };
    DiscussionListPage.prototype.onCancel = function () {
        this.bsearchbar = false;
        this.searchfilter = "";
        this.categories = [];
        this.doInfinite();
    };
    DiscussionListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-discussion-list',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/disscusions/discussion-list/discussion-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{ title | translate}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <ion-card card-title>\n\n    <ion-card-content>\n\n      {{ "TITLES.DISCUSSIONS" | translate }}\n\n      <ion-buttons>\n\n        <button end add-button ion-button clear (click)="createDiscussion()" *ngIf=\'profile == undefined\'>\n\n          <ion-icon name="add"></ion-icon>\n\n        </button>\n\n        <button end ion-button clear (click)=\'showSearchBar()\'> \n\n          <ion-icon name="search"></ion-icon>\n\n        </button>        \n\n      </ion-buttons>      \n\n    </ion-card-content>\n\n  </ion-card>\n\n  <ion-searchbar [(ngModel)]="searchfilter" (keydown)="isLoadingSearch = true; categories = []" (ionInput)="search()" (ionCancel)="onCancel($event)" showCancelButton="true" *ngIf="bsearchbar" [animated]="false" placeholder="{{\'MODAL.SEARCH...\'|translate}}" cancelButtonText="{{\'TOAST.CANCEL\'|translate}}"></ion-searchbar>\n\n  <ion-row>\n\n    <ion-item no-lines *ngIf="bsearchbar == false">\n\n      {{ "COMMONS.CATEGORIES" | translate }}\n\n    </ion-item>\n\n  </ion-row>\n\n\n\n  <!-- <loader *ngIf="isLoading"></loader> -->\n\n\n\n  <no-results-found *ngIf="topics.length == 0 && !isLoading && !isLoadingSearch &&  bsearchbar && searchfilter.length > 0"></no-results-found>\n\n  <searching-for *ngIf="isLoadingSearch && searchfilter.length != 0" [text]="searchfilter"></searching-for>\n\n  <div *ngIf="isLoading">\n\n    <empty-discussion-card *ngFor="let item of [1,2,3,4,5]"></empty-discussion-card>\n\n  </div>\n\n  \n\n  <ng-container *ngIf="bsearchbar == false || searchfilter.length == 0">\n\n    <discussion-category-item [discussion]="category" *ngFor="let category of categories"></discussion-category-item>\n\n  </ng-container>\n\n  <ng-container *ngIf="bsearchbar == true">\n\n    <bug-item *ngFor="let item of topics" [item]="item"></bug-item>\n\n  </ng-container>\n\n\n\n  <ion-infinite-scroll *ngIf="!isLoading" (ionInfinite)="doInfinite($event)" threshold="1000px">\n\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/disscusions/discussion-list/discussion-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]])
    ], DiscussionListPage);
    return DiscussionListPage;
}());

//# sourceMappingURL=discussion-list.js.map

/***/ })

});
//# sourceMappingURL=52.js.map