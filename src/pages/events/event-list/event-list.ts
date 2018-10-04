import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, ModalController } from 'ionic-angular';
//import { SpaceModalComponent } from '../../../modals/select-space-modal/spaces';
import { ContentProvider } from "../../../providers/content";
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@IonicPage({
  name: "event-list",
  segment: "event-list"
})
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  private eventType: string;
  public page: number = 0;
  public attendeesPage: number = 0;
  public invitedPage: number = 0;
  isLoadingAll: boolean = true;
  isLoadingAttendees: boolean = true;
  isLoadingInvited: boolean = true;
  lengthAll: number = 0;
  lengthAttendees: number = 0;
  lengthInvited: number = 0;

  allEvents: any = {};
  attendeesEvents = {};
  invitedEvents = {};

  sort = 0;
  filterModel: string = "COMMONS.UPCOMINGEVENTS";
  filterItems: any = [    
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

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private contentProvider: ContentProvider,
    private appCenterAnalytics: AppCenterAnalytics
  ) {
    this.eventType = "attending";
    this.getAttendeesEvents();
    this.appCenterAnalytics.isEnabled().then( (b) => {
      if(b){
        this.appCenterAnalytics.trackEvent('Event List Load Event.', { userid: localStorage.getItem('UserID') }).then(() => {
          console.log('Event List Load Event tracked');
        });
      }
    })
  }

  ionViewDidLoad() {
  }

  keys(object) : Array<string> {
    return Object.keys(object);
  }

  getAllEvents(infiniteScroll?: InfiniteScroll){
    if(infiniteScroll && this.keys(this.allEvents).length == 0){
      infiniteScroll.enable(false);
      return 0
    } 

    ++this.page;

    switch(this.sort) {
      case 0:
        this.contentProvider.getEvents(this.page, 1, 3, 4).finally(() => {
          if (infiniteScroll) {
            infiniteScroll.complete();
          } else {
            this.isLoadingAll = false;
          }
        })
        .do((response: any) => {
          console.log(response);
          if (!response.ResponseData.length && infiniteScroll || response.ResponseData.length < 10 && infiniteScroll) {
            infiniteScroll.enable(false);
          }
        })
        .subscribe(this.handleEvents.bind(this), err => infiniteScroll.enable(false));
        break;
      case 1:
        this.contentProvider.getEvents(this.page, 1, 3, null, null, Number(localStorage.getItem('UserID'))).finally(() => {
          if (infiniteScroll) {
            infiniteScroll.complete();
          } else {
            this.isLoadingAll = false;
          }
        })
        .do((response: any) => {
          console.log(response);
          if (!response.ResponseData.length && infiniteScroll || response.ResponseData.length < 10 && infiniteScroll) {
            infiniteScroll.enable(false);
          }
        })
        .subscribe(this.handleEvents.bind(this), err => infiniteScroll.enable(false));
        break;
      case 2:
        let curr = new Date; // get current date
        let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        let last = first + 6; // last day is the first day + 6
        
        let firstday = new Date(curr.setDate(first)).toISOString();
        let lastday = new Date(curr.setDate(last)).toISOString();
        
        this.contentProvider.getEvents(this.page, 1, 3, null, null, null, firstday, lastday).finally(() => {
          if (infiniteScroll) {
            infiniteScroll.complete();
          } else {
            this.isLoadingAll = false;
          }
        })
        .do((response: any) => {
          console.log(response);
          if (!response.ResponseData.length && infiniteScroll || response.ResponseData.length < 10 && infiniteScroll) {
            infiniteScroll.enable(false);
          }
        })
        .subscribe(this.handleEvents.bind(this), err => infiniteScroll.enable(false));

        break;
      case 3:
        this.contentProvider.getEvents(this.page, 1, 3).finally(() => {
          if (infiniteScroll) {
            infiniteScroll.complete();
          } else {
            this.isLoadingAll = false;
          }
        })
        .do((response: any) => {
          console.log(response);
          if (!response.ResponseData.length && infiniteScroll || response.ResponseData.length < 10 && infiniteScroll) {
            infiniteScroll.enable(false);
          }
        })
        .subscribe(this.handleEvents.bind(this), err => infiniteScroll.enable(false));
        break;
    }
  }

  getAttendeesEvents(infiniteScroll?: InfiniteScroll){
    if(infiniteScroll && this.keys(this.attendeesEvents).length == 0){
      infiniteScroll.enable(false);
      return 0
    }
    ++this.attendeesPage;
    this.contentProvider.getEvents(this.attendeesPage, 1, 3, 8, 1).finally(() => {
      if (infiniteScroll) {
        infiniteScroll.complete();
      } else {
        this.isLoadingAttendees = false;
      }
    })
    .do((response: any) => {
      if (!response.ResponseData.length && infiniteScroll || response.ResponseData.length < 10 && infiniteScroll) {
        infiniteScroll.enable(false);
      }
    })
    .subscribe(this.handleAttendeesEvents.bind(this), err => infiniteScroll.enable(false));
  }

  getInvitedEvents(infiniteScroll?: InfiniteScroll){
    if(infiniteScroll && this.keys(this.invitedEvents).length == 0){
      infiniteScroll.enable(false);
      return 0
    }
    ++this.invitedPage;
    this.contentProvider.getEvents(this.invitedPage, 1, 3, 8, 5).finally(() => {
      if (infiniteScroll) {
        infiniteScroll.complete();
      } else {
        this.isLoadingInvited = false;
      }
    })
    .do((response: any) => {
      if (!response.ResponseData.length && infiniteScroll || response.ResponseData.length < 10 && infiniteScroll) {
        infiniteScroll.enable(false);
      }
    })
    .subscribe(this.handleInvitedEvents.bind(this), err => infiniteScroll.enable(false));
  }

  handleEvents(response){
    let res = response.ResponseData;
    this.lengthAll = res.length;
    res.forEach(item => {
      let key = item.StartDateISO.split('T')[0];
      if (!this.allEvents[key]){
        this.allEvents[key] = [];
      }
      this.allEvents[key].push(item);
    });
  }

  handleAttendeesEvents(response){
    let res = response.ResponseData;
    this.lengthAttendees = res.length;
    res.forEach(item => {
      let key = item.StartDateISO.split('T')[0];
      if (!this.attendeesEvents[key]){
        this.attendeesEvents[key] = [];
      }
      this.attendeesEvents[key].push(item);
    });
  }

  handleInvitedEvents(response){
    let res = response.ResponseData;
    this.lengthInvited = res.length;
    res.forEach(item => {
      let key = item.StartDateISO.split('T')[0];
      if (!this.invitedEvents[key]){
        this.invitedEvents[key] = [];
      }
      this.invitedEvents[key].push(item);
    });
  }

  changeEventType(){
    if (this.keys(this.allEvents).length == 0 && this.eventType === "all"){
      this.getAllEvents();
    }
    if (this.keys(this.invitedEvents).length == 0 && this.eventType === "invited"){
      this.getInvitedEvents();
    }
    console.log(this.eventType);
  }

  goToEvent(event){
    this.navCtrl.push('events', {
      id: event.EventID
    })
  }

  addClick(){
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
  }

  setFilter() {
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
  }

  displayDate(key) {
    console.log(key);
    return key;
  }
}
