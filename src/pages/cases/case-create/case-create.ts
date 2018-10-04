import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController, ModalController, ToastController, Platform } from 'ionic-angular';
import { ContentProvider } from '../../../providers/content';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/finally';
import { PeopleProvider } from '../../../providers/people';
import { Device } from '@ionic-native/device';
import { Keyboard } from '@ionic-native/keyboard';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
/**
 * Generated class for the CaseCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'case-create',
  segment: 'case-create'
})
@Component({
  selector: 'page-case-create',
  templateUrl: 'case-create.html',
})
export class CaseCreatePage implements OnInit {
  caseTitle: any;
  issueTitle: any;
  issueDescription: any;
  reportedByUserId: any;
  milestoneId: any;
  assignedToUserId: any;
  projectId: any;
  projectSectionId: any;
  issuePriorityId: any;
  issueStatusId: any;
  additional_recipients: any = [];
  spaceId: any;
  tags: any = [];
  attachFiles: any = [];

  statuses: any = [];
  d_statuses: any = [];
  priorities: any = [];
  d_priorities: any = [];
  projects: any = [];
  d_projects: any = [];
  milestones: any = [];
  d_milestones: any;
  categories: any = [];
  d_categories: any;
  assigntos: any = [];
  d_assigntos: any = [
  ];
  recipients: any = [];
  d_recipients: any = [];

  //Validation
  titleClass: string;
  bodyClass: string;

  keyOpen: any = false;
  isAndroid: any;
  scrollAmount: any;

  bTag: any = false;
  froalaOption: any = {
    placeholderText: ''
  }

  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contentProvider: ContentProvider,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public modalCtrl: ModalController,
    private peopleProvider: PeopleProvider,
    public device: Device,
    private toastCtrl: ToastController,
    private keyboard: Keyboard,
    private platform: Platform,
    private appCenterAnalytics: AppCenterAnalytics
  ) {
    this.spaceId = this.navParams.get('spaceId');
    this.caseTitle = this.navParams.get('title');

    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }

    this.isAndroid = this.platform.is("android");
    this.keyboard.onKeyboardShow().subscribe(() => {
      if (this.isAndroid) { // This is to prevent content scrolling when keyboard hidden.
        setTimeout(() => {
          this.content.scrollTo(0, this.scrollAmount, 0);
        }, 0)
      }
      this.keyOpen = true;
    });
    this.keyboard.onKeyboardHide().subscribe(() => {
      if (this.isAndroid) { // This is to prevent content scrolling when keyboard hidden.
        setTimeout(() => {
          this.content.scrollTo(0, this.scrollAmount, 0);
        }, 0)
      }
      this.keyOpen = false;
    });
    this.keyboard.disableScroll(true);

    this.translate.get("COMPONENT.NOMILESTONE").subscribe(res => {
      this.d_milestones = [
        { name: res, value: 0, default: true }
      ];
    });

    this.translate.get("COMPONENT.NOCATEGORY").subscribe(res => {
      this.d_categories = [
        { name: res, value: 0, default: true }
      ];
    });
  }

  isIphoneX: boolean = false;

  //Set Tags
  setTags(tags) {
    this.tags = tags;
  }
  //Set Attach Files
  setFiles(files) {
    this.attachFiles = files;
  }
  setRecipientCheck(person) {
    this.additional_recipients.push(person);
  }

  setProject(project) {
    this.projectId = project.value;
    for (let i = 0; i < this.d_projects.length; i++) {
      if (this.d_projects[i].value == this.projectId) {
        this.d_projects[i].default = true;
      } else {
        this.d_projects[i].default = false;
      }
    }
  }
  setCategory(category) {
    this.projectSectionId = category.value;
    for (let i = 0; i < this.d_categories.length; i++) {
      if (this.d_categories[i].value == this.projectSectionId) {
        this.d_categories[i].default = true;
      } else {
        this.d_categories[i].default = false;
      }
    }
  }
  setStatus(status) {
    this.issueStatusId = status.value;
    for (let i = 0; i < this.d_statuses.length; i++) {
      if (this.d_statuses[i].value == this.issueStatusId) {
        this.d_statuses[i].default = true;
      } else {
        this.d_statuses[i].default = false;
      }
    }
  }
  setPriority(priority) {
    this.issuePriorityId = priority.value;
    for (let i = 0; i < this.d_priorities.length; i++) {
      if (this.d_priorities[i].value == this.issuePriorityId) {
        this.d_priorities[i].default = true;
      } else {
        this.d_priorities[i].default = false;
      }
    }
  }
  setAssignTo(assignTo) {
    this.assignedToUserId = assignTo.value;
    for (let i = 0; i < this.d_assigntos.length; i++) {
      if (this.d_assigntos[i].value == this.assignedToUserId) {
        this.d_assigntos[i].default = true;
      } else {
        this.d_assigntos[i].default = false;
      }
    }
  }
  //Set Guests
  setRecipients(items) {
    this.recipients = [];
    this.d_recipients = [];

    for (let i = 0; i < items.length; i++) {
      if (this.recipients.indexOf(items[i]) == -1) {
        this.recipients.push(items[i]);
        this.peopleProvider.getUser(items[i])
          .finally(() => { })
          .subscribe(res => {
            let info = res.ResponseData;
            this.d_recipients.push({
              AvatarImageURL: info['Profile photo'][1],
              FirstName: info['First name'],
              LastName: info['Last name'],
              RankName: '',
              UserID: items[i],
              hascheckbox: true
            })
          })
      }
    }
  }
  setMilestone(milestone) {
    this.milestoneId = milestone.value;
    for (let i = 0; i < this.milestones.length; i++) {
      if (this.d_milestones[i].value == this.milestoneId) {
        this.d_milestones[i].default = true;
      } else {
        this.d_milestones[i].default = false;
      }
    }
  }

  ionViewDidLoad() {
  }

  onScroll(event) {
    if (!this.isAndroid) {
      if (this.keyOpen && !this.bTag) {
        this.keyboard.close();
      }
    } else {
      this.scrollAmount = event.scrollTop;
    }
  }

  loader: any;

  async ngOnInit() {
    this.translate.get("COMMONS.LOADING").subscribe(res => {
      this.loader = this.loadingCtrl.create({
        content: res,
      });
      this.loader.present();
      this.loadCaseParameters();
    });
  }

  loadCaseParameters() {
    Observable.forkJoin(
      this.contentProvider.getCasesStatuses(this.spaceId),
      this.contentProvider.getCasesPriorities(this.spaceId),
      this.contentProvider.getCasesProjects(this.spaceId)
    )
      .finally(() => {

      })
      .subscribe(res => {
        this.statuses = res[0].ResponseData;
        for (let i = 0; i < this.statuses.length; i++) {
          this.d_statuses.push({
            value: this.statuses[i].IssueStatusID,
            name: this.statuses[i].IssueStatusName,
            default: this.statuses[i].IsDefault
          })
        }
        this.priorities = res[1].ResponseData;
        for (let i = 0; i < this.priorities.length; i++) {
          this.d_priorities.push({
            value: this.priorities[i].IssuePriorityID,
            name: this.priorities[i].IssuePriorityName,
            default: this.priorities[i].IsDefault
          })
        }
        this.projects = res[2].ResponseData;
        for (let i = 0; i < this.projects.length; i++) {
          let project = this.projects[i];
          if (project.IsDefaultProject == true) {
            this.projectId = project.ProjectID;
            this.loadCaseExtraParameters(this.projectId);
          }

          this.d_projects.push({
            value: this.projects[i].ProjectID,
            name: this.projects[i].ProjectTitle,
            default: this.projects[i].IsDefaultProject
          })
        }
      })
  }

  loadCaseExtraParameters(projectId) {
    Observable.forkJoin(
      this.contentProvider.getCasesMilestones(this.spaceId, this.projectId),
      this.contentProvider.getCasesCategories(this.spaceId, this.projectId),
      this.contentProvider.getCasesAssignTo(this.spaceId, this.projectId),
      //this.contentProvider.getCasesRecipients(this.spaceId, this.projectId)
    )
      .finally(() => {
        this.dismiss();
      })
      .subscribe(res => {
        this.milestones = res[0].ResponseData;
        for (let i = 0; i < this.milestones.length; i++) {
          this.d_milestones.push({
            value: this.milestones[i].MilestoneID,
            name: this.milestones[i].MilestoneTitle,
            default: false
          })
        };
        this.categories = res[1].ResponseData;
        for (let i = 0; i < this.categories.length; i++) {
          this.d_categories.push({
            value: this.categories[i].ProjectSectionID,
            name: this.categories[i].ProjectSectionName,
            default: false
          })
        }
        this.assigntos = res[2].ResponseData;
        console.log(this.assigntos);
        for (let i = 0; i < this.assigntos.length; i++) {
          this.d_assigntos.push({
            value: this.assigntos[i].UserID,
            name: this.assigntos[i].UserInfoDisplayName,
            default: false,
            AvatarImageURL: this.assigntos[i].AvatarImageURL,
            FirstName: this.assigntos[i].UserInfoDisplayName,
            LastName: '',
            RankName: '',
            UserID: this.assigntos[i].UserID,
            hascheckbox: true
          })
        }

        //this.recipients = res[3].ResponseData;
      })
  }

  dismiss() {
    this.loader.dismiss();
  }

  // Element not validated gets focus
  getFocus() {
    this.titleClass = '';
    this.bodyClass = '';
  }

  navToList(id) {
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();

    // this.navCtrl.push("case-list", {
    //   title: this.caseTitle,
    //   SpaceID: this.spaceId
    // }, {
    //   direction: "back"
    // });

    this.navCtrl.push("cases", {
      id: id
    }, {
        direction: "back"
      });

    this.navCtrl.removeView(active);
    this.navCtrl.removeView(parent);
  }

  private presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  cancel() {
    this.navCtrl.pop();
  }

  save() {
    if (this.issueTitle == undefined || this.issueTitle == '') {
      let yOffset = document.getElementById('headline').offsetTop;
      this.content.scrollTo(0, yOffset - 50, 1000);
      this.translate.get("TOAST.TITLEEMPTY").subscribe(res => {
        this.presentToast(res);
      });
      return;
    } else if (this.issueDescription == undefined || this.issueDescription == '') {
      let yOffset = document.getElementById('caseBody').offsetTop;
      this.content.scrollTo(0, yOffset - 50, 1000);
      this.translate.get("TOAST.BODYEMPTY").subscribe(res => {
        this.presentToast(res);
      });
      return;
    }
    let body = {
      'IssueTitle': this.issueTitle,
      'IssueDescription': this.issueDescription,
      'MilestoneID': this.milestoneId,
      'AssignedToUserID': this.assignedToUserId,
      'ProjectID': this.projectId,
      'ProjectSectionID': this.projectSectionId,
      'IssuePriorityID': this.issuePriorityId,
      'IssueStatusID': this.issueStatusId,
      'SpaceID': this.spaceId,
      'TagsCSV': this.tags.join(','),
      'RecipientUserIDCSV': this.recipients.join(',')
    }

    const saveloader = this.loadingCtrl.create({
    });
    saveloader.present();

    this.contentProvider.createCase(JSON.stringify(body))
      .finally(() => {
      })
      .subscribe(res => {
        if (res.IsError == false) {
          let p = [];
          for (var i = 0; i < this.attachFiles.length; i++) {
            p.push(this.contentProvider.uploadCaseFile({
              'fullPath': this.attachFiles[i].path,
              'name': this.attachFiles[i].filename,
              'contentID': res.ResponseData
            }));
          }

          Promise.all(p).then(() => {
            saveloader.dismiss();
            this.translate.get("TOAST.CREATED").subscribe(res => {
              this.presentToast(res);
            });
            this.navToList(res.ResponseData);
          })

          this.appCenterAnalytics.isEnabled().then((b) => {
            if (b) {
              this.appCenterAnalytics.trackEvent('Case Create Success.', { id: res.ResponseData, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Case Create Event tracked');
              });
            }
          })
        } else {
          saveloader.dismiss();
          this.translate.get("TOAST.ERROR").subscribe(res => {
            this.presentToast(res);
          });

          this.appCenterAnalytics.isEnabled().then((b) => {
            if (b) {
              this.appCenterAnalytics.trackEvent('Case Creation Failed.', { error: res.ResponseMessage, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Case Creation Failed Event F');
              });
            }
          })
        }
      });
  }

  keyboardSubscription: any;

  onTagFocus() {
    this.bTag = true;
    //this.content.scrollToTop(500);
    this.keyboardSubscription = this.keyboard.onKeyboardShow().subscribe(e => {
      setTimeout(() => {
        this.content.scrollToBottom(500); // 500 for a smooth slow scroll after the Keyboard opens, but you can change this
      }, 50);
    });
  }
  onTagBlur() {
    this.bTag = false;
    this.keyboardSubscription.unsubscribe();
  }
}
