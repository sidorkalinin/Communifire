webpackJsonp([24],{

/***/ 686:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskListCreatePageModule", function() { return TaskListCreatePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__task_list_create__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_task__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_spaces__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_mobiscroll_js_mobiscroll_angular_min__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_mobiscroll_js_mobiscroll_angular_min___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__lib_mobiscroll_js_mobiscroll_angular_min__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pipes_pipes_modules__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var TaskListCreatePageModule = /** @class */ (function () {
    function TaskListCreatePageModule() {
    }
    TaskListCreatePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__task_list_create__["a" /* TaskListCreatePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__task_list_create__["a" /* TaskListCreatePage */]),
                __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_7__lib_mobiscroll_js_mobiscroll_angular_min__["MbscModule"],
                __WEBPACK_IMPORTED_MODULE_8__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__providers_task__["a" /* TaskProvider */],
                __WEBPACK_IMPORTED_MODULE_6__providers_spaces__["a" /* SpacesProvider */]
            ]
        })
    ], TaskListCreatePageModule);
    return TaskListCreatePageModule;
}());

//# sourceMappingURL=task-list-create.module.js.map

/***/ }),

/***/ 759:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskListCreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_spaces__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_task__ = __webpack_require__(428);
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
 * Generated class for the TaskListCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TaskListCreatePage = /** @class */ (function () {
    function TaskListCreatePage(navCtrl, spacesProvider, taskProvider, viewCtrl) {
        this.navCtrl = navCtrl;
        this.spacesProvider = spacesProvider;
        this.taskProvider = taskProvider;
        this.viewCtrl = viewCtrl;
        this.spaces = [];
        this.isLoading = false;
    }
    TaskListCreatePage.prototype.setSpace = function (space) {
        this.spaceID = space.value;
    };
    TaskListCreatePage.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.spacesProvider.getMySpaces()
            .finally(function () { return _this.isLoading = false; })
            .subscribe(function (res) {
            _this.spaces = [];
            _this.spaces.push({ name: 'Personal', value: -1, default: true });
            for (var i = 0; i < res.length; i++) {
                _this.spaces.push({ name: res[i].SpaceName, value: res[i].SpaceID, default: false });
            }
        });
    };
    TaskListCreatePage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    TaskListCreatePage.prototype.save = function () {
        var _this = this;
        var body = {
            'TaskListName': this.listTitle,
            'TaskListDescription': this.listSummary,
            'SpaceID': this.spaceID,
            'IsActive': true
        };
        this.taskProvider.createList(JSON.stringify(body))
            .finally(function () {
        })
            .subscribe(function (res) {
            if (res.IsError == false) {
                _this.viewCtrl.dismiss();
            }
        });
    };
    TaskListCreatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-task-list-create',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/tasks/task-list-create/task-list-create.html"*/'<!--\n\n  Generated template for the TaskListCreatePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n    <ion-navbar color="blue">\n\n      <ion-title>Create task list</ion-title>\n\n    </ion-navbar>  \n\n  </ion-header>\n\n  \n\n  <ion-content no-margin>\n\n    <ion-card>\n\n      <div class=\'pb-10\'>\n\n        <ion-label>Task list</ion-label>\n\n        <ion-input placeholder=\'Task list\' [(ngModel)]=\'listTitle\' [ngClass]=\'titleClass\'></ion-input>\n\n      </div>\n\n      <div class=\'pb-10\'>\n\n        <ion-label>Description</ion-label>\n\n        <ion-textarea placeholder=\'Description\' [(ngModel)]=\'listSummary\' [ngClass]=\'summaryClass\'></ion-textarea>\n\n      </div>\n\n      <div class=\'pb-10\'>\n\n        <drop-down-select [entity]=\'{allItems: spaces, label: "Space", isRequired: 0}\' (select)=\'setSpace($event)\'></drop-down-select>\n\n      </div>\n\n      <div class=\'pt-10\'>\n\n        <button ion-button class=\'btn-cancel\' color="light" (click)=\'cancel()\'>Cancel</button>\n\n        <button ion-button class=\'btn-save\' color="secondary" (click)=\'save()\'>Create List</button>    \n\n      </div>\n\n    </ion-card>\n\n  </ion-content>\n\n    '/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/tasks/task-list-create/task-list-create.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_spaces__["a" /* SpacesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_task__["a" /* TaskProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */]])
    ], TaskListCreatePage);
    return TaskListCreatePage;
}());

//# sourceMappingURL=task-list-create.js.map

/***/ })

});
//# sourceMappingURL=24.js.map