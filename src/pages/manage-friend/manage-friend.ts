import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams, InfiniteScroll, NavController, Refresher, ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';

import { TranslateService } from '@ngx-translate/core';
import { PeopleProvider } from '../../providers/people';

/**
 * Generated class for the ManageFriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'manage-friend',
})
@Component({
  selector: 'page-manage-friend',
  templateUrl: 'manage-friend.html',
})
export class ManageFriendPage implements OnInit {
  communityUrl = localStorage.getItem('community_url');
  isLoading: boolean = false;
  isLoadingFriends: boolean = false;
  isLoadingRequests: boolean = false;
  friendView: number = this.navParams.get('isRequest')?1: 0;
  searchtext = '';
  issearch = false;
  space;
  userFriends = [];
  searchFriends = [];
  private cachePeople = [];
  friendRequestUsers = [];
  private peoplePage = 1;
  private requestPage = 1;

  buttons = [    
    {
      icon: 'ios-people',
      text: 'EXTRA.CONNECTIONS'
    }, {
      icon: 'ios-contact',
      text: 'EXTRA.CONNECTIONREQUEST'
    }, 
  ];

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private peopleProvider: PeopleProvider,
    private navCtrl: NavController,
    public translate: TranslateService,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
  ) {
  }

  ionViewDidLoad() {
    
  }
  ngOnInit() {
    if(this.friendView == 0) {
      this.getFriends();
    } else {
      this.getRequests();
    }
  }

  switchFriendView(view) {
    this.friendView = view.index;
    if (this.friendView === 0) {
      this.getFriends();
    } else if (this.friendView === 1) {      
      this.getRequests();      
    }
  }

  getRequests(infiniteScroll?: InfiniteScroll) {
    if (infiniteScroll) {
      ++this.requestPage;
    }
    if(!infiniteScroll && this.friendRequestUsers.length > 0) {
      return;
    }

    if (infiniteScroll && this.friendRequestUsers.length > 0 && this.friendRequestUsers.length < 15) {
      infiniteScroll.enable(false);
      return;
    }


    // Fetch Space user by Id
    this.isLoadingRequests = true;
    this.peopleProvider.getRequests(localStorage.getItem('UserID'), this.requestPage, 15)
      .finally(() => {
        this.isLoadingRequests = false
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
          this.friendRequestUsers = this.friendRequestUsers.concat(res.ResponseData);
        } 
      });
  }

  getFriends(infiniteScroll?: InfiniteScroll) {
    if (infiniteScroll) {
      ++this.peoplePage;
    }
    if(!infiniteScroll && this.userFriends.length > 0) {
      return;
    }

    if (infiniteScroll && this.userFriends.length > 0 && this.userFriends.length < 15) {
      infiniteScroll.enable(false);
      return;
    }

    this.isLoadingFriends = true;
    // Fetch Space user by Id
    this.peopleProvider.getFriends(localStorage.getItem('UserID'), this.peoplePage, 15)
      .finally(() => {
        if (!infiniteScroll) {
          this.isLoadingFriends = false
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
          this.userFriends = this.userFriends.concat(res.ResponseData);
          this.searchFriends = this.userFriends;
          if (res.ResponseData.length < 15 && infiniteScroll) {
            infiniteScroll.enable(false);
          }
        } else {
          infiniteScroll.enable(false);
        }
      });
  }

  search(name: any) {
    console.log(name);
    if(name.length == 0) {
      this.searchFriends = this.userFriends;
    } else {
      this.searchFriends = this.userFriends.filter(v => {
        return v.UserInfoDisplayName.toLowerCase().indexOf(name.toLowerCase()) !== -1 
      })
    }
    this.issearch = false;
  }

  approve(person: any) {
    const saveloader = this.loadingCtrl.create({
    });      
    saveloader.present();
    this.peopleProvider.aproveFriend(localStorage.getItem('UserID'), person.UserID)
      .finally(() => {
        saveloader.dismiss();
      })
      .subscribe(res => {
        console.log(res);
        if(res.IsError == false) {
          this.friendRequestUsers = this.friendRequestUsers.filter(v => {
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
    this.peopleProvider.declineFriend(localStorage.getItem('UserID'), person.UserID)
      .finally(() => {
        saveloader.dismiss();
      })
      .subscribe(res => {
        console.log(res);
        if(res.IsError == false) {
          this.friendRequestUsers = this.friendRequestUsers.filter(v => {
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
