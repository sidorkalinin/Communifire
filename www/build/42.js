webpackJsonp([42],{

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageFriendPageModule", function() { return ManageFriendPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__manage_friend__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_people__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_app_center_analytics__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ManageFriendPageModule = /** @class */ (function () {
    function ManageFriendPageModule() {
    }
    ManageFriendPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__manage_friend__["a" /* ManageFriendPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__manage_friend__["a" /* ManageFriendPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__providers_people__["a" /* PeopleProvider */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]
            ]
        })
    ], ManageFriendPageModule);
    return ManageFriendPageModule;
}());

//# sourceMappingURL=manage-friend.module.js.map

/***/ }),

/***/ 742:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageFriendPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_people__ = __webpack_require__(57);
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
 * Generated class for the ManageFriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ManageFriendPage = /** @class */ (function () {
    function ManageFriendPage(viewCtrl, navParams, peopleProvider, navCtrl, translate, toastCtrl, loadingCtrl) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.peopleProvider = peopleProvider;
        this.navCtrl = navCtrl;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.communityUrl = localStorage.getItem('community_url');
        this.isLoading = false;
        this.isLoadingFriends = false;
        this.isLoadingRequests = false;
        this.friendView = this.navParams.get('isRequest') ? 1 : 0;
        this.searchtext = '';
        this.issearch = false;
        this.userFriends = [];
        this.searchFriends = [];
        this.cachePeople = [];
        this.friendRequestUsers = [];
        this.peoplePage = 1;
        this.requestPage = 1;
        this.buttons = [
            {
                icon: 'ios-people',
                text: 'EXTRA.CONNECTIONS'
            }, {
                icon: 'ios-contact',
                text: 'EXTRA.CONNECTIONREQUEST'
            },
        ];
    }
    ManageFriendPage.prototype.ionViewDidLoad = function () {
    };
    ManageFriendPage.prototype.ngOnInit = function () {
        if (this.friendView == 0) {
            this.getFriends();
        }
        else {
            this.getRequests();
        }
    };
    ManageFriendPage.prototype.switchFriendView = function (view) {
        this.friendView = view.index;
        if (this.friendView === 0) {
            this.getFriends();
        }
        else if (this.friendView === 1) {
            this.getRequests();
        }
    };
    ManageFriendPage.prototype.getRequests = function (infiniteScroll) {
        var _this = this;
        if (infiniteScroll) {
            ++this.requestPage;
        }
        if (!infiniteScroll && this.friendRequestUsers.length > 0) {
            return;
        }
        if (infiniteScroll && this.friendRequestUsers.length > 0 && this.friendRequestUsers.length < 15) {
            infiniteScroll.enable(false);
            return;
        }
        // Fetch Space user by Id
        this.isLoadingRequests = true;
        this.peopleProvider.getRequests(localStorage.getItem('UserID'), this.requestPage, 15)
            .finally(function () {
            _this.isLoadingRequests = false;
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
                _this.friendRequestUsers = _this.friendRequestUsers.concat(res.ResponseData);
            }
        });
    };
    ManageFriendPage.prototype.getFriends = function (infiniteScroll) {
        var _this = this;
        if (infiniteScroll) {
            ++this.peoplePage;
        }
        if (!infiniteScroll && this.userFriends.length > 0) {
            return;
        }
        if (infiniteScroll && this.userFriends.length > 0 && this.userFriends.length < 15) {
            infiniteScroll.enable(false);
            return;
        }
        this.isLoadingFriends = true;
        // Fetch Space user by Id
        this.peopleProvider.getFriends(localStorage.getItem('UserID'), this.peoplePage, 15)
            .finally(function () {
            if (!infiniteScroll) {
                _this.isLoadingFriends = false;
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
                _this.userFriends = _this.userFriends.concat(res.ResponseData);
                _this.searchFriends = _this.userFriends;
                if (res.ResponseData.length < 15 && infiniteScroll) {
                    infiniteScroll.enable(false);
                }
            }
            else {
                infiniteScroll.enable(false);
            }
        });
    };
    ManageFriendPage.prototype.search = function (name) {
        console.log(name);
        if (name.length == 0) {
            this.searchFriends = this.userFriends;
        }
        else {
            this.searchFriends = this.userFriends.filter(function (v) {
                return v.UserInfoDisplayName.toLowerCase().indexOf(name.toLowerCase()) !== -1;
            });
        }
        this.issearch = false;
    };
    ManageFriendPage.prototype.approve = function (person) {
        var _this = this;
        var saveloader = this.loadingCtrl.create({});
        saveloader.present();
        this.peopleProvider.aproveFriend(localStorage.getItem('UserID'), person.UserID)
            .finally(function () {
            saveloader.dismiss();
        })
            .subscribe(function (res) {
            console.log(res);
            if (res.IsError == false) {
                _this.friendRequestUsers = _this.friendRequestUsers.filter(function (v) {
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
    ManageFriendPage.prototype.decline = function (person) {
        var _this = this;
        var saveloader = this.loadingCtrl.create({});
        saveloader.present();
        this.peopleProvider.declineFriend(localStorage.getItem('UserID'), person.UserID)
            .finally(function () {
            saveloader.dismiss();
        })
            .subscribe(function (res) {
            console.log(res);
            if (res.IsError == false) {
                _this.friendRequestUsers = _this.friendRequestUsers.filter(function (v) {
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
    ManageFriendPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    ManageFriendPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-manage-friend',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/manage-friend/manage-friend.html"*/'<!--\n\n  Generated template for the ManageFriendPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>{{ "EXTRA.CONNECTIONS" | translate}}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content no-padding>\n\n  <button-group [buttons]="buttons" [selected]="friendView" (changed)="switchFriendView($event)"></button-group>\n\n  <ng-container [ngSwitch]="friendView">\n\n    <div class="space-people" *ngSwitchCase="0">\n\n      <people-list [isLoading]="isLoadingFriends" [isLoadingSearch]="issearch" [peoples]="searchFriends" (doSearch)="search($event)"></people-list>\n\n      <ion-infinite-scroll *ngIf="!isLoadingFriends" (ionInfinite)="getFriends($event)">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n    <div class="space-people" *ngSwitchCase="1">      \n\n      <ng-container *ngIf="isLoadingRequests">\n\n        <empty-people *ngFor="let i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"></empty-people>\n\n      </ng-container>\n\n      <people-request [peoples]="friendRequestUsers" (approve)=\'approve($event)\' (decline)=\'decline($event)\' *ngIf="friendRequestUsers.length > 0"></people-request>\n\n      <div *ngIf="friendRequestUsers.length == 0 && !isLoadingRequests" style="margin: 10px; text-align: center;">\n\n        {{ "EXTRA.NO_FRIEND_REQUESTS_FOUND" | translate }}\n\n      </div>\n\n      <ion-infinite-scroll *ngIf="!isLoadingRequest" (ionInfinite)="getRequests($event)">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>          \n\n    </div>\n\n  </ng-container>      \n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/manage-friend/manage-friend.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__providers_people__["a" /* PeopleProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */]])
    ], ManageFriendPage);
    return ManageFriendPage;
}());

//# sourceMappingURL=manage-friend.js.map

/***/ })

});
//# sourceMappingURL=42.js.map