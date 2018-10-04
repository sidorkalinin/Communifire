webpackJsonp([23],{

/***/ 687:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskListPageModule", function() { return TaskListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__task_list__ = __webpack_require__(760);
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









var TaskListPageModule = /** @class */ (function () {
    function TaskListPageModule() {
    }
    TaskListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__task_list__["a" /* TaskListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__task_list__["a" /* TaskListPage */]),
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
    ], TaskListPageModule);
    return TaskListPageModule;
}());

//# sourceMappingURL=task-list.module.js.map

/***/ }),

/***/ 760:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TaskListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_spaces__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_task__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_authentication__ = __webpack_require__(21);
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
 * Generated class for the TaskListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TaskListPage = /** @class */ (function () {
    function TaskListPage(navCtrl, modalCtrl, navParams, loadingCtrl, translate, spaceProvider, taskProvider, authProvider) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.spaceProvider = spaceProvider;
        this.taskProvider = taskProvider;
        this.authProvider = authProvider;
        this.spaces = [];
        this.tasklist = [];
        this.tasks = [];
        this.filteredtasks = [];
    }
    TaskListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TaskListPage');
    };
    TaskListPage.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.translate.get("COMMONS.LOADING").subscribe(function (res) {
                    _this.loader = _this.loadingCtrl.create({
                        content: res,
                    });
                    _this.loader.present();
                    _this.loadSpaceList();
                    _this.loadMyID();
                });
                return [2 /*return*/];
            });
        });
    };
    TaskListPage.prototype.loadMyID = function () {
        var _this = this;
        this.authProvider.getMyDetails()
            .finally(function () {
        })
            .subscribe(function (res) {
            _this.myID = res.UserID;
        });
    };
    TaskListPage.prototype.loadSpaceList = function () {
        var _this = this;
        this.spaceProvider.getMySpaces()
            .finally(function () {
            _this.loader.dismiss();
        })
            .subscribe(function (res) {
            _this.spaces = [];
            //this.spaces.push({ name: 'Top Level Community', value: 0, default: true });
            for (var i = 0; i < res.length; i++) {
                _this.spaces.push({ name: res[i].SpaceName, value: res[i].SpaceID, default: i == 0 });
            }
        });
    };
    TaskListPage.prototype.loadTaskList = function (spaceid) {
        var _this = this;
        this.tasklist = [];
        this.tasks = [];
        this.taskProvider.getList(spaceid)
            .finally(function () {
        })
            .subscribe(function (res) {
            for (var i = 0; i < res.ResponseData.length; i++) {
                _this.tasklist.push({ name: res.ResponseData[i].TaskListName, value: res.ResponseData[i].TaskListID, default: i == 0 });
            }
        });
    };
    TaskListPage.prototype.loadTasks = function (listid) {
        var _this = this;
        this.isLoadingTasks = true;
        this.taskProvider.getTasks(listid)
            .finally(function () {
            _this.isLoadingTasks = false;
        })
            .subscribe(function (res) {
            _this.tasks = res.ResponseData;
            _this.filteredtasks = _this.tasks;
        });
    };
    TaskListPage.prototype.setSpace = function (space) {
        this.selectedSpaceID = space.value;
        this.loadTaskList(space.value);
    };
    TaskListPage.prototype.setTaskList = function (tasklist) {
        if (tasklist.value == -1)
            return;
        this.selectedTaskListID = tasklist.value;
        this.loadTasks(tasklist.value);
    };
    TaskListPage.prototype.addTaskList = function () {
        this.navCtrl.push('task-list-create');
    };
    TaskListPage.prototype.addTask = function () {
        this.navCtrl.push('task-create', { spaceid: this.selectedSpaceID, tasklistid: this.selectedTaskListID });
    };
    TaskListPage.prototype.edit = function (task) {
        this.navCtrl.push('task-edit', { task: task });
    };
    TaskListPage.prototype.filter = function (type) {
        var _this = this;
        if (type == 'All') {
            this.filteredtasks = this.tasks;
        }
        else if (type == 'Today') {
        }
        else if (type == 'Mine') {
            this.filteredtasks = this.tasks.filter(function (v) {
                if (v.AssignedToUserID == _this.myID) {
                    return true;
                }
                else
                    return false;
            });
        }
    };
    TaskListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-task-list',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/tasks/task-list/task-list.html"*/'<!--\n\n  Generated template for the TaskListPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="blue">\n\n    <ion-title>{{ "NAV.TASKS" | translate }}</ion-title>\n\n    <button ion-button icon-only button-clear menuToggle color="white">\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>    \n\n  </ion-navbar>  \n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-card>\n\n    <ion-row style=\'height: 30px;\'>      \n\n      <span class=\'add-button\' (click)="addTaskList()">\n\n        <i class="fa fa-plus-circle fa-4" aria-hidden="true"></i>\n\n        Add Tasklist\n\n      </span>\n\n    </ion-row>\n\n    <ion-row>      \n\n      <ion-col col-6>\n\n        <drop-down-select [entity]=\'{allItems: spaces, label: "Space", isRequired: 0}\' (select)=\'setSpace($event)\'></drop-down-select>\n\n      </ion-col>\n\n      <ion-col col-6>\n\n        <drop-down-select [entity]=\'{allItems: tasklist, label: "Task list", isRequired: 0}\' (select)=\'setTaskList($event)\'></drop-down-select>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-card>\n\n  <ion-card style=\'margin-top: 10px !important;\'>\n\n    <ion-row  style=\'padding-bottom: 10px;\'>\n\n      <!-- <ion-label class=\'task\'>Tasks</ion-label> -->\n\n      <!-- <button ion-button icon-only button-clear color="white" class=\'add-task\' (click)=\'addTask()\'>\n\n        <ion-icon name="add"></ion-icon>\n\n      </button> -->\n\n      <span class=\'add-task-button\' (click)="addTask()">\n\n        <i class="fa fa-plus-circle fa-4" aria-hidden="true"></i>\n\n        Add Task\n\n      </span>\n\n    </ion-row>\n\n    <ion-row  style=\'border-bottom: solid 1px gainsboro; height: 35px; padding-bottom: 10px;\'>\n\n      <ul class="nav nav-tabs">\n\n        <li class="all" (click)=\'filter("All")\'>\n\n          <a class="btn-filter">\n\n            <span class="title">All</span>            \n\n          </a>\n\n        </li>\n\n        <li class="duetoday" (click)=\'filter("Today")\'>\n\n          <a class="btn-filter">\n\n            <span class="title">Due today</span>            \n\n          </a>\n\n        </li>\n\n        <li class="custom-filter" (click)=\'filter("Mine")\'>\n\n          <a class="btn-filter">\n\n            <span class="title">Assigned to me</span>            \n\n          </a>\n\n        </li>\n\n      </ul>\n\n    </ion-row>\n\n    <loader *ngIf="isLoadingTasks"></loader>\n\n    <ion-row class=\'task-wrapper\' *ngFor=\'let task of filteredtasks\' [hidden]=\'isLoadingTasks\'>      \n\n      <ion-col col-3>\n\n        <div class=\'task-date\'>2018-09-01</div>\n\n      </ion-col>\n\n      <ion-col col-9>\n\n        <div class=\'task-title\' (click)=\'edit(task)\'>{{task.TaskName}}</div>\n\n        <div class=\'task-description\'>{{task.TaskDescription}}</div>\n\n      </ion-col>        \n\n      <div class=\'task-divide\'></div>\n\n    </ion-row>    \n\n  </ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/tasks/task-list/task-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2__providers_spaces__["a" /* SpacesProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_task__["a" /* TaskProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_authentication__["a" /* AuthenticationProvider */]])
    ], TaskListPage);
    return TaskListPage;
}());

//# sourceMappingURL=task-list.js.map

/***/ })

});
//# sourceMappingURL=23.js.map