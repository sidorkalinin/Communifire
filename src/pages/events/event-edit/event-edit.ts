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
 * Generated class for the EventEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'event-edit',
  segment: 'event-edit'
})
@Component({
  selector: 'page-event-edit',
  templateUrl: 'event-edit.html',
})
export class EventEditPage implements OnInit {
  contentId: any;
  contentDetail: any;
  spaceId: any;
  eventTitle: any;
  eventLocation: any;
  // fromDate: any = new Date();
  // fromTime: any = new Date();
  // toDate: any = new Date();
  // toTime: any = new Date();
  fromDate: any;
  toDate: any;
  eventTypeID: any;
  description: any = '';
  attachFiles: any = [];
  tags: any = [];
  featuredImage: any;
  w_attend: any;
  organization: any;
  telephonenumber: any;
  website: any;

  isAdditional: boolean = true;

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
  selectedresources: any = [];

  countries: any = [
  ];
  states: any = [
  ];
  eventtypes: any = [];
  repeats: any = [
  ];
  alerts: any = [
  ];
  calendars: any = [
  ]
  showas: any = [
  ]

  froalaOption: any = {
    events:{
      'froalaEditor.focus': (e, editor) => this.froalafocus(e, editor),
      'froalaEditor.blur': (e, editor) => this.froalablur(e, editor)
    },
    placeholderText: ''
  }

  froalafocus(e, editor){
    console.log('Focus');
    this.keyboardSubscription = this.keyboard.onKeyboardShow().subscribe();
  }
  froalablur(e, editor){
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
    this.contentId = this.navParams.get('contentId');
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
    
    // this.fromDate = new Date().toISOString();
    // this.toDate = new Date().toISOString();

    this.translate.get(["COMMONS.NOSELECT", "COMMONS.NEVER", "COMMONS.EVERYDAY", "COMMONS.EVERYWEEK", "COMMONS.EVERYMONTH", "COMMONS.EVERYQUARTER",
        "COMMONS.EVERYYEAR", "COMMONS.NONE", "COMMONS.MINUTESBEFORE", "COMMONS.HOURBEFORE", "COMMONS.HOURSBEFORE", "COMMONS.DAYBEFORE", "COMMONS.DAYSBEFORE",
        "COMMONS.SELECTCALENDAR", "COMMONS.BUSY", "COMMONS.FREE", "COMMONS.SPACECALENDAR", "COMMONS.MYCALENDAR"
    ]).subscribe((res) => {
      this.countries = [
        { name: res['COMMONS.NOSELECT'], title: res['COMMONS.NOSELECT'], value: 0, default: true}
      ];
      this.states = [
        { name: res['COMMONs.NOSELECT'], title: res['COMMONS.NOSELECT'], value: 0, default: true}
      ];
      this.eventtypes = [];
      this.repeats = [
        { name: res['COMMONS.NEVER'], title: res['COMMONS.NEVER'], value: 0, default: this.Frequency == 0 },
        { name: res['COMMONS.EVERYDAY'], title: res['COMMONS.EVERYDAY'], value: 1, default: this.Frequency == 1 },
        { name: res['COMMONS.EVERYWEEK'], title: res['COMMONS.EVERYWEEK'], value: 2, default: this.Frequency == 2 },
        { name: res['COMMONS.EVERYMONTH'], title: res['COMMONS.EVERYMONTH'], value: 4, default: this.Frequency == 4 },
        { name: res['COMMONS.EVERYQUARTER'], title: res['COMMONS.EVERYQUARTER'], value: 8, default: this.Frequency == 8 },
        { name: res['COMMONS.EVERYYEAR'], title: res['COMMONS.EVERYYEAR'], value: 16, default: this.Frequency == 16 },    
      ]
      this.alerts = [
        { name: res['COMMONS.NONE'], title: res['COMMONS.NONE'], value:'0', default: true },
        { name: '15 '+res['COMMONS.MINUTESBEFORE'], title: '15 '+res['COMMONS.MINUTESBEFORE'], value: '1', default: false },
        { name: '30 '+res['COMMONS.MINUTESBEFORE'], title: '30 '+res['COMMONS.MINUTESBEFORE'], value: '2', default: false },
        { name: '45 '+res['COMMONS.MINUTESBEFORE'], title: '45 '+res['COMMONS.MINUTESBEFORE'], value: '3', default: false },
        { name: '1 '+res['COMMONS.HOURBEFORE'], title: '1 '+res['COMMONS.HOURBEFORE'], value: '4', default: false },
        { name: '2 '+res['COMMONS.HOURSBEFORE'], title: '2 '+res['COMMONS.HOURSBEFORE'], value: '5', default: false },
        { name: '3 '+res['COMMONS.HOURSBEFORE'], title: '3 '+res['COMMONS.HOURSBEFORE'], value: '6', default: false },
        { name: '1 '+res['COMMONS.DAYBEFORE'], title: '1 '+res['COMMONS.DAYBEFORE'], value: '7', default: false },
        { name: '2 '+res['COMMONS.DAYSBEFORE'], title: '2 '+res['COMMONS.DAYSBEFORE'], value: '8', default: false }
      ]
      this.calendars = [        
        { name: res['COMMONS.MYCALENDAR'], title: res['COMMONS.MYCALENDAR'], value: '0', default: true},
        { name: res['COMMONS.SPACECALENDAR'], title: res['COMMONS.SPACECALENDAR'], value: '1', default: false }
      ]
      this.showas = [
        { name: res['COMMONS.BUSY'], title: res['COMMONS.BUSY'], value: '0', default: this.IsBusy },
        { name: res['COMMONS.FREE'], title: res['COMMONS.FREE'], value: '1', default: this.IsBusy}
      ]
    });
  }

