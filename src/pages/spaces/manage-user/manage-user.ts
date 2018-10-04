import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams, InfiniteScroll, NavController, Refresher, ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';

import { SpacesProvider } from '../../../providers/spaces';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ManageUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage({
  name: 'manage-user',
})
@Component({
  selector: 'page-manage-user',
  templateUrl: 'manage-user.html',
})
export class ManageUserPage {
  spaceId = this.navParams.get('id');
  communityUrl = localStorage.getItem('community_url');
  isLoading: boolean = false;
  isLoadingUsers: boolean = false;
  isLoadingRequests: boolean = false;
  spaceView: number = 0;
  searchtext = '';
  space;
  spaceUsers = [];
  spaceRequests = [];
  spaceRequestUsers = [];
  private peoplePage = 1;
  private requestPage = 1;

  buttons = [    
    {
      icon: 'ios-contact',
      text: 'EXTRA.REQUEST'
    }, {
      icon: 'ios-people',
      text: 'PEOPLE.HEADING'
    }
  ];

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private spacesProvider: SpacesProvider,
    private navCtrl: NavController,
    private appCenterAnalytics: AppCenterAnalytics,
    public translate: TranslateService,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageUserPage');
    this.getSpaceRequests();
  }

  switchSpaceView(view) {
    this.spaceView = view.index;

    if (this.spaceView === 0) {
      this.getSpaceRequests();
    } else if (this.spaceView === 1 && !this.spaceUsers.length) {
      this.getSpaceUsers();
    }
  }

  getSpaceRequests(infiniteScroll?: InfiniteScroll) {
    if (infiniteScroll) {
      ++this.requestPage;
    }
    if(!infiniteScroll && this.spaceRequestUsers.length > 0) {
      return;
    }
    if (infiniteScroll && this.spaceRequestUsers.length > 0 && this.spaceRequestUsers.length < 15) {
      infiniteScroll.enable(false);
      return;
    }


    // Fetch Space user by Id
    this.isLoadingRequests = true;
    this.spacesProvider.getSpaceRequests(this.spaceId, this.requestPage, 15)
      .finally(() => {
        if (!infiniteScroll) {
          this.isLoadingRequests = false
        }
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
      .do(response => {
        if (infiniteScroll && !response.ResponseData.length) {
          infiniteScroll.enable(false);
        }
      })
      .subscribe(res => {
        console.log(res.ResponseData);
        if(res.ResponseData && res.ResponseData.length > 0) {
          this.spaceRequestUsers = this.spaceRequestUsers.concat(res.ResponseData);
        }        
      });
  }

  getSpaceUsers(infiniteScroll?: InfiniteScroll) {
    if (infiniteScroll) {
      ++this.peoplePage;
    }
    if(!infiniteScroll && this.spaceUsers.length > 0) {
      return;
    }
    if (this.spaceUsers.length > 0 && this.spaceUsers.length < 15) {
      infiniteScroll.enable(false);
      return;
    }

    // Fetch Space user by Id
    this.isLoadingUsers = true
    this.spacesProvider.getSpaceUsers(this.spaceId, this.peoplePage, 15)
      .finally(() => {
        if (!infiniteScroll) {
          this.isLoadingUsers = false
        }
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
      .do(response => {
        if (infiniteScroll && !response.ResponseData.length) {
          infiniteScroll.enable(false);
        }
      })
      .subscribe(res => {
        if(res.ResponseData && res.ResponseData.length > 0) {
          this.spaceUsers = this.spaceUsers.concat(res.ResponseData);
        }
        if (res.ResponseData.length < 15 && infiniteScroll) {
          infiniteScroll.enable(false);
        }
      });
  }

  approve(person: any) {
    const saveloader = this.loadingCtrl.create({
    });      
    saveloader.present();
    this.spacesProvider.setMemberShip(this.spaceId, person.UserID, true)
      .finally(()=>{
        saveloader.dismiss();
      })
      .subscribe(res => {
        if(res.IsError == false && res.ResponseData == true) {          
          this.spaceRequestUsers = this.spaceRequestUsers.filter(v => {
            return v.UserID != person.UserID;
          })
          this.translate.get("EXTRA.REQUEST_ACCEPTED").subscribe(res => {
            this.presentToast(res);
          });
        } else {
          this.translate.get("TOAST.ERROR").subscribe(res => {
            this.presentToast(res);
          });
        }
      })
  }

  decline(person: any) {
    const saveloader = this.loadingCtrl.create({
    });      
    saveloader.present();
    this.spacesProvider.setMemberShip(this.spaceId, person.UserID, false)
      .finally(()=>{
        saveloader.dismiss();
      })
      .subscribe(res => {
        if(res.IsError == false && res.ResponseData == true) {
          this.spaceRequestUsers = this.spaceRequestUsers.filter(v => {
            return v.UserID != person.UserID;
          })
          this.translate.get("EXTRA.REQUEST_REJECTED").subscribe(res => {
            this.presentToast(res);
          });
        } else {
          this.translate.get("TOAST.ERROR").subscribe(res => {
            this.presentToast(res);
          });
        }
      })
  }

  private presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
