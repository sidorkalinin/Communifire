import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { TranslateService } from '@ngx-translate/core';
import { EventProvider } from '../../../providers/event';
import { Device } from '@ionic-native/device';
import { Keyboard } from '@ionic-native/keyboard';
import { SpacesProvider } from '../../../providers/spaces';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

/**
 * Generated class for the EventCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'event-create',
  segment: 'event-create'
})
@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})
export class EventCreatePage implements OnInit {
  spaceId: any;
  eventTitle: any;
  fromDate: any;
  fromDate1: any;
  toDate: any;
  toDate1: any;
  eventTypeID: any;
  description: any = '';
  eventLocation: any;
  attachFiles: any = [];
  tags: any = [];
  featuredImage: any;
  w_attend: any;
  organization: any;
  telephonenumber: any;
  website: any;

  Frequency: number = 0;
  IsRepeat: boolean = false;
  ReminderType: any;
  ReminderTime: any;
  IsAllDay: boolean = false;
  IsBusy: boolean = true;
  CountryID: any;
  StateID: any;
  IsPrivate: boolean = false;
  s_resources: any = [];
  guests: any = [];
  resources: any = [];

  countries: any = [
  ];
  states: any = [
  ];
  eventtypes: any = [];
  repeats: any = [
  ]
  alerts: any = [
  ]
  calendars: any = [
  ]
  showas: any = [
  ]

  froalaOption: any = {
    events: {
      'froalaEditor.focus': (e, editor) => this.froalafocus(e, editor),
      'froalaEditor.blur': (e, editor) => this.froalablur(e, editor)
    },
    placeholderText: ''
  }

  froalafocus(e, editor) {
    console.log('Focus');
    this.keyboardSubscription = this.keyboard.onKeyboardShow().subscribe();
  }
  froalablur(e, editor) {
    console.log('Blur');
    this.keyboardSubscription.unsubscribe();
  }

  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eventProvider: EventProvider,
    private spacesProvider: SpacesProvider,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public device: Device,
    private toastCtrl: ToastController,
    private keyboard: Keyboard,
    private appCenterAnalytics: AppCenterAnalytics
  ) {

    this.getCountries();
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }

    this.fromDate = this.myISOString();
    this.fromDate1 = this.myISOString();
    //new Date().toISOString();
    this.toDate = this.myISOString();
    this.toDate1 = this.myISOString();
    //new Date().toISOString();

    this.translate.get(["COMMONS.NOSELECT", "COMMONS.NEVER", "COMMONS.EVERYDAY", "COMMONS.EVERYWEEK", "COMMONS.EVERYMONTH", "COMMONS.EVERYQUARTER",
      "COMMONS.EVERYYEAR", "COMMONS.NONE", "COMMONS.MINUTESBEFORE", "COMMONS.HOURBEFORE", "COMMONS.HOURSBEFORE", "COMMONS.DAYBEFORE", "COMMONS.DAYSBEFORE",
      "COMMONS.SELECTCALENDAR", "COMMONS.BUSY", "COMMONS.FREE", "COMMONS.MYCALENDAR"
    ]).subscribe((res) => {
      this.countries = [
        { name: res['COMMONS.NOSELECT'], title: res['COMMONS.NOSELECT'], value: 0, default: true }
      ];
      this.states = [
        { name: res['COMMONs.NOSELECT'], title: res['COMMONS.NOSELECT'], value: 0, default: true }
      ];
      this.eventtypes = [];
      this.repeats = [
        { name: res['COMMONS.NEVER'], title: res['COMMONS.NEVER'], value: 0, default: true },
        { name: res['COMMONS.EVERYDAY'], title: res['COMMONS.EVERYDAY'], value: 1, default: false },
        { name: res['COMMONS.EVERYWEEK'], title: res['COMMONS.EVERYWEEK'], value: 2, default: false },
        { name: res['COMMONS.EVERYMONTH'], title: res['COMMONS.EVERYMONTH'], value: 4, default: false },
        { name: res['COMMONS.EVERYQUARTER'], title: res['COMMONS.EVERYQUARTER'], value: 8, default: false },
        { name: res['COMMONS.EVERYYEAR'], title: res['COMMONS.EVERYYEAR'], value: 16, default: false },
      ]
      this.alerts = [
        { name: res['COMMONS.NONE'], title: res['COMMONS.NONE'], value: '0', default: true },
        { name: '15 ' + res['COMMONS.MINUTESBEFORE'], title: '15 ' + res['COMMONS.MINUTESBEFORE'], value: '1', default: false },
        { name: '30 ' + res['COMMONS.MINUTESBEFORE'], title: '30 ' + res['COMMONS.MINUTESBEFORE'], value: '2', default: false },
        { name: '45 ' + res['COMMONS.MINUTESBEFORE'], title: '45 ' + res['COMMONS.MINUTESBEFORE'], value: '3', default: false },
        { name: '1 ' + res['COMMONS.HOURBEFORE'], title: '1 ' + res['COMMONS.HOURBEFORE'], value: '4', default: false },
        { name: '2 ' + res['COMMONS.HOURSBEFORE'], title: '2 ' + res['COMMONS.HOURSBEFORE'], value: '5', default: false },
        { name: '3 ' + res['COMMONS.HOURSBEFORE'], title: '3 ' + res['COMMONS.HOURSBEFORE'], value: '6', default: false },
        { name: '1 ' + res['COMMONS.DAYBEFORE'], title: '1 ' + res['COMMONS.DAYBEFORE'], value: '7', default: false },
        { name: '2 ' + res['COMMONS.DAYSBEFORE'], title: '2 ' + res['COMMONS.DAYSBEFORE'], value: '8', default: false }
      ]

      this.calendars = [
        { name: res['COMMONS.SELECTCALENDAR'], title: res['COMMONS.SELECTCALENDAR'], value: '-1', default: true },
        { name: res['COMMONS.MYCALENDAR'], title: res['COMMONS.MYCALENDAR'], value: '0', default: false }
      ]
      this.showas = [
        { name: res['COMMONS.BUSY'], title: res['COMMONS.BUSY'], value: '0', default: true },
        { name: res['COMMONS.FREE'], title: res['COMMONS.FREE'], value: '1', default: false }
      ]
    });
  }

  loadDependancies(id: any) {
    this.spaceId = id;
    this.getEventTypes(id);
    this.getEventResources(id);
  }

  ngOnInit() {
    this.getMySpaces()
      .finally(() => { })
      .subscribe(spaces => {
        let allSpaces = [];
        spaces.map(space => {
          if (space.SpaceVisibility == 0) {
            return 0;
          }
          allSpaces.push(space);
        });

        console.log(allSpaces);

        allSpaces.forEach(v => {
          this.calendars.push({ name: this.toTitleCase(v.SpaceName), title: this.toTitleCase(v.SpaceName), value: v.SpaceID, default: false });
        })
      })
  }

  private toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }

  private getMySpaces() {
    return this.spacesProvider.getMySpaces();
  }

  // private getAllSpaces () {
  //   return this.spacesProvider.getSpaces();
  // }


  myISOString() {
    let d = new Date();
    var pad = function (num) {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? '0' : '') + norm;
    };
    return d.getFullYear() +
      '-' + pad(d.getMonth() + 1) +
      '-' + pad(d.getDate()) +
      'T' + pad(d.getHours()) +
      ':' + pad(d.getMinutes()) +
      ':' + pad(d.getSeconds());
  }

  isIphoneX: boolean = false;

  ionViewDidLoad() {
  }

  getEventResources(id) {
    this.eventProvider.getEventResources({ spaceid: id })
      .finally(() => { })
      .subscribe(res => {
        this.resources = [];
        for (let i = 0; i < res.ResponseData.length; i++) {
          this.resources.push({
            name: res.ResponseData[i].ResourceName,
            title: res.ResponseData[i].ResourceName,
            value: res.ResponseData[i].ResourceID,
            src: res.ResponseData[i].ImageURL,
            selected: false
          })
        }
      })
  }

  getEventTypes(id) {
    if (id == undefined) return;
    const loader = this.loadingCtrl.create({
    });
    loader.present();
    this.eventProvider.getEventTypes(id)
      .finally(() => {
        loader.dismiss();
      })
      .subscribe(res => {
        if (res.IsError == false) {
          this.eventtypes = [];
          for (var i = 0; i < res.ResponseData.length; i++) {
            this.eventtypes.push({ name: res.ResponseData[i].EventTypeName, title: res.ResponseData[i].EventTypeName, value: res.ResponseData[i].EventTypeID, default: i == 0 });
          }
        }
      })
  }

  getCountries() {
    this.eventProvider.getCountries()
      .finally(() => {
      })
      .subscribe(res => {
        for (let i = 0; i < res.length; i++) {
          this.countries.push({
            name: res[i].CountryName,
            title: res[i].CountryName,
            value: res[i].CountryID,
            default: false
          })
        }
      })
  }

  getStates(id) {
    this.eventProvider.getStates(id)
      .finally(() => {
      })
      .subscribe(res => {
        this.translate.get(["COMMONS.NOSELECT"]).subscribe((res1) => {
          this.states = [
            { name: res1['COMMONS.NOSELECT'], title: res1['COMMONS.NOSELECT'], value: 0, default: true }
          ]
          for (let i = 0; i < res.length; i++) {
            this.states.push({
              name: res[i].StateName,
              title: res[i].StateName,
              value: res[i].StateID,
              default: false
            })
          }
        })
      });
  }

  //Attach File
  setFiles(files) {
    this.attachFiles = files;
  }
  //Feature Image
  setFeatureFile(file) {
    this.featuredImage = file;
  }
  //Set Tag
  setTags(tags) {
    this.tags = tags;
  }
  //Set Event Type
  setEventType(item) {
    this.eventTypeID = item.value;
    for (let i = 0; i < this.eventtypes.length; i++) {
      if (this.eventtypes[i].value == item.value) {
        this.eventtypes[i].default = true;
      } else {
        this.eventtypes[i].default = false;
      }
    }
  }

  //Set Coutry
  setCountry(item) {
    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].value == item.value) {
        this.countries[i].default = true;
      } else {
        this.countries[i].default = false;
      }
    }
    this.CountryID = item.value;
    this.getStates(item.value);
  }
  //Set State
  setState(item) {
    for (let i = 0; i < this.states.length; i++) {
      if (this.states[i].value == item.value) {
        this.states[i].default = true;
      } else {
        this.states[i].default = false;
      }
    }
    this.StateID = item.value;
  }
  //Set Repeat
  setRepeat(item) {
    for (let i = 0; i < this.repeats.length; i++) {
      if (this.repeats[i].value == item.value) {
        this.repeats[i].default = true;
      } else {
        this.repeats[i].default = false;
      }
    }
    this.Frequency = item.value;
    this.IsRepeat = (item.value != 0);
  }
  //Set Alert
  setAlert(item) {
    for (let i = 0; i < this.alerts.length; i++) {
      if (this.alerts[i].value == item.value) {
        this.alerts[i].default = true;
      } else {
        this.alerts[i].default = false;
      }
    }
    switch (item.value) {
      case "0":
        this.ReminderType = 0;
        this.ReminderTime = 0;
        break;
      case "1":
        this.ReminderType = 1;
        this.ReminderTime = 15;
        break;
      case "2":
        this.ReminderType = 1;
        this.ReminderTime = 30;
        break;
      case "3":
        this.ReminderType = 1;
        this.ReminderTime = 45;
        break;
      case "4":
        this.ReminderType = 2;
        this.ReminderTime = 1;
        break;
      case "5":
        this.ReminderType = 2;
        this.ReminderTime = 2;
        break;
      case "6":
        this.ReminderType = 2;
        this.ReminderTime = 3;
        break;
      case "7":
        this.ReminderType = 3;
        this.ReminderTime = 1;
        break;
      case "8":
        this.ReminderType = 3;
        this.ReminderTime = 2;
        break;
    }
  }
  //Set Calendar
  setCalendar(item) {
    this.spaceId = item.value;
    for (let i = 0; i < this.calendars.length; i++) {
      if (this.calendars[i].value == item.value) {
        this.calendars[i].default = true;
      } else {
        this.calendars[i].default = false;
      }
    }
    if (item.value == 0) {
      this.IsPrivate = true;
    } else if (item.value == 1) {
      this.IsPrivate = false;
    }
    if (item.value == -1) return;
    this.loadDependancies(item.value);
  }
  //Set Showas
  setShowAs(item) {
    for (let i = 0; i < this.showas.length; i++) {
      if (this.showas[i].value == item.value) {
        this.showas[i].default = true;
      } else {
        this.showas[i].default = false;
      }
    }
    if (item.value == 0)
      this.IsBusy = true;
    else if (item.value == 1)
      this.IsBusy = false;
  }
  //Set Guests
  setGuests(items) {
    this.guests = items;
  }

  setResource(items) {
    this.s_resources = [];
    for (let i = 0; i < items.length; i++)
      this.s_resources.push(items[i].value);
  }

  private presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  private formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours < 10 ? '0' + hours : hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  cancel() {
    this.navCtrl.pop();
  }
  save() {
    if (this.eventTitle == undefined) {
      let yOffset = document.getElementById('headline').offsetTop;
      this.content.scrollTo(0, yOffset - 50, 1000);
      this.translate.get("TOAST.TITLEEMPTY").subscribe(res => {
        this.presentToast(res);
      });
      return;
    } else if (this.spaceId == -1) {
      this.translate.get("TOAST.CANENDAREMPTY").subscribe(res => {
        this.presentToast(res);
      });
      return;
    } else if (this.eventTypeID == 0 || this.eventTypeID == -1) {
      let yOffset = document.getElementById('location').offsetTop;
      this.content.scrollTo(0, yOffset - 50, 1000);
      this.translate.get("TOAST.LOCATIONEMPTY").subscribe(res => {
        this.presentToast(res);
      });
      return;
    }

    //let date1 = new Date(new Date().getTime() + new Date(this.fromDate).getTime() - new Date(this.fromDate1).getTime() + new Date().getTimezoneOffset() * 60000);
    let date1 = new Date(new Date(this.fromDate).getTime() + new Date().getTimezoneOffset() * 60000);
    //let date2 = new Date(new Date().getTime() + new Date(this.toDate).getTime() - new Date(this.toDate1).getTime() + new Date().getTimezoneOffset() * 60000);
    let date2 = new Date(new Date(this.toDate).getTime() + new Date().getTimezoneOffset() * 60000);

    let newUsers = [];
    for (let i = 0; i < this.guests.length; i++) {
      if (this.guests[i] == localStorage.getItem('UserID')) {
        newUsers.push({
          "UserID": this.guests[i],
          "IsCommunityUser": true,
          "Organizer": true
        })
      } else {
        newUsers.push({
          "UserID": this.guests[i],
          "IsCommunityUser": true,
          "Organizer": false
        })
      }
    }
    let body = {
      'Title': this.eventTitle,
      'StartDateISO': date1.toISOString().split('T')[0] + ' ' + this.formatAMPM(new Date(date1.toISOString())),
      'EndDateISO': date2.toISOString().split('T')[0] + ' ' + this.formatAMPM(new Date(date2.toISOString())),
      'EventTypeID': this.eventTypeID,
      'Description': this.description,
      "VenueName": this.eventLocation,
      "SpaceID": this.spaceId,
      'Frequency': this.Frequency,
      'IsRepeat': this.IsRepeat,
      'IsAllDay': this.IsAllDay,
      'IsPrivate': this.IsPrivate,
      'IsBusy': this.IsBusy,
      'Keywords': this.tags.join(','),
      'ResourceIDCSV': this.s_resources.join(','),
      'CountryID': this.CountryID,
      'StateID': this.StateID,
      'NewUsers': newUsers
    }

    const saveloader = this.loadingCtrl.create({
    });
    saveloader.present();

    this.eventProvider.crateEvent(body)
      .finally(() => {
        saveloader.dismiss();
      })
      .subscribe(res => {
        console.log(res);
        if (res.IsError == false) {
          if(res.ResponseMessage == 'ToBePublished') {
            this.translate.get("TOAST.PENDING").subscribe(res => {
              this.presentToast(res);
            });
          } else {
            this.translate.get("TOAST.CREATED").subscribe(res => {
              this.presentToast(res);
            });
          }
          if (this.ReminderTime != 0 && this.ReminderType != 0) {
            let alertbody = {
              'EntityType': 5,
              'EntityID': res.ResponseData.EventID,
              'ReminderType': this.ReminderType,
              'ReminderTime': this.ReminderTime,
              'UserID': res.ResponseData.UserID
            }
            this.eventProvider.addAlert(JSON.stringify(alertbody))
              .finally(() => {
                this.navToList(res.ResponseData.EventID);
              })
              .subscribe(res => {
              })
          } else {
            this.navToList(res.ResponseData.EventID);
          }

          this.appCenterAnalytics.isEnabled().then((b) => {
            if (b) {
              this.appCenterAnalytics.trackEvent('Event Create Success.', { id: res.ResponseData.EventID, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Event Create Event tracked');
              });
            }
          })
        } else {
          this.translate.get("TOAST.ERROR").subscribe(res => {
            this.presentToast(res);
          });

          this.appCenterAnalytics.isEnabled().then((b) => {
            if (b) {
              this.appCenterAnalytics.trackEvent('Event Creation Failed.', { error: 'Error', userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Event Creation Failed Event F');
              });
            }
          })
        }
      })
  }
  navToList(id) {
    let active = this.navCtrl.getActive();
    this.navCtrl.push('events', {
      id: id
    })
    this.navCtrl.removeView(active);
  }

  keyboardSubscription: any;

  onTagFocus() {
    //this.content.scrollToTop(500);
    this.keyboardSubscription = this.keyboard.onKeyboardShow().subscribe(e => {
      setTimeout(() => {
        this.content.scrollToBottom(500); // 500 for a smooth slow scroll after the Keyboard opens, but you can change this
      }, 50);
    });
  }
  onTagBlur() {
    this.keyboardSubscription.unsubscribe();
  }

  datechange() {
    if (new Date(this.fromDate) > new Date(this.toDate)) {
      this.toDate = this.fromDate;
    }
  }
}
