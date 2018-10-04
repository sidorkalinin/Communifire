webpackJsonp([38],{

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhotoCreatePageModule", function() { return PhotoCreatePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__photo_create__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var PhotoCreatePageModule = /** @class */ (function () {
    function PhotoCreatePageModule() {
    }
    PhotoCreatePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__photo_create__["a" /* PhotoCreatePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__photo_create__["a" /* PhotoCreatePage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__["a" /* PipesModule */]
            ],
        })
    ], PhotoCreatePageModule);
    return PhotoCreatePageModule;
}());

//# sourceMappingURL=photo-create.module.js.map

/***/ }),

/***/ 745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotoCreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




/**
 * Generated class for the PhotoCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PhotoCreatePage = /** @class */ (function () {
    function PhotoCreatePage(navCtrl, navParams, contentProvider, loadingCtrl, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contentProvider = contentProvider;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.tags = [];
        this.spaceId = this.navParams.get('spaceId');
        this.navTitle = this.navParams.get('title');
    }
    PhotoCreatePage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.translate.get("COMMONS.LOADING_ARTICLE").subscribe(function (res) {
                    var loader = _this.loadingCtrl.create({
                        content: res,
                    });
                    loader.present();
                    loader.dismiss();
                });
                return [2 /*return*/];
            });
        });
    };
    PhotoCreatePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PhotoCreatePage');
    };
    //Set Tag
    PhotoCreatePage.prototype.setTags = function (tags) {
        this.tags = tags;
    };
    //Set MetaInfo
    PhotoCreatePage.prototype.setMetaInformation = function (meta) {
        this.metaTitle = meta.metaTitle;
        this.metaDescription = meta.metaDescription;
    };
    //Image File
    PhotoCreatePage.prototype.setFiles = function (files) {
        this.images = files;
    };
    // Element not validated gets focus
    PhotoCreatePage.prototype.getFocus = function () {
        this.titleClass = '';
        this.summaryClass = '';
        this.bodyClass = '';
    };
    PhotoCreatePage.prototype.navToList = function () {
        var active = this.navCtrl.getActive();
        var parent = this.navCtrl.getPrevious();
        this.navCtrl.push("photo-list", {
            title: this.navTitle,
            SpaceID: this.spaceId
        }, {
            direction: "back"
        });
        this.navCtrl.removeView(active);
        this.navCtrl.removeView(parent);
    };
    PhotoCreatePage.prototype.cancel = function () {
        this.navCtrl.pop();
    };
    PhotoCreatePage.prototype.save = function () {
        var _this = this;
        if (this.contentTitle == undefined) {
            this.titleClass = 'red';
            var yOffset = document.getElementById('headline').offsetTop;
            this.content.scrollTo(0, yOffset - 50, 1000);
            return;
        }
        else if (this.contentSummary == undefined) {
            this.summaryClass = 'red';
            var yOffset = document.getElementById('summary').offsetTop;
            this.content.scrollTo(0, yOffset - 50, 1000);
            return;
        }
        //let tagscsv = this.tags.join(',');
        var body = {
            'EntityType': 18,
            'SpaceID': this.spaceId,
            'ContentTitle': this.contentTitle,
            'ContentSummary': this.contentSummary,
            'MetaTitle': this.metaTitle,
            'MetaDescription': this.metaDescription,
        };
        this.contentProvider.createContent(JSON.stringify(body))
            .finally(function () {
            _this.navToList();
        })
            .subscribe(function (res) {
            console.log(res.ResponseData);
            _this.uploadPhoto(res.ResponseData);
        });
    };
    PhotoCreatePage.prototype.uploadPhoto = function (c_id) {
        for (var i = 0; i < this.images.length; i++) {
            this.contentProvider.uploadAlbumPhoto({
                'fullPath': this.images[i].path,
                'name': this.images[i].filename,
                'contentID': c_id
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], PhotoCreatePage.prototype, "content", void 0);
    PhotoCreatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-photo-create',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/photos/photo-create/photo-create.html"*/'<!--\n\n  Generated template for the PhotoCreatePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{ "CREATE.NEWALBUM" | translate }}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <ion-card>\n\n    <div class=\'pb-10 pt-15\'>\n\n      <ion-label>{{ "CREATE.ALBUMNAME" | translate }} <i class="fa fa-star fa-1 fa-red" aria-hidden="true"></i></ion-label>\n\n      <ion-input id=\'headline\' placeholder=\'{{ "CREATE.ALBUMNAME" | translate }}\' [(ngModel)]=\'contentTitle\' [ngClass]=\'titleClass\' (ionFocus)=\'getFocus()\'></ion-input>\n\n    </div>\n\n    <div class=\'pb-10\'>\n\n      <ion-label>{{ "CREATE.ALBUMDESCRIPTION" | translate }} <i class="fa fa-star fa-1 fa-red" aria-hidden="true"></i></ion-label>\n\n      <ion-textarea id=\'summary\' placeholder="Description" [(ngModel)]=\'contentSummary\' [ngClass]=\'summaryClass\' (ionFocus)=\'getFocus()\'></ion-textarea>\n\n    </div>\n\n  </ion-card>\n\n  <ion-card>\n\n    <div class=\'pt-15\'>\n\n      <add-tags (tags)=\'setTags($event)\'></add-tags>      \n\n    </div>\n\n  </ion-card>\n\n  <ion-card>\n\n    <meta-information (meta)=\'setMetaInformation($event)\'></meta-information>\n\n  </ion-card>\n\n  <ion-card>\n\n    <add-photo (files)=\'setFiles($event)\'></add-photo>\n\n  </ion-card>\n\n  <ion-card>\n\n    <button ion-button class=\'btn-cancel\' color="light" (click)=\'cancel()\'>{{ "CREATE.CANCEL" | translate }}</button>\n\n    <button ion-button class=\'btn-save\' color="secondary" (click)=\'save()\'>{{ "CREATE.SAVE" | translate }}</button>    \n\n  </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/photos/photo-create/photo-create.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
    ], PhotoCreatePage);
    return PhotoCreatePage;
}());

//# sourceMappingURL=photo-create.js.map

/***/ })

});
//# sourceMappingURL=38.js.map