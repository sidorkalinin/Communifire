webpackJsonp([50],{

/***/ 702:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventListPageModule", function() { return EventListPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_list__ = __webpack_require__(775);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pipes_pipes_modules__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_components_module__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var EventListPageModule = /** @class */ (function () {
    function EventListPageModule() {
    }
    EventListPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__event_list__["a" /* EventListPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__event_list__["a" /* EventListPage */]),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */],
                __WEBPACK_IMPORTED_MODULE_5__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_4__pipes_pipes_modules__["a" /* PipesModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */],
            ]
        })
    ], EventListPageModule);
    return EventListPageModule;
}());

//# sourceMappingURL=event-list.module.js.map

/***/ }),

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_content__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_center_analytics__ = __webpack_require__(67);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { SpaceModalComponent } from '../../../modals/select-space-modal/spaces';


var EventListPage = /** @class */ (function () {
    function EventListPage(modalCtrl, navCtrl, navParams, contentProvider, appCenterAnalytics) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contentProvider = contentProvider;
        this.appCenterAnalytics = appCenterAnalytics;
        this.page = 0;
        this.attendeesPage = 0;
        this.invitedPage = 0;
        this.isLoadingAll = true;
        this.isLoadingAttendees = true;
        this.isLoadingInvited = true;
        this.lengthAll = 0;
        this.lengthAttendees = 0;
        this.lengthInvited = 0;
        this.allEvents = {};
        this.attendeesEvents = {};
        this.invitedEvents = {};
        this.sort = 0;
        this.filterModel = "COMMONS.UPCOMINGEVENTS";
        this.filterItems = [
            {
                value: 0,
                name: "COMMONS.UPCOMINGEVENTS"
            },
            {
                value: 1,
                name: "COMMONS.MYEVENTS"
            },
            {
                value: 2,
                name: "COMMONS.WEEKEVENTS"
            },
            {
                value: 3,
                name: "COMMONS.ALLEVENTS"
            }
        ];
        this.eventType = "attending";
        this.getAttendeesEvents();
        this.appCenterAnalytics.isEnabled().then(function (b) {
            if (b) {
                _this.appCenterAnalytics.trackEvent('Event List Load Event.', { userid: localStorage.getItem('UserID') }).then(function () {
                    console.log('Event List Load Event tracked');
                });
            }
        });
    }
    EventListPage.prototype.ionViewDidLoad = function () {
    };
    EventListPage.prototype.keys = function (object) {
        return Object.keys(object);
    };
    EventListPage.prototype.getAllEvents = function (infiniteScroll) {
        var _this = this;
        if (infiniteScroll && this.keys(this.allEvents).length == 0) {
            infiniteScroll.enable(false);
            return 0;
        }
        ++this.page;
        switch (this.sort) {
            case 0:
                this.contentProvider.getEvents(this.page, 1, 3, 4).finally(function () {
                    if (infiniteScroll) {
                        infiniteScroll.complete();
                    }
                    else {
                        _this.isLoadingAll = false;
                    }
                })
                    .do(function (response) {
                    console.log(response);
                    if (!response.ResponseData.length && infiniteScroll || response.ResponseData.length < 10 && infiniteScroll) {
                        infiniteScroll.enable(false);
                    }
                })
                    .subscribe(this.handleEvents.bind(this), function (err) { return infiniteScroll.enable(false); });
                break;
            case 1:
                this.contentProvider.getEvents(this.page, 1, 3, null, null, Number(localStorage.getItem('UserID'))).finally(function () {
                    if (infiniteScroll) {
                        infiniteScroll.complete();
                    }
                    else {
                        _this.isLoadingAll = false;
                    }
                })
                    .do(function (response) {
                    console.log(response);
                    if (!response.ResponseData.length && infiniteScroll || response.ResponseData.length < 10 && infiniteScroll) {
                        infiniteScroll.enable(false);
                    }
                })
                    .subscribe(this.handleEvents.bind(this), function (err) { return infiniteScroll.enable(false); });
                break;
            case 2:
                var curr = new Date; // get current date
                var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                var last = first + 6; // last day is the first day + 6
                var firstday = new Date(curr.setDate(first)).toISOString();
                var lastday = new Date(curr.setDate(last)).toISOString();
                this.contentProvider.getEvents(this.page, 1, 3, null, null, null, firstday, lastday).finally(function () {
                    if (infiniteScroll) {
                        infiniteScroll.complete();
                    }
                    else {
                        _this.isLoadingAll = false;
                    }
                })
                    .do(function (response) {
                    console.log(response);
                    if (!response.ResponseData.length && infiniteScroll || response.ResponseData.length < 10 && infiniteScroll) {
                        infiniteScroll.enable(false);
                    }
                })
                    .subscribe(this.handleEvents.bind(this), function (err) { return infiniteScroll.enable(false); });
                break;
            case 3:
                this.contentProvider.getEvents(this.page, 1, 3).finally(function () {
                    if (infiniteScroll) {
                        infiniteScroll.complete();
                    }
                    else {
                        _this.isLoadingAll = false;
                    }
                })
                    .do(function (response) {
                    console.log(response);
                    if (!response.ResponseData.length && infiniteScroll || response.ResponseData.length < 10 && infiniteScroll) {
                        infiniteScroll.enable(false);
                    }
                })
                    .subscribe(this.handleEvents.bind(this), function (err) { return infiniteScroll.enable(false); });
                break;
        }
    };
    EventListPage.prototype.getAttendeesEvents = function (infiniteScroll) {
        var _this = this;
        if (infiniteScroll && this.keys(this.attendeesEvents).length == 0) {
            infiniteScroll.enable(false);
            return 0;
        }
        ++this.attendeesPage;
        this.contentProvider.getEvents(this.attendeesPage, 1, 3, 8, 1).finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            else {
                _this.isLoadingAttendees = false;
            }
        })
            .do(function (response) {
            if (!response.ResponseData.length && infiniteScroll || response.ResponseData.length < 10 && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        })
            .subscribe(this.handleAttendeesEvents.bind(this), function (err) { return infiniteScroll.enable(false); });
    };
    EventListPage.prototype.getInvitedEvents = function (infiniteScroll) {
        var _this = this;
        if (infiniteScroll && this.keys(this.invitedEvents).length == 0) {
            infiniteScroll.enable(false);
            return 0;
        }
        ++this.invitedPage;
        this.contentProvider.getEvents(this.invitedPage, 1, 3, 8, 5).finally(function () {
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            else {
                _this.isLoadingInvited = false;
            }
        })
            .do(function (response) {
            if (!response.ResponseData.length && infiniteScroll || response.ResponseData.length < 10 && infiniteScroll) {
                infiniteScroll.enable(false);
            }
        })
            .subscribe(this.handleInvitedEvents.bind(this), function (err) { return infiniteScroll.enable(false); });
    };
    EventListPage.prototype.handleEvents = function (response) {
        var _this = this;
        var res = response.ResponseData;
        this.lengthAll = res.length;
        res.forEach(function (item) {
            var key = item.StartDateISO.split('T')[0];
            if (!_this.allEvents[key]) {
                _this.allEvents[key] = [];
            }
            _this.allEvents[key].push(item);
        });
    };
    EventListPage.prototype.handleAttendeesEvents = function (response) {
        var _this = this;
        var res = response.ResponseData;
        this.lengthAttendees = res.length;
        res.forEach(function (item) {
            var key = item.StartDateISO.split('T')[0];
            if (!_this.attendeesEvents[key]) {
                _this.attendeesEvents[key] = [];
            }
            _this.attendeesEvents[key].push(item);
        });
    };
    EventListPage.prototype.handleInvitedEvents = function (response) {
        var _this = this;
        var res = response.ResponseData;
        this.lengthInvited = res.length;
        res.forEach(function (item) {
            var key = item.StartDateISO.split('T')[0];
            if (!_this.invitedEvents[key]) {
                _this.invitedEvents[key] = [];
            }
            _this.invitedEvents[key].push(item);
        });
    };
    EventListPage.prototype.changeEventType = function () {
        if (this.keys(this.allEvents).length == 0 && this.eventType === "all") {
            this.getAllEvents();
        }
        if (this.keys(this.invitedEvents).length == 0 && this.eventType === "invited") {
            this.getInvitedEvents();
        }
        console.log(this.eventType);
    };
    EventListPage.prototype.goToEvent = function (event) {
        this.navCtrl.push('events', {
            id: event.EventID
        });
    };
    EventListPage.prototype.addClick = function () {
        this.navCtrl.push('event-create');
        // let modal = this.modalCtrl.create(SpaceModalComponent);
        // modal.present();
        // modal.onDidDismiss(data =>{
        //   if(data == undefined)
        //     return;
        //   this.navCtrl.push('event-create', {
        //     id: data.id
        //   })
        // });
    };
    EventListPage.prototype.setFilter = function () {
        switch (this.sort) {
            case 0:
                this.filterModel = this.filterItems[0].name;
                break;
            case 1:
                this.filterModel = this.filterItems[1].name;
                break;
            case 2:
                this.filterModel = this.filterItems[2].name;
                break;
            case 3:
                this.filterModel = this.filterItems[3].name;
                break;
        }
        this.page = 0;
        this.allEvents = {};
        this.isLoadingAll = true;
        this.changeEventType();
    };
    EventListPage.prototype.displayDate = function (key) {
        console.log(key);
        return key;
    };
    EventListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-event-list',template:/*ion-inline-start:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/events/event-list/event-list.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="blue">\n\n    <ion-title>{{ "NAV.EVENTS" | translate }}</ion-title>\n\n    <button ion-button icon-only button-clear menuToggle color="white">\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-buttons right>\n\n      <button end add-button ion-button clear (click)=\'addClick()\'>\n\n        <ion-icon name="add"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n  <ion-toolbar>\n\n    <ion-segment [(ngModel)]="eventType" (ionChange)="changeEventType()">\n\n      <ion-segment-button value="attending">\n\n        {{"EVENT.ATTENDING" | translate}}\n\n      </ion-segment-button>\n\n      \n\n      <ion-segment-button value="invited">\n\n        {{"EVENT.INVITED" | translate}}\n\n      </ion-segment-button>\n\n\n\n      <ion-segment-button value="all">\n\n        {{"EVENT.ALL" | translate}}\n\n      </ion-segment-button>\n\n    </ion-segment>\n\n  </ion-toolbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-list no-margin *ngIf="eventType === \'all\'">\n\n    <ion-item>\n\n      <ion-label>{{ filterModel | translate }}</ion-label>\n\n      <ion-select (ionChange)="setFilter()" interface="popover" [(ngModel)]="sort" [style.paddingLeft]="\'0px\'">\n\n        <ion-option [value]="item.value" *ngFor="let item of filterItems">{{ item.name | translate }}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n  </ion-list>\n\n  <ng-container *ngIf="eventType === \'attending\'">\n\n    <no-results-found *ngIf="keys(attendeesEvents).length == 0 && !isLoadingAttendees"></no-results-found>\n\n    <ion-item-group *ngFor="let key of keys(attendeesEvents);">\n\n      <ion-list-header color="light">\n\n          {{ key | localizedDate: \'EEE MMM dd\' }}\n\n      </ion-list-header>\n\n      <ion-item tappable *ngFor="let event of attendeesEvents[key]" (click)="goToEvent(event)">\n\n        <ion-note item-start>\n\n          <ng-container *ngIf="!event.IsAllDay">\n\n            <span>{{ event.StartTimeText }}</span>\n\n            <span>{{ event.EndTimeText }}</span>\n\n          </ng-container>\n\n          <span *ngIf="event.IsAllDay">{{"EVENT.ALL_DAY" | translate}}</span>\n\n        </ion-note>\n\n        <h2>{{ event.Title }}</h2>\n\n      </ion-item>\n\n    </ion-item-group>\n\n    <ion-infinite-scroll *ngIf="!isLoadingAttendees && keys(attendeesEvents).length != 0 && lengthAttendees >= 10" (ionInfinite)="getAttendeesEvents($event)">\n\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n    <loader *ngIf="isLoadingAttendees"></loader>\n\n  </ng-container>\n\n\n\n  <ng-container *ngIf="eventType === \'invited\'">\n\n    <no-results-found *ngIf="keys(invitedEvents).length == 0 && !isLoadingInvited"></no-results-found>\n\n    <ion-item-group *ngFor="let key of keys(invitedEvents);">\n\n      <ion-list-header color="light">\n\n          {{ key | localizedDate: \'EEE MMM dd\' }}\n\n      </ion-list-header>\n\n      <ion-item tappable *ngFor="let event of invitedEvents[key]" (click)="goToEvent(event)">\n\n        <ion-note item-start>\n\n          <ng-container *ngIf="!event.IsAllDay">\n\n            <span>{{ event.StartTimeText }}</span>\n\n            <span>{{ event.EndTimeText }}</span>\n\n          </ng-container>\n\n          <span *ngIf="event.IsAllDay">{{"EVENT.ALL_DAY" | translate}}</span>\n\n        </ion-note>\n\n        <h2>{{ event.Title }}</h2>\n\n      </ion-item>\n\n    </ion-item-group>\n\n    <ion-infinite-scroll *ngIf="!isLoadingInvited && keys(invitedEvents).length != 0 && lengthInvited >= 10" (ionInfinite)="getAllEvents($event)">\n\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n    <loader *ngIf="isLoadingInvited"></loader>\n\n  </ng-container>\n\n\n\n  <ng-container *ngIf="eventType === \'all\'">\n\n    <no-results-found *ngIf="keys(allEvents).length == 0 && !isLoadingAll"></no-results-found>\n\n    <ion-item-group *ngFor="let key of keys(allEvents);">\n\n      <ion-list-header color="light">\n\n          {{ key | localizedDate: \'EEE MMM dd\' }}\n\n      </ion-list-header>\n\n      <ion-item tappable *ngFor="let event of allEvents[key]" (click)="goToEvent(event)">\n\n        <ion-note item-start>\n\n          <ng-container *ngIf="!event.IsAllDay">\n\n            <span>{{ event.StartTimeText }}</span>\n\n            <span>{{ event.EndTimeText }}</span>\n\n          </ng-container>\n\n          <span *ngIf="event.IsAllDay">{{"EVENT.ALL_DAY" | translate}}</span>\n\n        </ion-note>\n\n        <h2>{{ event.Title }}</h2>\n\n      </ion-item>\n\n    </ion-item-group>\n\n    <ion-infinite-scroll *ngIf="!isLoadingAll && keys(allEvents).length != 0 && lengthAll >= 10" (ionInfinite)="getAllEvents($event)">\n\n      <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n    </ion-infinite-scroll>\n\n    <loader *ngIf="isLoadingAll"></loader>\n\n  </ng-container>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"/Volumes/Work/Communifire/Communifire-Ionic-App/src/pages/events/event-list/event-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_content__["a" /* ContentProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_app_center_analytics__["a" /* AppCenterAnalytics */]])
    ], EventListPage);
    return EventListPage;
}());

//# sourceMappingURL=event-list.js.map

/***/ })

});
//# sourceMappingURL=50.js.map