  isIphoneX: boolean = false;
  
  ngOnInit() {
    this.getUserByContentId();
  }

  myISOString(date) {
    let d = new Date(date);
    var tzo = -d.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return d.getFullYear() +
        '-' + pad(d.getMonth() + 1) +
        '-' + pad(d.getDate()) +
        'T' + pad(d.getHours()) +
        ':' + pad(d.getMinutes()) +
        ':' + pad(d.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
  }
  
  getUserByContentId() {
    this.translate.get("COMMONS.LOADING").subscribe(res => {
      let loading = this.loadingCtrl.create({
        content: res
      });
      loading.present();
  
      this.eventProvider.getEventByID(this.contentId)
      .finally(() => loading.dismiss())
      .subscribe(res => {
        this.contentDetail = res.ResponseData;
        console.log(this.contentDetail);
        this.spaceId = this.contentDetail.SpaceID;
        this.eventTitle = this.contentDetail.Title;
        this.eventLocation = this.contentDetail.VenueName;
        this.fromDate = this.myISOString(this.contentDetail.StartDateISO);
        this.toDate = this.myISOString(this.contentDetail.EndDateISO);

        this.description = this.contentDetail.Description;

        this.eventTypeID = this.contentDetail.EventTypeID;
        this.Frequency = this.contentDetail.Frequency;
        this.IsRepeat = this.contentDetail.IsRepeat;
        this.IsAllDay = this.contentDetail.IsAllDay;
        this.IsBusy = this.contentDetail.IsBusy;
        this.IsPrivate = this.contentDetail.IsPrivate;
        this.tags = this.contentDetail.Keywords.split(',');
        if(this.tags.length == 1 && this.tags[0] == ''){
          this.tags = [];
        }
        this.s_resources = this.contentDetail.ResourceIDCSV.split(',');

        if(this.contentDetail.Reminders.length == 0){
          this.ReminderTime = 0;
          this.ReminderType = 0;
        }else{
          this.ReminderType = this.contentDetail.Reminders[0].ReminderType;
          this.ReminderTime = this.contentDetail.Reminders[0].ReminderTime;
        }

        this.CountryID = this.contentDetail.CountryID;
        this.StateID = this.contentDetail.StateID;

        for(let i = 0; i < this.contentDetail.Users.length; i++){
          this.guests.push(this.contentDetail.Users[i].UserID);
        }

        // this.getEventTypes(this.spaceId);
        // this.getEventResources(this.spaceId);
        this.getCountries();
        this.getStates(this.CountryID);
        this.setArray();
        this.loadCalendar();
      })
    });
  }

  loadDependancies(id: any) {
    this.spaceId = id;
    this.getEventTypes(id);
    this.getEventResources(id);
  }

  loadCalendar(){
    this.getMySpaces()
    .finally(() => {})
    .subscribe(spaces => {
      let allSpaces = [];
      spaces.map(space => {
        if (space.SpaceVisibility == 0){
          return 0;
        }
        allSpaces.push(space);
      });
      this.translate.get(["COMMONS.MYCALENDAR"]).subscribe((res1) => {
        this.calendars = [
          { name: res1['COMMONS.MYCALENDAR'], title: res1['COMMONS.MYCALENDAR'], value: '0', default: this.spaceId == 0},
        ];
        allSpaces.forEach(v => {
          this.calendars.push({name: this.toTitleCase(v.SpaceName), title: this.toTitleCase(v.SpaceName), value: v.SpaceID, default: this.spaceId == v.SpaceID});
        })
      })      
    })    
  }

  private toTitleCase(str)
  {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  private getMySpaces () {
    return this.spacesProvider.getMySpaces();
  }

  setArray(){
    this.translate.get(["COMMONS.NOSELECT", "COMMONS.NEVER", "COMMONS.EVERYDAY", "COMMONS.EVERYWEEK", "COMMONS.EVERYMONTH", "COMMONS.EVERYQUARTER",
        "COMMONS.EVERYYEAR", "COMMONS.NONE", "COMMONS.MINUTESBEFORE", "COMMONS.HOURBEFORE", "COMMONS.HOURSBEFORE", "COMMONS.DAYBEFORE", "COMMONS.DAYSBEFORE",
        "COMMONS.SELECTCALENDAR", "COMMONS.BUSY", "COMMONS.FREE", "COMMONS.SPACECALENDAR", "COMMONS.MYCALENDAR"
    ]).subscribe((res) => {
      this.repeats = [
        { name: res['COMMONS.NEVER'], title: res['COMMONS.NEVER'], value: 0, default: this.Frequency == 0 },
        { name: res['COMMONS.EVERYDAY'], title: res['COMMONS.EVERYDAY'], value: 1, default: this.Frequency == 1 },
        { name: res['COMMONS.EVERYWEEK'], title: res['COMMONS.EVERYWEEK'], value: 2, default: this.Frequency == 2 },
        { name: res['COMMONS.EVERYMONTH'], title: res['COMMONS.EVERYMONTH'], value: 4, default: this.Frequency == 4 },
        { name: res['COMMONS.EVERYQUARTER'], title: res['COMMONS.EVERYQUARTER'], value: 8, default: this.Frequency == 8 },
        { name: res['COMMONS.EVERYYEAR'], title: res['COMMONS.EVERYYEAR'], value: 16, default: this.Frequency == 16 },    
      ];
      this.alerts = [
        { name: res['COMMONS.NONE'], title: res['COMMONS.NONE'], value:'0', default: this.ReminderTime == 0 && this.ReminderType == 0 },
        { name: '15 '+res['COMMONS.MINUTESBEFORE'], title: '15 '+res['COMMONS.MINUTESBEFORE'], value: '1', default: this.ReminderTime == 15 && this.ReminderType == 1 },
        { name: '30 '+res['COMMONS.MINUTESBEFORE'], title: '30 '+res['COMMONS.MINUTESBEFORE'], value: '2', default: this.ReminderTime == 30 && this.ReminderType == 1 },
        { name: '45 '+res['COMMONS.MINUTESBEFORE'], title: '45 '+res['COMMONS.MINUTESBEFORE'], value: '3', default: this.ReminderTime == 45 && this.ReminderType == 1 },
        { name: '1 '+res['COMMONS.HOURBEFORE'], title: '1 '+res['COMMONS.HOURBEFORE'], value: '4', default: this.ReminderTime == 1 && this.ReminderType == 2 },
        { name: '2 '+res['COMMONS.HOURSBEFORE'], title: '2 '+res['COMMONS.HOURSBEFORE'], value: '5', default: this.ReminderTime == 2 && this.ReminderType == 2 },
        { name: '3 '+res['COMMONS.HOURSBEFORE'], title: '3 '+res['COMMONS.HOURSBEFORE'], value: '6', default: this.ReminderTime == 3 && this.ReminderType == 2 },
        { name: '1 '+res['COMMONS.DAYBEFORE'], title: '1 '+res['COMMONS.DAYBEFORE'], value: '7', default: this.ReminderTime == 1 && this.ReminderType == 3 },
        { name: '2 '+res['COMMONS.DAYSBEFORE'], title: '2 '+res['COMMONS.DAYSBEFORE'], value: '8', default: this.ReminderTime == 2 && this.ReminderType == 3 }
      ];
      this.showas = [
        { name: res['COMMONS.BUSY'], title: res['COMMONS.BUSY'], value: '0', default: this.IsBusy == true },
        { name: res['COMMONS.FREE'], title: res['COMMONS.FREE'], value: '1', default: this.IsBusy == false}
      ]
    });
  }

  getEventResources(id){
    this.eventProvider.getEventResources({spaceid: id})
      .finally(() => {})
      .subscribe(res =>{
        for(let i = 0; i < res.ResponseData.length; i++){
          this.resources.push({
            name: res.ResponseData[i].ResourceName,
            title: res.ResponseData[i].ResourceName,
            value: res.ResponseData[i].ResourceID,
            src: res.ResponseData[i].ImageURL,
            selected: this.s_resources.indexOf(String(res.ResponseData[i].ResourceID))>-1
          })          
        }
        this.selectedresources = this.resources.filter(v =>{
          return v.selected;
        })
        this.setResource(this.selectedresources);
      })
  }

  getEventTypes(id){
    if(id == undefined) return;
    this.eventProvider.getEventTypes(id)
      .finally(()=>{
      })
      .subscribe(res=>{
        if(res.IsError == false){
          for(var i = 0; i < res.ResponseData.length; i++){
            this.eventtypes.push({ name: res.ResponseData[i].EventTypeName, title: res.ResponseData[i].EventTypeName, value: res.ResponseData[i].EventTypeID, default: res.ResponseData[i].EventTypeID == this.eventTypeID });
          }
        }
      })
  }

  getCountries(){
    this.eventProvider.getCountries()
      .finally(() => {        
      })
      .subscribe(res => {
        this.translate.get(["COMMONS.NOSELECT"]).subscribe((res1) => {
          this.countries = [
            { name: res1['COMMONS.NOSELECT'], title: res1['COMMONS.NOSELECT'], value: 0, default: this.CountryID == 0 }
          ]
          for(let i = 0; i < res.length; i++){
            this.countries.push({
              name: res[i].CountryName,
              title: res[i].CountryName,
              value: res[i].CountryID,
              default: res[i].CountryID == this.CountryID
            })
          }
        })        
      })
  }

  getStates(id){
    this.eventProvider.getStates(id)
      .finally(() =>{        
      })
      .subscribe(res => {
        this.translate.get(["COMMONS.NOSELECT"]).subscribe((res1) => {
          this.states = [
            { name: res1['COMMONS.NOSELECT'], title: res1['COMMONS.NOSELECT'], value: 0, default: this.StateID == 0 }
          ]
          for(let i = 0; i < res.length; i++){
            this.states.push({
              name: res[i].StateName,
              title: res[i].StateName,
              value: res[i].StateID,
              default: res[i].StateID == this.StateID
            })
          }
        })
      })
  }

  showAdditional(){    
    this.isAdditional = !this.isAdditional;
  }

  //Attach File
  setFiles(files) {
    this.attachFiles = files;
  }
  //Feature Image
  setFeatureFile(file){
    this.featuredImage = file;
  }
  //Set Tag
  setTags(tags){
    this.tags = tags;
  }
  //Set Event Type
  setEventType(item){
    this.eventTypeID = item.value;
    for(let i = 0; i < this.eventtypes.length; i++){
      if(this.eventtypes[i].value == item.value){
        this.eventtypes[i].default = true;
      }else{
        this.eventtypes[i].default = false;
      }
    }
  }

  //Set Coutry
  setCountry(item){
    for(let i = 0; i < this.countries.length; i++){
      if(this.countries[i].value == item.value){
        this.countries[i].default = true;
      }else{
        this.countries[i].default = false;
      }
    }
    this.CountryID = item.value;    
    this.getStates(item.value);    
  }
  //Set State
  setState(item){
    for(let i = 0; i < this.states.length; i++){
      if(this.states[i].value == item.value){
        this.states[i].default = true;
      }else{
        this.states[i].default = false;
      }
    }
    this.StateID = item.value;
  }
  //Set Repeat
  setRepeat(item){
    for(let i = 0; i < this.repeats.length; i++){
      if(this.repeats[i].value == item.value){
        this.repeats[i].default = true;
      }else{
        this.repeats[i].default = false;
      }
    }
    this.Frequency = item.value;
    this.IsRepeat = (item.value != 0);
  }
  //Set Alert
  setAlert(item){
    for(let i = 0; i < this.alerts.length; i++){
      if(this.alerts[i].value == item.value){
        this.alerts[i].default = true;
      }else{
        this.alerts[i].default = false;
      }
    }
    switch(item.value){
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
  setCalendar(item){
    for(let i = 0; i < this.calendars.length; i++){
      if(this.calendars[i].value == item.value){
        this.calendars[i].default = true;
      }else{
        this.calendars[i].default = false;
      }
    }
    
    if(item.value == 0){
      this.IsPrivate = false;      
    }else if(item.value == 1){
      this.IsPrivate = true;
    }
    if(item.value == -1) return;
    this.loadDependancies(item.value);
  }
  //Set Showas
  setShowAs(item){
    for(let i = 0; i < this.showas.length; i++){
      if(this.showas[i].value == item.value){
        this.showas[i].default = true;
      }else{
        this.showas[i].default = false;
      }
    }
    if(item.value == 0)
      this.IsBusy = true;
    else if(item.value == 1)
      this.IsBusy = false;
  }
  //Set Guests
  setGuests(items){
    this.guests = items;
  }

  setResource(items){
    this.s_resources = [];
    for(let i = 0; i < items.length; i++)
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
    hours = hours ? hours < 10? '0'+hours: hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  
  cancel(){
    this.navCtrl.pop();
  }

  save(){
    if(this.eventTitle == undefined){
      let yOffset = document.getElementById('headline').offsetTop;
      this.content.scrollTo(0, yOffset-50, 1000);
      this.translate.get("TOAST.TITLEEMPTY").subscribe(res => {
        this.presentToast(res);
      });
      return;
    } else if(this.eventTypeID == 0 || this.eventTypeID == -1){
      let yOffset = document.getElementById('location').offsetTop;
      this.content.scrollTo(0, yOffset-50, 1000);
      this.translate.get("TOAST.LOCATIONEMPTY").subscribe(res => {
        this.presentToast(res);
      });
      return;
    }
    //this.contentDetail.Users

    let newUsers = [];
    for(let i = 0; i < this.guests.length; i++){
      let b = false;
      for(let j = 0; j < this.contentDetail.Users.length; j++){
        if(Number(this.contentDetail.Users[j].UserID) == Number(this.guests[i])) b = true;
      }
      
      if(b) continue;

      if(this.guests[i] == localStorage.getItem('UserID')){
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

    let removeUsers = [];
    for(let i = 0; i < this.contentDetail.Users.length; i++){
      let b = false;
      for(let j = 0; j < this.guests.length; j++){        
        if(Number(this.contentDetail.Users[i].UserID) == Number(this.guests[j])) b = true;
      }
      if(!b) continue;
      removeUsers.push({
        "UserID": this.contentDetail.Users[i].UserID,
        "IsCommunityUser": true,
      })
    }

    let date1 = new Date(new Date(this.fromDate).getTime() + new Date().getTimezoneOffset() * 60000);
    let date2 = new Date(new Date(this.toDate).getTime() + new Date().getTimezoneOffset() * 60000);

    let body = {
      'Title': this.eventTitle,
      'StartDateISO': date1.toDateString().split('T')[0] + ' ' + this.formatAMPM(new Date(date1.toDateString())),
      'EndDateISO': date2.toDateString().split('T')[0] + ' ' + this.formatAMPM(new Date(date2.toDateString())),
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
      'NewUsers': newUsers,
      "UsersToBeDeleted": removeUsers
    }

    console.log(body);
    
    const saveloader = this.loadingCtrl.create({      
    });      
    saveloader.present();

    this.eventProvider.updateEvent(this.contentId, JSON.stringify(JSON.stringify(body)))
      .finally( () => {

      })
      .subscribe(res => {
        this.translate.get("TOAST.UPDATED").subscribe(res => {
          this.presentToast(res);
        });        
        saveloader.dismiss();
        this.navToList(res.ResponseData.EventID);
        console.log(res);
        if(res.IsError == false){
          if(this.ReminderTime != 0 && this.ReminderType != 0){
            let alertbody = {
              'EntityType': 5,
              'EntityID': res.ResponseData.EventID,
              'ReminderType': this.ReminderType,
              'ReminderTime': this.ReminderTime,
              'UserID': res.ResponseData.UserID
            }
            this.eventProvider.addAlert(JSON.stringify(alertbody))
            .finally(()=>{
            })
            .subscribe(res=>{
            })
          }

          this.appCenterAnalytics.isEnabled().then( (b) => {
            if(b){
              this.appCenterAnalytics.trackEvent('Event Edit Success.', { id: res.ResponseData.EventID, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Event Edit Event tracked');
              });
            }
          })
        }else{
          this.navToList(res.ResponseData.EventID);
        }
      })
    }
  navToList(id){
    //this.navCtrl.setRoot("event-list");
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();
    this.navCtrl.push('events', {
      id: id
    })
    this.navCtrl.removeView(active);
    this.navCtrl.removeView(parent);
  }

  keyboardSubscription: any;

  onTagFocus(){
    //this.content.scrollToTop(500);
    this.keyboardSubscription = this.keyboard.onKeyboardShow().subscribe(e => {
      setTimeout(() => {
        this.content.scrollToBottom(500); // 500 for a smooth slow scroll after the Keyboard opens, but you can change this
      }, 50);
    });
  }
  onTagBlur(){
    this.keyboardSubscription.unsubscribe();
  }

  datechange(){
    if(new Date(this.fromDate) > new Date(this.toDate)){
      this.toDate = this.fromDate;
    }      
  }
}
