webpackJsonp([40],{

/***/ 670:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PeoplePageModule", function() { return PeoplePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipes_pipes_modules__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__people__ = __webpack_require__(743);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_people__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var PeoplePageModule = /** @class */ (function () {
    function PeoplePageModule() {
    }
    PeoplePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__people__["a" /* PeoplePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_5__people__["a" /* PeoplePage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__providers_people__["a" /* PeopleProvider */]
            ]
        })
    ], PeoplePageModule);
    return PeoplePageModule;
}());

//# sourceMappingURL=people.module.js.map

/***/ }),

/***/ 743:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PeoplePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_do__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_authentication__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_people__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PeoplePage = /** @class */ (function () {
    function PeoplePage(peopleProvider, authenticationProvider) {
        this.peopleProvider = peopleProvider;
        this.authenticationProvider = authenticationProvider;
        this.page = 0;
        this.cachePeople = [];
        this.firstPage = [];
        this.peopleFilter = 'all-people';
        this.people = [];
        this.friends = [];
        this.isLoadingAll = false;
        this.isLoadingMy = false;
        this.isLoadingSearch = false;
    }
    PeoplePage.prototype.ngOnInit = function () {
        this.doInfinite();
        this.myConnections();
    };
    /**
     * This will increment this.page number
     * and fetch the page
     * @param infiniteScroll (Optional)
     */
    PeoplePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        if (this.people.length > 0 && this.people.length < 15 && infiniteScroll) {
            infiniteScroll.enable(false);
        }
        if (!infiniteScroll) {
            this.isLoadingAll = true;
        }
        this.page++;
        this.getPeople()
            .finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            _this.isLoadingAll = false;
        })
            .do(function (response) {
            if (!response.ResponseData.length && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        })
            .subscribe(function (res) {
            _this.handlePeoples(res);
            if (infiniteScroll && res.ResponseData.length < 15) {
                infiniteScroll.enable(false);
            }
            if (!infiniteScroll) {
                _this.firstPage = res.ResponseData;
            }
        }, function (err) {
            if (infiniteScroll) {
                infiniteScroll.enable(false);
            }
        });
    };
    /**
     * Search Peoples
     * This will create a copy of the peoples, so that we dont have to fetch users again, when search is cancelled
     * When search is cancelled, replace with cached copy of the users.
     * @param searchText Text to search
     */
    PeoplePage.prototype.search = function (searchText) {
        var _this = this;
        if (searchText) {
            this.isLoadingSearch = true;
            this.getPeople(searchText)
                .finally(function () { return _this.isLoadingSearch = false; })
                .subscribe(function (response) {
                if (!_this.cachePeople.length) {
                    _this.cachePeople = [].concat(_this.people);
                }
                _this.people = response.ResponseData;
            }, function (err) {
                _this.people = [];
            });
        }
        else {
            this.people = [].concat(this.cachePeople);
        }
    };
    PeoplePage.prototype.refreshPeople = function () {
        this.page = 1;
        this.people = this.firstPage;
    };
    /**
     * concat response to people's array
     * @param response API Response
     */
    PeoplePage.prototype.handlePeoples = function (response) {
        this.people = this.people.concat(response.ResponseData);
    };
    /**
     * Fetch API for peoples
     * @param searchText provide searchText
     */
    PeoplePage.prototype.getPeople = function (searchText) {
        return this.peopleProvider.getPeople(searchText, this.page);
    };
    PeoplePage.prototype.myConnections = function () {
        var _this = this;
        this.isLoadingMy = true;
        var subs = this.authenticationProvider.user$
            .filter(function (user) { return user !== null; })
            .map(function (user) { return user.UserID; })
            .switchMap(function (id) { return _this.peopleProvider.getUserConnections(id); })
            .do(function () { return _this.isLoadingMy = false; })
            .subscribe(function (response) {
            if (response.ResponseData) {
                _this.friends = response.ResponseData;
            }
            subs.unsubscribe();
        });
    };
    PeoplePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-people',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/people/people.html"*/'<ion-header>\n\n  <ion-navbar color="blue">\n\n    <ion-title>{{ "PEOPLE.HEADING" | translate }}</ion-title>\n\n    <button ion-button icon-only button-clear menuToggle color="white">\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n\n\n  <ion-toolbar>\n\n    <ion-segment [(ngModel)]="peopleFilter">\n\n      <ion-segment-button value="all-people" (click)="refreshPeople()">\n\n        {{ "PEOPLE.SEGMENT.ALL" | translate }}\n\n      </ion-segment-button>\n\n\n\n      <ion-segment-button value="my-connection">\n\n        {{ "PEOPLE.SEGMENT.CONNECTION" | translate }}\n\n      </ion-segment-button>\n\n    </ion-segment>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content no-margin>\n\n  <div [ngSwitch]="peopleFilter">\n\n    <div *ngSwitchCase="\'my-connection\'">\n\n      <people-list [isLoading]="isLoadingMy" [peoples]="friends | search: searchtext:\'UserInfoDisplayName\'" (doSearch)="searchtext = $event"></people-list>\n\n    </div>\n\n\n\n    <div *ngSwitchCase="\'all-people\'">\n\n      <people-list [isLoadingSearch]="isLoadingSearch" [isLoading]="isLoadingAll" [peoples]="people" (doSearch)="search($event)"></people-list>\n\n      <ion-infinite-scroll *ngIf="!isLoadingAll" (ionInfinite)="doInfinite($event)" threshold="1000px">\n\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n      </ion-infinite-scroll>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/people/people.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_people__["a" /* PeopleProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_authentication__["a" /* AuthenticationProvider */]])
    ], PeoplePage);
    return PeoplePage;
}());

//# sourceMappingURL=people.js.map

/***/ })

});
//# sourceMappingURL=40.js.map