webpackJsonp([57],{

/***/ 659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CaseListPageModule", function() { return CaseListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__case_list__ = __webpack_require__(732);
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







var CaseListPageModule = /** @class */ (function () {
    function CaseListPageModule() {
    }
    CaseListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__case_list__["a" /* CaseListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__case_list__["a" /* CaseListPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
            ]
        })
    ], CaseListPageModule);
    return CaseListPageModule;
}());

//# sourceMappingURL=case-list.module.js.map

/***/ }),

/***/ 732:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CaseListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_center_analytics__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var CaseListPage = /** @class */ (function () {
    function CaseListPage(navCtrl, navParams, content, taptic, vibration, platform, modalCtrl, device, appCenterAnalytics) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.content = content;
        this.taptic = taptic;
        this.vibration = vibration;
        this.platform = platform;
        this.modalCtrl = modalCtrl;
        this.device = device;
        this.appCenterAnalytics = appCenterAnalytics;
        this.title = this.navParams.get('title');
        this.subTitle = this.navParams.get('subTitle');
        this.entityType = 19;
        this.userId = this.navParams.get('UserID');
        this.spaceId = this.navParams.get('SpaceID');
        this.profile = this.navParams.get('profile');
        this.searchfilter = "";
        this.isLoading = false;
        this.cases = [];
        this.page = 0;
        this.isLoadingSearch = false;
        /**
         * Case filter
         */
        this.projectId = null;
        this.categoryId = null;
        this.milestoneId = null;
        this.statusId = null;
        this.priorityId = null;
        this.assignedToId = null;
        this.createdById = null;
        this.isIphoneX = false;
        if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
            this.isIphoneX = true;
        }
        this.appCenterAnalytics.isEnabled().then(function (b) {
            if (b) {
                _this.appCenterAnalytics.trackEvent('Case List Load Event.', { spaceId: _this.spaceId.toString(), userid: localStorage.getItem('UserID') }).then(function () {
                    console.log('Case List Load Event tracked');
                });
            }
        });
    }
    CaseListPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    CaseListPage.prototype.ionViewDidLoad = function () {
        this.doInfinite();
    };
    CaseListPage.prototype.doRefresh = function (refresher) {
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
        if (this.spaceId == 0) {
            options['SpaceID'] = 0;
        }
        this.content.getCases(options, this.page, 10)
            .finally(function () {
            if (refresher) {
                refresher.complete();
            }
            else {
                _this.isLoading = false;
            }
        })
            .subscribe(function (response) {
            _this.cases = response.ResponseData;
        }, function (err) {
            if (refresher) {
                refresher.complete();
            }
        });
    };
    CaseListPage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (infiniteScroll) {
            this.infinteScroll = infiniteScroll;
        }
        else {
            this.cases = [];
            this.page = 0;
        }
        if (this.cases.length != 0 && this.cases.length < 10) {
            infiniteScroll.enable(false);
            return 0;
        }
        ++this.page;
        if (!infiniteScroll && !this.isLoadingSearch) {
            this.isLoading = true;
        }
        var options = {
            EntityType: this.entityType,
            page: this.page,
            keyword: this.searchfilter
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
        if (this.projectId) {
            options['projectId'] = this.projectId;
        }
        if (this.categoryId) {
            options['categoryId'] = this.categoryId;
        }
        if (this.milestoneId) {
            options['milestoneId'] = this.milestoneId;
        }
        if (this.statusId) {
            options['statusId'] = this.statusId;
        }
        if (this.priorityId) {
            options['priorityId'] = this.priorityId;
        }
        if (this.assignedToId) {
            options['assignedToUserID'] = this.assignedToId;
        }
        if (this.createdById) {
            options['reportedByUserID'] = this.createdById;
        }
        this.content.getCases(options, this.page, 10)
            .finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            else {
                _this.isLoading = false;
                _this.isLoadingSearch = false;
            }
        })
            .do(function (response) {
            if (!response.ResponseData.length && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        })
            .subscribe(function (response) {
            _this.cases = _this.cases.concat(response.ResponseData);
            if (infiniteScroll && response.ResponseData.length < 10) {
                infiniteScroll.enable(false);
            }
            console.log(_this.cases);
        }, function (err) {
            if (infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    CaseListPage.prototype.createCase = function () {
        this.navCtrl.push('case-create', { spaceId: this.spaceId, title: this.title });
    };
    CaseListPage.prototype.openFilter = function () {
        var _this = this;
        var modal = this.modalCtrl.create('cases-filters', {
            spaceId: this.spaceId,
            projectId: this.projectId,
            categoryId: this.categoryId,
            milestoneId: this.milestoneId,
            statusId: this.statusId,
            priorityId: this.priorityId,
            assignedToId: this.assignedToId,
            createdById: this.createdById,
        }, {});
        modal.present();
        modal.onDidDismiss(function (data) {
            if (!data.isCanceled) {
                _this.spaceId = data.spaceId;
                _this.projectId = data.projectId;
                _this.categoryId = data.categoryId;
                _this.milestoneId = data.milestoneId;
                _this.statusId = data.statusId;
                _this.priorityId = data.priorityId;
                _this.assignedToId = data.assignedToId;
                _this.createdById = data.createdById;
                _this.doInfinite();
            }
        });
    };
    CaseListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-case-list',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/cases/case-list/case-list.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{ title }}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <ion-card card-title>\n\n    <ion-card-content no-padding>\n\n      <span>{{ "TITLES.CASES" | translate }}</span>\n\n      <ion-buttons>\n\n        <button end add-button ion-button clear (click)="createCase()" *ngIf=\'profile == undefined\'>\n\n          <ion-icon name="add"></ion-icon>\n\n        </button>\n\n        <button end ion-button clear (click)="openFilter()">\n\n          <ion-icon name="search"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n    </ion-card-content>\n\n  </ion-card>\n\n  <ion-searchbar [(ngModel)]="searchfilter" (keydown)="isLoadingSearch = true; cases = []" (ionInput)="doInfinite()" showCancelButton="true" placeholder="{{\'MODAL.SEARCH...\'|translate}}" cancelButtonText="{{\'TOAST.CANCEL\'|translate}}"></ion-searchbar>\n\n\n\n  <searching-for *ngIf="isLoadingSearch && searchfilter.length != 0" [text]="searchfilter"></searching-for>\n\n\n\n  <no-results-found *ngIf="cases.length == 0 && !isLoading && !isLoadingSearch"></no-results-found>\n\n\n\n  <div *ngIf="isLoading">\n\n    <empty-case-card *ngFor="let item of [1,2,3,4,5]"></empty-case-card>\n\n  </div>\n\n\n\n  <case-item [case]="case" *ngFor="let case of cases | search: searchfilter:\'IssueTitle\'"></case-item>\n\n\n\n  <ion-infinite-scroll *ngIf="!isLoading" (ionInfinite)="doInfinite($event)" threshold="1000px">\n\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/cases/case-list/case-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]])
    ], CaseListPage);
    return CaseListPage;
}());

//# sourceMappingURL=case-list.js.map

/***/ })

});
//# sourceMappingURL=57.js.map