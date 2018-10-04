webpackJsonp([27],{

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpacesPageModule", function() { return SpacesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__spaces__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_spaces__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_modules__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var SpacesPageModule = /** @class */ (function () {
    function SpacesPageModule() {
    }
    SpacesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__spaces__["a" /* SpacesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__spaces__["a" /* SpacesPage */]),
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_6__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__providers_spaces__["a" /* SpacesProvider */]
            ]
        })
    ], SpacesPageModule);
    return SpacesPageModule;
}());

//# sourceMappingURL=spaces.module.js.map

/***/ }),

/***/ 756:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpacesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_forkJoin__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_forkJoin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_finally__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_spaces__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SpacesPage = /** @class */ (function () {
    function SpacesPage(navCtrl, spacesProvider, appCenterAnalytics) {
        this.navCtrl = navCtrl;
        this.spacesProvider = spacesProvider;
        this.appCenterAnalytics = appCenterAnalytics;
        this.allSpaces = [];
        this.mySpaces = [];
        this.spaces = 'my-spaces';
        this.isLoading = false;
        this.topLevel = {
            SpaceID: 0,
            SpaceName: "",
            SpaceIconFileName: "",
            SpaceVisibility: 4
        };
    }
    SpacesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].forkJoin(this.getMySpaces(), this.getTopLevel())
            .finally(function () { return _this.isLoading = false; })
            .subscribe(function (spaces) {
            if (spaces[1]) {
                _this.topLevel.SpaceName = spaces[1].SpaceName;
                _this.topLevel.SpaceIconFileName = spaces[1].SpaceImageURL;
                _this.topLevel.SpaceIconURL = spaces[1].SpaceImageURL;
            }
            _this.mySpaces = spaces[0];
        });
    };
    // Change tabs on Spaces list page
    SpacesPage.prototype.changeSegment = function ($event) {
        var _this = this;
        if (this.spaces === 'my-spaces' && this.mySpaces.length == 0) {
            this.getMySpaces();
        }
        if (this.spaces === 'all-spaces' && this.allSpaces.length == 0) {
            this.isLoading = true;
            this.getAllSpaces()
                .finally(function () { return _this.isLoading = false; })
                .subscribe(function (allspaceslist) {
                _this.allSpaces = allspaceslist;
            });
        }
    };
    SpacesPage.prototype.getMySpaces = function () {
        return this.spacesProvider.getMySpaces();
    };
    SpacesPage.prototype.getAllSpaces = function () {
        return this.spacesProvider.getSpaces();
    };
    SpacesPage.prototype.getTopLevel = function () {
        return this.spacesProvider.getSpace(0);
    };
    SpacesPage.prototype.addClick = function () {
        this.navCtrl.push('space-create');
    };
    SpacesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-spaces',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/spaces/spaces.html"*/'<ion-header>\n\n  <ion-navbar color="blue">\n\n    <ion-title>{{"SPACES" | translate}}</ion-title>\n\n    <button ion-button icon-only button-clear menuToggle color="white">\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <!-- <ion-buttons right>\n\n      <button end add-button ion-button clear (click)=\'addClick()\'>\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons> -->\n\n  </ion-navbar>\n\n\n\n  <ion-toolbar>\n\n    <ion-segment [(ngModel)]="spaces" (ionChange)="changeSegment($event)">\n\n      <ion-segment-button value="my-spaces">\n\n        {{"COMMONS.MYSPACES" | translate}}\n\n      </ion-segment-button>\n\n      <ion-segment-button value="all-spaces">\n\n        {{"COMMONS.ALLSPACES" | translate}}\n\n      </ion-segment-button>\n\n    </ion-segment>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content no-margin>\n\n  <div [ngSwitch]="spaces">\n\n    <div *ngSwitchCase="\'my-spaces\'">\n\n      <spaces-list [spaces]="mySpaces" [topLevel]="topLevel" [isLoading]="isLoading"></spaces-list>\n\n    </div>\n\n\n\n    <div *ngSwitchCase="\'all-spaces\'">\n\n      <spaces-list [spaces]="mySpaces" [topLevel]="topLevel" [notMe]="allSpaces" [isLoading]="isLoading" [isAll]="true"></spaces-list>\n\n    </div>\n\n  </div>  \n\n</ion-content>\n\n'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/spaces/spaces.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_spaces__["a" /* SpacesProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]])
    ], SpacesPage);
    return SpacesPage;
}());

//# sourceMappingURL=spaces.js.map

/***/ })

});
//# sourceMappingURL=27.js.map