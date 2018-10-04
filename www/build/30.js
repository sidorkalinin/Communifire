webpackJsonp([30],{

/***/ 681:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageUserPageModule", function() { return ManageUserPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manage_user__ = __webpack_require__(754);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_people__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_spaces__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_center_analytics__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var ManageUserPageModule = /** @class */ (function () {
    function ManageUserPageModule() {
    }
    ManageUserPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__manage_user__["a" /* ManageUserPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__manage_user__["a" /* ManageUserPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__providers_people__["a" /* PeopleProvider */],
                __WEBPACK_IMPORTED_MODULE_7__providers_spaces__["a" /* SpacesProvider */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]
            ]
        })
    ], ManageUserPageModule);
    return ManageUserPageModule;
}());

//# sourceMappingURL=manage-user.module.js.map

/***/ }),

/***/ 754:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageUserPage; });
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







/**
 * Generated class for the ManageUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ManageUserPage = /** @class */ (function () {
    function ManageUserPage(viewCtrl, navParams, spacesProvider, navCtrl, appCenterAnalytics, translate, toastCtrl, loadingCtrl) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.spacesProvider = spacesProvider;
        this.navCtrl = navCtrl;
        this.appCenterAnalytics = appCenterAnalytics;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.spaceId = this.navParams.get('id');
        this.communityUrl = localStorage.getItem('community_url');
        this.isLoading = false;
        this.isLoadingUsers = false;
        this.isLoadingRequests = false;
        this.spaceView = 0;
        this.searchtext = '';
        this.spaceUsers = [];
        this.spaceRequests = [];
        this.spaceRequestUsers = [];
        this.peoplePage = 1;
        this.requestPage = 1;
        this.buttons = [
            {
                icon: 'ios-contact',
                text: 'EXTRA.REQUEST'
            }, {
                icon: 'ios-people',
                text: 'PEOPLE.HEADING'
            }
        ];
    }
    ManageUserPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ManageUserPage');
        this.getSpaceRequests();
    };
    ManageUserPage.prototype.switchSpaceView = function (view) {
        this.spaceView = view.index;
        if (this.spaceView === 0) {
            this.getSpaceRequests();
        }
        else if (this.spaceView === 1 && !this.spaceUsers.length) {
            this.getSpaceUsers();
        }
    };
    ManageUserPage.prototype.getSpaceRequests = function (infiniteScroll) {
        var _this = this;
        if (infiniteScroll) {
            ++this.requestPage;
        }
        if (!infiniteScroll && this.spaceRequestUsers.length > 0) {
            return;
        }
        if (infiniteScroll && this.spaceRequestUsers.length > 0 && this.spaceRequestUsers.length < 15) {
            infiniteScroll.enable(false);
            return;
        }
        // Fetch Space user by Id
        this.isLoadingRequests = true;
        this.spacesProvider.getSpaceRequests(this.spaceId, this.requestPage, 15)
            .finally(function () {
            if (!infiniteScroll) {
                _this.isLoadingRequests = false;
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
            console.log(res.ResponseData);
            if (res.ResponseData && res.ResponseData.length > 0) {
                _this.spaceRequestUsers = _this.spaceRequestUsers.concat(res.ResponseData);
            }
        });
    };
    ManageUserPage.prototype.getSpaceUsers = function (infiniteScroll) {
        var _this = this;
        if (infiniteScroll) {
            ++this.peoplePage;
        }
        if (!infiniteScroll && this.spaceUsers.length > 0) {
            return;
        }
        if (this.spaceUsers.length > 0 && this.spaceUsers.length < 15) {
            infiniteScroll.enable(false);
            return;
        }
        // Fetch Space user by Id
        this.isLoadingUsers = true;
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
            if (res.ResponseData && res.ResponseData.length > 0) {
                _this.spaceUsers = _this.spaceUsers.concat(res.ResponseData);
            }
            if (res.ResponseData.length < 15 && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    ManageUserPage.prototype.approve = function (person) {
        var _this = this;
        var saveloader = this.loadingCtrl.create({});
        saveloader.present();
        this.spacesProvider.setMemberShip(this.spaceId, person.UserID, true)
            .finally(function () {
            saveloader.dismiss();
        })
            .subscribe(function (res) {
            if (res.IsError == false && res.ResponseData == true) {
                _this.spaceRequestUsers = _this.spaceRequestUsers.filter(function (v) {
                    return v.UserID != person.UserID;
                });
                _this.translate.get("EXTRA.REQUEST_ACCEPTED").subscribe(function (res) {
                    _this.presentToast(res);
                });
            }
            else {
                _this.translate.get("TOAST.ERROR").subscribe(function (res) {
                    _this.presentToast(res);
                });
            }
        });
    };
    ManageUserPage.prototype.decline = function (person) {
        var _this = this;
        var saveloader = this.loadingCtrl.create({});
        saveloader.present();
        this.spacesProvider.setMemberShip(this.spaceId, person.UserID, false)
            .finally(function () {
            saveloader.dismiss();
        })
            .subscribe(function (res) {
            if (res.IsError == false && res.ResponseData == true) {
                _this.spaceRequestUsers = _this.spaceRequestUsers.filter(function (v) {
                    return v.UserID != person.UserID;
                });
                _this.translate.get("EXTRA.REQUEST_REJECTED").subscribe(function (res) {
                    _this.presentToast(res);
                });
            }
            else {
                _this.translate.get("TOAST.ERROR").subscribe(function (res) {
                    _this.presentToast(res);
                });
            }
        });
    };
    ManageUserPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    ManageUserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-manage-user',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/spaces/manage-user/manage-user.html"*/'<!--\n\n  Generated template for the ManageUserPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ "TITLES.Space" | translate}}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content no-padding>\n\n  <button-group *ngIf="spaceId != 0" [buttons]="buttons" (changed)="switchSpaceView($event)"></button-group>\n\n  <ng-container [ngSwitch]="spaceView">\n\n    <div class="space-people" *ngSwitchCase="0">\n\n      <ng-container *ngIf="isLoadingRequests">\n\n        <empty-people *ngFor="let i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"></empty-people>\n\n      </ng-container>\n\n      <people-request [peoples]=\'spaceRequestUsers\' (approve)=\'approve($event)\' (decline)=\'decline($event)\' *ngIf="spaceRequestUsers.length > 0"></people-request>\n\n      <div *ngIf="spaceRequestUsers.length == 0 && !isLoadingRequests" style="margin: 10px; text-align: center;">\n\n        {{ "EXTRA.NOREQUEST" | translate }}\n\n      </div>\n\n      <ion-infinite-scroll *ngIf="!isLoadingRequest" (ionInfinite)="getSpaceRequests($event)">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n    <div class="space-people" *ngSwitchCase="1">\n\n      <people-list [isLoading]="isLoadingUsers" [peoples]="spaceUsers | search: searchtext:\'UserInfoDisplayName\' " (doSearch)="searchtext = $event"></people-list>\n\n      <ion-infinite-scroll *ngIf="!isLoadingUsers" (ionInfinite)="getSpaceUsers($event)">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n  </ng-container>      \n\n</ion-content>\n\n'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/spaces/manage-user/manage-user.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__providers_spaces__["a" /* SpacesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */]])
    ], ManageUserPage);
    return ManageUserPage;
}());

//# sourceMappingURL=manage-user.js.map

/***/ })

});
//# sourceMappingURL=30.js.map