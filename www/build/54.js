webpackJsonp([54],{

/***/ 700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscussionCategoryPageModule", function() { return DiscussionCategoryPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__discussion_category__ = __webpack_require__(773);
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







var DiscussionCategoryPageModule = /** @class */ (function () {
    function DiscussionCategoryPageModule() {
    }
    DiscussionCategoryPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__discussion_category__["a" /* DiscussionCategoryPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__discussion_category__["a" /* DiscussionCategoryPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
            ]
        })
    ], DiscussionCategoryPageModule);
    return DiscussionCategoryPageModule;
}());

//# sourceMappingURL=discussion-category.module.js.map

/***/ }),

/***/ 773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscussionCategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_taptic_engine__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_vibration__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_finally__);
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









var DiscussionCategoryPage = /** @class */ (function () {
    function DiscussionCategoryPage(navCtrl, navParams, contentProvider, taptic, vibration, platform, appCenterAnalytics) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contentProvider = contentProvider;
        this.taptic = taptic;
        this.vibration = vibration;
        this.platform = platform;
        this.appCenterAnalytics = appCenterAnalytics;
        this.id = this.navParams.get('id');
        this.title = this.navParams.get('title');
        this.subTitle = this.navParams.get('subTitle');
        this.spaceId = parseInt(localStorage.getItem('SpaceID'));
        this.sort = 0;
        this.page = 0;
        this.isLoading = false;
        this.items = [];
        this.searchfilter = "";
        this.filterModel = "COMMONS.LATEST";
        this.filterItems = [
            {
                value: 0,
                name: "COMMONS.LATEST"
            },
            // {
            //   value: 1,
            //   name: "COMMONS.TRENDING"
            // },
            {
                value: 2,
                name: "COMMONS.ANSWERED"
            },
            {
                value: 3,
                name: "COMMONS.UNANSWERED"
            }
        ];
        this.getContent();
        this.appCenterAnalytics.isEnabled().then(function (b) {
            if (b) {
                _this.appCenterAnalytics.trackEvent('Discussion List Load Event.', { parentId: _this.id.toString(), userid: localStorage.getItem('UserID') }).then(function () {
                    console.log('Discussion List Load Event tracked');
                });
            }
        });
    }
    DiscussionCategoryPage.prototype.ngOnInit = function () {
        console.log('-------------');
    };
    DiscussionCategoryPage.prototype.vibrate = function () {
        if (this.platform.is("android")) {
            this.vibration.vibrate(50);
        }
    };
    DiscussionCategoryPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('-------------');
        this.spaceId = parseInt(localStorage.getItem('SpaceID'));
        if (this.infinteScroll) {
            this.infinteScroll.enable(true);
        }
        this.taptic.impact({ style: 'light' });
        this.vibrate();
        this.page = 1;
        this.isLoading = false;
        var options = {
            EntityType: 55,
            page: this.page,
            ParentID: this.id
        };
        if (this.spaceId) {
            options['SpaceID'] = this.spaceId;
        }
        this.contentProvider.getContentByEntity(options)
            .finally(function () {
            if (refresher) {
                refresher.complete();
            }
        })
            .subscribe(function (response) {
            _this.items = response.ResponseData;
        }, function (err) {
            if (refresher) {
                refresher.complete();
            }
        });
    };
    DiscussionCategoryPage.prototype.getContent = function (infiniteScroll) {
        var _this = this;
        this.spaceId = parseInt(localStorage.getItem('SpaceID'));
        console.log('-------------');
        if (infiniteScroll) {
            this.infinteScroll = infiniteScroll;
        }
        if (this.items.length > 0 && this.items.length < 10 && infiniteScroll) {
            infiniteScroll.enable(false);
        }
        ++this.page;
        if (!infiniteScroll) {
            this.isLoading = true;
        }
        var options = {
            EntityType: 55,
            page: this.page,
            ParentID: this.id
        };
        console.log(this.spaceId);
        if (this.spaceId) {
            options['SpaceID'] = this.spaceId;
        }
        this.contentProvider.getContentByEntity(options)
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
            console.log(response);
            _this.items = _this.items.concat(response.ResponseData);
            if (infiniteScroll && response.ResponseData.length < 10) {
                infiniteScroll.enable(false);
            }
        }, function (err) {
            if (infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    DiscussionCategoryPage.prototype.ionViewDidLoad = function () {
        this.spaceId = parseInt(localStorage.getItem('SpaceID'));
    };
    DiscussionCategoryPage.prototype.setFilter = function () {
        var _this = this;
        var options;
        switch (this.sort) {
            case 0:
                this.filterModel = this.filterItems[0].name;
                this.isLoading = true;
                this.page = 1;
                options = {
                    EntityType: 55,
                    page: this.page,
                    ParentID: this.id
                };
                if (this.spaceId) {
                    options['SpaceID'] = this.spaceId;
                }
                this.items = [];
                this.contentProvider.getContentByEntity(options)
                    .finally(function () {
                    _this.isLoading = false;
                })
                    .subscribe(function (response) {
                    _this.items = _this.items.concat(response.ResponseData);
                }, function (err) {
                });
                break;
            case 1:
                this.filterModel = this.filterItems[1].name;
                break;
            case 2:
                this.filterModel = this.filterItems[1].name;
                this.isLoading = true;
                this.page = 1;
                options = {
                    EntityType: 55,
                    page: this.page,
                    ParentID: this.id,
                    IsUnanswered: false
                };
                if (this.spaceId) {
                    options['SpaceID'] = this.spaceId;
                }
                this.items = [];
                this.contentProvider.getContentByEntity(options)
                    .finally(function () {
                    _this.isLoading = false;
                })
                    .subscribe(function (response) {
                    _this.items = _this.items.concat(response.ResponseData);
                }, function (err) {
                });
                break;
            case 3:
                this.filterModel = this.filterItems[2].name;
                this.isLoading = true;
                this.page = 1;
                options = {
                    EntityType: 55,
                    page: this.page,
                    ParentID: this.id,
                    IsUnanswered: true
                };
                if (this.spaceId) {
                    options['SpaceID'] = this.spaceId;
                }
                this.items = [];
                this.contentProvider.getContentByEntity(options)
                    .finally(function () {
                    _this.isLoading = false;
                })
                    .subscribe(function (response) {
                    _this.items = _this.items.concat(response.ResponseData);
                }, function (err) {
                });
                break;
        }
    };
    DiscussionCategoryPage.prototype.createDiscussion = function () {
        this.navCtrl.push('discussion-create', {
            spaceId: this.spaceId,
            title: this.title,
            subTitle: this.subTitle
        });
    };
    DiscussionCategoryPage.prototype.search = function (infiniteScroll) {
        var _this = this;
        if (this.searchfilter.length === 0) {
            this.items = [];
            this.page = 0;
            this.getContent();
            return 0;
        }
        if (infiniteScroll) {
            this.infinteScroll = infiniteScroll;
        }
        else {
            this.page = 0;
            this.items = [];
        }
        if (this.items.length != 0 && this.items.length < 10) {
            infiniteScroll.enable(false);
            return 0;
        }
        ++this.page;
        if (!infiniteScroll) {
            this.isLoadingSearch = true;
        }
        var options = {
            EntityType: 55,
            page: this.page,
        };
        if (this.spaceId) {
            options['SpaceID'] = this.spaceId;
        }
        this.contentProvider.searchByParent(this.searchfilter, 55, this.page, this.spaceId, this.id)
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
            console.log('-------------');
            console.log(response);
            _this.items = _this.items.concat(response.ResponseData);
            if (infiniteScroll && response.ResponseData.length < 10) {
                infiniteScroll.enable(false);
            }
        }, function (err) {
            if (infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    DiscussionCategoryPage.prototype.showSearchBar = function () {
        this.bsearchbar = true;
    };
    DiscussionCategoryPage.prototype.onCancel = function () {
        this.bsearchbar = false;
        this.searchfilter = "";
        this.page = 0;
        this.items = [];
        this.getContent();
    };
    DiscussionCategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-discussion-category',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/disscusions/discussion-category/discussion-category.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title><span [innerHtml]="title"></span></ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher>\n\n  <ion-card card-title>\n\n    <ion-card-content>\n\n      <span *ngIf="!subTitle">\n\n        {{ "TITLES.BUGS_AND_ISSUES" | translate }}        \n\n      </span>\n\n      <span *ngIf="subTitle">{{ subTitle | translate }}</span>\n\n      <ion-buttons>\n\n        <button end add-button ion-button clear (click)="createDiscussion()">\n\n          <ion-icon name="add"></ion-icon>\n\n        </button>\n\n        <button end ion-button clear (click)="showSearchBar()">\n\n          <ion-icon name="search"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n    </ion-card-content>\n\n  </ion-card>\n\n\n\n  <ion-searchbar [(ngModel)]="searchfilter" *ngIf="bsearchbar" (keydown)="isLoadingSearch = true; items = []" (ionInput)="search()" (ionCancel)="onCancel($event)" showCancelButton="true" placeholder="{{\'MODAL.SEARCH...\'|translate}}" cancelButtonText="{{\'TOAST.CANCEL\'|translate}}"></ion-searchbar>\n\n\n\n  <ion-list no-margin>\n\n    <ion-item>\n\n      <ion-label>{{ filterModel | translate }}</ion-label>\n\n      <ion-select (ionChange)="setFilter()" interface="popover" [(ngModel)]="sort" [style.paddingLeft]="\'0px\'">\n\n        <ion-option [value]="item.value" *ngFor="let item of filterItems">{{ item.name | translate }}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n  </ion-list>\n\n  <no-results-found *ngIf="items.length == 0 && !isLoading && !isLoadingSearch &&  bsearchbar && searchfilter.length > 0"></no-results-found>  \n\n  <searching-for *ngIf="isLoadingSearch && searchfilter.length != 0" [text]="searchfilter"></searching-for>\n\n  <div *ngIf="isLoading">\n\n    <empty-discussion-category-card *ngFor="let item of [1,2,3,4,5]"></empty-discussion-category-card>\n\n  </div>\n\n  <bug-item *ngFor="let item of items" [item]="item"></bug-item>\n\n\n\n  <ion-infinite-scroll (ionInfinite)="getContent($event)" threshold="1000px">\n\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/disscusions/discussion-category/discussion-category.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_taptic_engine__["a" /* TapticEngine */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_vibration__["a" /* Vibration */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]])
    ], DiscussionCategoryPage);
    return DiscussionCategoryPage;
}());

//# sourceMappingURL=discussion-category.js.map

/***/ })

});
//# sourceMappingURL=54.js.map