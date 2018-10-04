import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController, NavParams, InfiniteScroll, NavController, Refresher } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';

import { SpacesProvider } from '../../../providers/spaces';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { TranslateService } from '@ngx-translate/core';

@IonicPage({
  name: 'space-details',
  segment: 'space-details/:id'
})

@Component({
  selector: 'page-space-details',
  templateUrl: 'space-details.html',
})
export class SpaceDetailsPage implements OnInit {
  private page = 0;
  public spaceId = this.navParams.get('id');  
  spaceView: number = 0;
  space;
  spaceActivities = [];
  spaceUsers = [];
  searchtext = '';
  communityUrl = localStorage.getItem('community_url');
  isLoading: boolean = false;
  isLoadingActivity: boolean = false;
  isLoadingUsers: boolean = false;
  private peoplePage = 0;

  buttons = [
    // {
    //   icon: 'ios-home',
    //   text: 'Home'
    // },
    {
      icon: 'ios-list',
      text: 'PROFILE.BUTTONGROUP.ACTIVITY'
    }, {
      icon: 'ios-people',
      text: 'PEOPLE.HEADING'
    }, {
      icon: 'ios-cog',
      text: 'PROFILE.BUTTONGROUP.MORE'
    }];

  list = [
    {
      id: 3,
      icon: "file",
      title: "Articles",
      name: "article-list",
      meta: "Article"
    },
    {
      id: 4,
      icon: "files-o",
      title: "Blogs",
      name: "blog-list",
      meta: "Blog"
    },
    {
      id: 19,
      icon: "briefcase",
      title: "Cases",
      name: "case-list",
      meta: "Issue"
    },
    {
      id: 1,
      icon: "comments",
      title: "Discussions",
      name: "discussion-list",
      meta: "Forum"
    },
    {
      id: 14,
      icon: "folder-open",
      title: "Files",
      name: "file-list",
      meta: "File"
    },
    {
      id: 44,
      icon: "lightbulb-o",
      title: "Ideas",
      name: "idea-list",
      meta: "Idea"
    },
    {
      id: 18,
      icon: "picture-o",
      title: "Photos",
      name: "photo-list",
      meta: "Photo"
    },
    {
      id: 7,
      icon: "video-camera",
      title: "Videos",
      name: "video-list",
      meta: "Video"
    },
    {
      id: 9,
      icon: "book",
      title: "Wiki",
      name: "wiki-list",
      meta: "Wiki"
    },
    {
      id: 64,
      icon: "bell",
      title: "Announcement",
      name: "page-space-announcement",
      meta: "Announcement"
    }
  ];

  entitiesAccess: any = {
    Article: false,
    Blog: false,
    Issue: false,
    Forum: false,
    File: false,
    Idea: false,
    Video: false,
    Photo: false,    
    Wiki: false,
    Announcement: false
  };

  isOneEnabled: boolean = true;

