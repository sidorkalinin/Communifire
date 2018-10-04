webpackJsonp([56],{

/***/ 661:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CasesFilterPageModule", function() { return CasesFilterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cases_filter__ = __webpack_require__(734);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var CasesFilterPageModule = /** @class */ (function () {
    function CasesFilterPageModule() {
    }
    CasesFilterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__cases_filter__["a" /* CasesFilterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__cases_filter__["a" /* CasesFilterPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_4__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_5__pipes_pipes_modules__["a" /* PipesModule */]
            ],
        })
    ], CasesFilterPageModule);
    return CasesFilterPageModule;
}());

//# sourceMappingURL=cases-filter.module.js.map

/***/ }),

/***/ 734:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CasesFilterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_device__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CasesFilterPage = /** @class */ (function () {
    function CasesFilterPage(navCtrl, navParams, device, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.device = device;
        this.viewCtrl = viewCtrl;
        this.spaceId = null;
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
        this.spaceId = this.navParams.get("spaceId");
        this.projectId = this.navParams.get("projectId");
        this.categoryId = this.navParams.get("categoryId");
        this.milestoneId = this.navParams.get("milestoneId");
        this.statusId = this.navParams.get("statusId");
        this.priorityId = this.navParams.get("priorityId");
        this.assignedToId = this.navParams.get("assignedToId");
        this.createdById = this.navParams.get("createdById");
    }
    CasesFilterPage.prototype.ionViewDidLoad = function () {
    };
    CasesFilterPage.prototype.setPriority = function ($event) {
        this.priorityId = $event;
    };
    CasesFilterPage.prototype.setStatus = function ($event) {
        this.statusId = $event;
    };
    CasesFilterPage.prototype.setMilestone = function ($event) {
        this.milestoneId = $event;
    };
    CasesFilterPage.prototype.setProject = function ($event) {
        this.projectId = $event;
        if (!$event) {
            this.categoryId = null;
            this.milestoneId = null;
        }
    };
    CasesFilterPage.prototype.setCategory = function ($event) {
        this.categoryId = $event;
    };
    CasesFilterPage.prototype.setAssignedUser = function ($event) {
        this.assignedToId = $event;
    };
    CasesFilterPage.prototype.setReportedUser = function ($event) {
        this.createdById = $event;
    };
    CasesFilterPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss({ isCanceled: true });
    };
    CasesFilterPage.prototype.applyFilter = function () {
        this.viewCtrl.dismiss({
            spaceId: this.spaceId,
            projectId: this.projectId,
            categoryId: this.categoryId,
            milestoneId: this.milestoneId,
            statusId: this.statusId,
            priorityId: this.priorityId,
            assignedToId: this.assignedToId,
            createdById: this.createdById,
        });
    };
    CasesFilterPage.prototype.reset = function () {
        this.projectId = null;
        this.categoryId = null;
        this.milestoneId = null;
        this.statusId = null;
        this.priorityId = null;
        this.assignedToId = null;
        this.createdById = null;
        // this.applyFilter();
    };
    CasesFilterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-cases-filter',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/cases/cases-filter/cases-filter.html"*/'<ion-header  [ngClass]="{\'is-iphone-x\': isIphoneX}">\n\n  <ion-navbar hideBackButton>\n\n    <ion-buttons left>\n\n      <button ion-button icon-only (click)="dismiss()">\n\n        <ion-icon name="ios-arrow-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>{{ "COMMONS.FILTER_CASES" | translate }}</ion-title>\n\n    <ion-buttons right>\n\n      <button ion-button icon-only (click)="applyFilter()">\n\n        {{ "COMMONS.SEARCH" | translate }}\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-list no-lines no-paddding>\n\n    <project-select (returnProject)="setProject($event)" [currentProject]="projectId" [spaceId]="spaceId"></project-select>\n\n    <category-select *ngIf="projectId" (returnCategory)="setCategory($event)" [currentCategory]="categoryId" [projectId]="projectId" [spaceId]="spaceId"></category-select>\n\n    <milestone-select *ngIf="projectId" (returnMilestone)="setMilestone($event)" [currentMilestone]="milestoneId" [projectId]="projectId" [spaceId]="spaceId"></milestone-select>\n\n    <status-select (returnStatus)="setStatus($event)" [currentStatus]="statusId" [spaceId]="spaceId"></status-select>\n\n    <priority-select (returnPriority)="setPriority($event)" [currentPriority]="priorityId" [spaceId]="spaceId"></priority-select>\n\n    <assign-to-select [hidden]="!projectId && spaceId == 0" (returnUser)="setAssignedUser($event)" [currentUser]="assignedToId" [spaceId]="spaceId" [projectId]="projectId"></assign-to-select>\n\n    <assign-to-select [hidden]="!projectId && spaceId == 0" (returnUser)="setReportedUser($event)" [title]="\'COMMONS.CREATED_BY\'" [currentUser]="createdById" [spaceId]="spaceId" [projectId]="projectId"></assign-to-select>\n\n  </ion-list>\n\n  <ion-buttons text-center>\n\n    <button ion-button outline (click)="reset()">{{ "COMMONS.RESET" | translate }}</button>\n\n  </ion-buttons>\n\n</ion-content>'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/cases/cases-filter/cases-filter.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */]])
    ], CasesFilterPage);
    return CasesFilterPage;
}());

//# sourceMappingURL=cases-filter.js.map

/***/ })

});
//# sourceMappingURL=56.js.map