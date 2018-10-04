import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, InfiniteScroll, NavController, Refresher } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';

import { PeopleProvider } from '../../../providers/people';
import { Device } from '@ionic-native/device';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationProvider } from '../../../providers/authentication';

@IonicPage({
  name: 'profile',
  segment: 'profile/:id'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage implements OnInit {
  private page = 0;
  private userId = this.navParams.get('id');
  profileView: number = 0;
  profile;
  activities = [];
  isLoading: boolean = false;
  isme: boolean = false;

  buttons = [{
    icon: 'ios-contact',
    text: 'PROFILE.BUTTONGROUP.PROFILE'
  },
  {
    icon: 'ios-list',
    text: 'PROFILE.BUTTONGROUP.ACTIVITY'
  },
  // {
  //   icon: 'ios-chatbubbles',
  //   text: 'PROFILE.BUTTONGROUP.MESSAGE'
  // },
  {
    icon: 'ios-cog',
    text: 'PROFILE.BUTTONGROUP.MORE'
  }];

  list = [
    {
      id: 3,
      icon: "file",
      title: "Articles",
      name: "article-list"
    },
    {
      id: 4,
      icon: "files-o",
      title: "Blogs",
      name: "blog-list"
    },
    {
      id: 111,
      icon: "briefcase",
      title: "Cases",
      name: "case-list"
    },
    {
      id: 1,
      icon: "comments",
      title: "Discussions",
      name: "discussion-list"
    },
    {
      id: 14,
      icon: "folder-open",
      title: "Files",
      name: "file-list"
    },
    {
      id: 44,
      icon: "lightbulb-o",
      title: "Ideas",
      name: "idea-list"
    },
    {
      id: 18,
      icon: "picture-o",
      title: "Photos",
      name: "photo-list"
    },
    {
      id: 7,
      icon: "video-camera",
      title: "Videos",
      name: "video-list"
    },
    {
      id: 9,
      icon: "book",
      title: "Wiki",
      name: "wiki-list"
    },
  ];

  constructor(
    public navParams: NavParams,
    private peopleProvider: PeopleProvider,
    public device: Device,
    private navCtrl: NavController,
    private appCenterAnalytics: AppCenterAnalytics,
    public translate: TranslateService,    
    private authenticationProvider: AuthenticationProvider,
  ) {
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }

    this.appCenterAnalytics.isEnabled().then( (b) => {
      if(b){
        this.appCenterAnalytics.trackEvent('Profile Page Load Event.', { profile: this.userId, userid: localStorage.getItem('UserID') }).then(() => {
          console.log('Profile Page Load Event tracked');
        });
      }
    })
   }
  isIphoneX: boolean = false;

  ngOnInit() {
    this.authenticationProvider.getMyDetails().subscribe(
      user => {
        this.isme = (this.userId == user.UserID);
      });
    this.getUser();
  }

  goToEntity(item) {
    this.navCtrl.push(item.name, {
      id: item.id,
      title: this.profile['First name'] + " " + this.profile['Last name'],
      subTitle: item.title,
      UserID: this.userId,
      profile: true
    });
  }

  doRefresh(refresh: Refresher){
    this.page = 1;
    this.getUserActivity()
      .finally(() => {
        refresh.complete();
      })
      .subscribe(res => {
        this.activities = [];
        this.handleActivity(res);
      })
  }

  refreshPage($event) {
    if ($event.result) {
      if (this.activities.length >= 10) {
        this.activities.pop();
      }
      this.activities.unshift($event);
    }
  }

  switchProfileView(view) {
    this.profileView = view.index;
    if(view.index == 1 && this.activities.length == 0){
      this.doInfinite();
    }
  }

  private getUser() {
    this.isLoading = true;

    this.peopleProvider.getUser(this.userId)
      .finally(() => this.isLoading = false)
      .subscribe(res => {
        console.log(res);
        this.profile = res.ResponseData;
      });
  }

  private getUserActivity() {
    return this.peopleProvider.getUserActivity(this.userId, this.page);
  }

  private handleActivity(response) {
    this.activities = this.activities.concat(response.ResponseData);
  }

  doInfinite(infiniteScroll?: InfiniteScroll) {
    if (this.activities.length > 0 && this.activities.length < 10) {
      infiniteScroll.enable(false);
    }
    this.page++;
    this.getUserActivity()
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        } else {
          this.isLoading = false;
        }
      })
      .do(response => {
        if (!response.ResponseData.length && infiniteScroll) {
          infiniteScroll.enable(false);
          this.page--; // Restore page back to the last correct page
        }
      })
      .subscribe(res => {
        this.handleActivity(res);
        if (infiniteScroll && res.ResponseData.length < 10) {
          infiniteScroll.enable(false);
        }
      })
  }
  manageFriends() {
    this.navCtrl.push('manage-friend');
  }
}
