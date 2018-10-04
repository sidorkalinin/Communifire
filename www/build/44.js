webpackJsonp([44],{

/***/ 668:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvitePageModule", function() { return InvitePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__invite__ = __webpack_require__(741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_spaces__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var InvitePageModule = /** @class */ (function () {
    function InvitePageModule() {
    }
    InvitePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__invite__["a" /* InvitePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__invite__["a" /* InvitePage */]),
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__providers_spaces__["a" /* SpacesProvider */],
            ]
        })
    ], InvitePageModule);
    return InvitePageModule;
}());

//# sourceMappingURL=invite.module.js.map

/***/ }),

/***/ 741:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvitePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_spaces__ = __webpack_require__(42);
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
 * Generated class for the InvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var InvitePage = /** @class */ (function () {
    function InvitePage(navCtrl, navParams, translate, spaceProvider, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.spaceProvider = spaceProvider;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.pendingRequests = [];
        this.data = this.navParams.get('data');
        this.activityAction = Number(this.data.additionalData.activityAction);
    }
    InvitePage.prototype.ionViewDidLoad = function () {
        if (this.activityAction == 13) {
            this.pendingRequests.push(this.data);
        }
    };
    InvitePage.prototype.accept = function (d, action) {
        var _this = this;
        if (action == 15) {
            var saveloader_1 = this.loadingCtrl.create({});
            saveloader_1.present();
            this.spaceProvider.setMember(d.additionalData.spaceID, localStorage.getItem('UserID'))
                .finally(function () {
                saveloader_1.dismiss();
            })
                .subscribe(function (res) {
                if (res.IsError == false) {
                    var active = _this.navCtrl.getActive();
                    _this.navCtrl.push('space-details', {
                        id: d.additionalData.spaceID,
                    });
                    _this.navCtrl.removeView(active);
                }
                else {
                    _this.translate.get("TOAST.ERROR").subscribe(function (res) {
                        _this.presentToast(res);
                    });
                }
            });
        }
    };
    InvitePage.prototype.reject = function () {
        this.navCtrl.pop();
    };
    InvitePage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    };
    InvitePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-invite',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/invite/invite.html"*/'<!--\n\n  Generated template for the InvitePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{"EXTRA.INVITE" | translate}}</ion-title>\n\n    <button ion-button icon-only button-clear menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content no-padding>\n\n  <ion-card tappable *ngIf="activityAction == 15">\n\n    <ion-card-content>\n\n      <p [style.color]="\'#000\'">\n\n        {{data.message}}\n\n      </p>\n\n      <ion-row padding-horizontal>\n\n        <ion-col no-padding>\n\n          <button ion-button (click)="reject(data, 15)">\n\n            {{"EXTRA.REJECT" | translate}}\n\n          </button>\n\n        </ion-col>\n\n        <ion-col no-padding text-right>\n\n          <button ion-button (click)="accept(data, 15)">\n\n            {{"EXTRA.ACCEPT" | translate}}\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-card-content>\n\n  </ion-card>  \n\n</ion-content>\n\n'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/invite/invite.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_3__providers_spaces__["a" /* SpacesProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */]])
    ], InvitePage);
    return InvitePage;
}());

//# sourceMappingURL=invite.js.map

/***/ })

});
//# sourceMappingURL=44.js.map