  checkAccess() {
    let keyArray = ["Article", "Blog", "Issue", "Forum", "File", "Idea", "Photo", "Video", "Wiki", 'Announcement'];
    let flag = false;
    for (let i = 0; i < keyArray.length; ++i) {
      if (this.entitiesAccess[keyArray[i]] === true) {
        flag = true;
      }
    }
    this.isOneEnabled = flag;
  }

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private spacesProvider: SpacesProvider,
    private navCtrl: NavController,
    private appCenterAnalytics: AppCenterAnalytics,
    public translate: TranslateService
  ) {
    let string = "";
    for (let i = 0; i < this.list.length; ++i) {
      if (this.list[i].id == 18) {
        string += 6 + ",";
      } else {
        string += this.list[i].id + ",";
      }
    }
    localStorage.setItem('SpaceID', this.spaceId);
    this.spacesProvider.checkEntities(this.spaceId, string).subscribe(res => {
      this.entitiesAccess = res.ResponseData;
      console.log(this.entitiesAccess);
      this.entitiesAccess['Announcement'] = true;
      this.checkAccess();
    });

    this.translate.get(["TITLES.ARTICLES", "TITLES.BLOGS", "TITLES.CASES", "TITLES.DISCUSSIONS", "TITLES.FILES", "TITLES.IDEAS",
                        "TITLES.PHOTOS", "TITLES.VIDEOS", "TITLES.WIKIS", "ANNOUNCEMENT.ANNOUNCEMENTS"
    ]).subscribe((res) => {      
      this.list = [
        {
          id: 3,
          icon: "file",
          title: res["TITLES.ARTICLES"],
          name: "article-list",
          meta: "Article"
        },
        {
          id: 4,
          icon: "files-o",
          title: res["TITLES.BLOGS"],
          name: "blog-list",
          meta: "Blog"
        },
        {
          id: 19,
          icon: "briefcase",
          title: res["TITLES.CASES"],
          name: "case-list",
          meta: "Issue"
        },
        {
          id: 1,
          icon: "comments",
          title: res["TITLES.DISCUSSIONS"],
          name: "discussion-list",
          meta: "Forum"
        },
        {
          id: 14,
          icon: "folder-open",
          title: res["TITLES.FILES"],
          name: "file-list",
          meta: "File"
        },
        {
          id: 44,
          icon: "lightbulb-o",
          title: res["TITLES.IDEAS"],
          name: "idea-list",
          meta: "Idea"
        },
        {
          id: 18,
          icon: "picture-o",
          title: res["TITLES.PHOTOS"],
          name: "photo-list",
          meta: "Photo"
        },
        {
          id: 7,
          icon: "video-camera",
          title: res["TITLES.VIDEOS"],
          name: "video-list",
          meta: "Video"
        },
        {
          id: 9,
          icon: "book",
          title: res["TITLES.WIKIS"],
          name: "wiki-list",
          meta: "Wiki"
        },
        {
          id: 64,
          icon: "bell",
          title: res["ANNOUNCEMENT.ANNOUNCEMENTS"],
          name: "page-space-announcement",
          meta: "Announcement"
        },
      ];
    });
  }

  ngOnInit() {
    this.isLoading = true;
    console.log(this.spaceId);

    this.spacesProvider
      .getSpace(this.spaceId)
      .finally(() => this.isLoading = false)
      .subscribe(space => {
        this.space = space;
        if(this.spaceId == 0){
          this.space.SpaceVisibility = 4;
        }

        this.appCenterAnalytics.isEnabled().then( (b) => {
          if(b){
            this.appCenterAnalytics.trackEvent('Space Detail Load.', { id: this.spaceId, userid: localStorage.getItem('UserID') }).then(() => {
              console.log('Space Detail Load Event tracked');
            });
          }
        })
      });
    if (this.spaceId == 0) {
      this.spaceView = 2;
    }
    // this.getSpaceActivities();
    console.log(this.list);
  }

  doRefresh(refresh: Refresher) {

    this.page = 1;
    this.spaceActivity()
      .finally(() => {
        refresh.complete();
      })
      .subscribe(res => {
        this.spaceActivities = [];
        this.handleSpace(res);
      })
  }

  goToEntity(item) {
    this.navCtrl.push(item.name, {
      id: item.id,
      title: this.space.SpaceName,
      subTitle: item.title,
      SpaceID: this.space.SpaceID
    });
  }

  refreshPage($event) {
    console.log($event);
    this.spaceActivities.unshift($event);
    this.spaceActivities.pop();
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText(null);
    this.getSpaceActivities();
  }

  switchSpaceView(view) {
    this.spaceView = view.index;

    if (this.spaceView === 0 && !this.spaceActivities.length) {
      this.getSpaceActivities();
    } else if (this.spaceView === 1 && !this.spaceUsers.length) {
      this.getSpaceUsers();
    }
  }

  private spaceActivity() {
    // Fetch Space Activity
    return this.spacesProvider.getSpaceActivity(this.spaceId, this.page);
  }

  getSpaceUsers(infiniteScroll?: InfiniteScroll) {
    if (!infiniteScroll) {
      this.isLoadingUsers = true;
    }

    if (this.spaceUsers.length > 0 && this.spaceUsers.length < 15) {
      infiniteScroll.enable(false);
      return;
    }

    ++this.peoplePage;

    // Fetch Space user by Id
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
        this.spaceUsers = this.spaceUsers.concat(res.ResponseData);
        if (res.ResponseData.length < 15 && infiniteScroll) {
          infiniteScroll.enable(false);
        }
      });
  }

  getSpaceActivities(infiniteScroll?: InfiniteScroll) {
    if (this.spaceActivities.length > 0 && this.spaceActivities.length < 10) {
      infiniteScroll.enable(false);
    }
    if (!infiniteScroll) {
      this.isLoadingActivity = true;
    }

    this.page++;
    this.spaceActivity()
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        } else {
          this.isLoadingActivity = false;
        }
      })
      .do(response => {
        console.log(response);
        if (!response.ResponseData.length && infiniteScroll || response.ResponseData.length && response.ResponseData.length == 0 && infiniteScroll) {
          infiniteScroll.enable(false);
          this.page--; // Restore page back to the last correct page
        }
      })
      .subscribe(res => {
        this.handleSpace(res);
        if (infiniteScroll && res.ResponseData.length < 10) {
          infiniteScroll.enable(false);
        }
      })
  }

  private handleSpace(response) {
    this.spaceActivities = this.spaceActivities.concat(response.ResponseData);
  }

  managePeople() {
    this.navCtrl.push('manage-user', {
      id: this.spaceId
    });
  }
}
