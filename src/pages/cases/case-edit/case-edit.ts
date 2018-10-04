import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController, ModalController, ToastController, Platform } from 'ionic-angular';
import { ContentProvider } from '../../../providers/content';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { TranslateService } from '@ngx-translate/core';
import { PeopleProvider } from '../../../providers/people';
import { Device } from '@ionic-native/device';
import { Observable } from 'rxjs/Observable';
import { Keyboard } from '@ionic-native/keyboard';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
/**
 * Generated class for the CaseEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'case-edit',
  segment: 'case-edit'
})
@Component({
  selector: 'page-case-edit',
  templateUrl: 'case-edit.html',
})
export class CaseEditPage {
  caseId: any;
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
  d_milestones: any = [
  ];
  categories: any = [];
  d_categories: any = [
  ];
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
    this.caseId = this.navParams.get('caseId');
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
            console.log(info);
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
    //this.d_recipients = items;
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
      this.loadCase();
      //this.loadCaseParameters();
    });
  }

  loadCase() {
    this.contentProvider.getCase(this.caseId)
      .finally(() => {
      })
      .subscribe(res => {
        let resData = res.ResponseData;
        this.spaceId = resData.SpaceID;
        this.issueTitle = resData.IssueTitle;
        this.issueDescription = resData.IssueDescription;
        this.milestoneId = resData.MilestoneID;
        this.assignedToUserId = resData.AssignedToUserID,
          this.projectId = resData.ProjectID;
        this.projectSectionId = resData.ProjectSectionID;
        this.issuePriorityId = resData.IssuePriorityID,
          this.issueStatusId = resData.IssueStatusID,
          this.tags = resData.TagsCSV.split(',');
        if (this.tags.length == 1 && this.tags[0] == '') {
          this.tags = [];
        }
        let reci = resData.RecipientUserIDCSV.split(',');
        if (reci.length == 1 && reci[0] == '') {
          reci = [];
        }
        this.setRecipients(reci);

        this.loadCaseParameters();
      })
  }

  loadCaseParameters() {
    Observable.forkJoin(
      this.contentProvider.getCasesStatuses(this.spaceId),
      this.contentProvider.getCasesPriorities(this.spaceId),
      this.contentProvider.getCasesProjects(this.spaceId)
    )
      .finally(() => {
        this.loadCaseExtraParameters();
      })
      .subscribe(res => {
        this.statuses = res[0].ResponseData;
        for (let i = 0; i < this.statuses.length; i++) {
          this.d_statuses.push({
            value: this.statuses[i].IssueStatusID,
            name: this.statuses[i].IssueStatusName,
            default: this.statuses[i].IssueStatusID == this.issueStatusId
          })
        }
        this.priorities = res[1].ResponseData;
        for (let i = 0; i < this.priorities.length; i++) {
          this.d_priorities.push({
            value: this.priorities[i].IssuePriorityID,
            name: this.priorities[i].IssuePriorityName,
            default: this.priorities[i].IssuePriorityID == this.issuePriorityId
          })
        }
        this.projects = res[2].ResponseData;
        for (let i = 0; i < this.projects.length; i++) {
          this.d_projects.push({
            value: this.projects[i].ProjectID,
            name: this.projects[i].ProjectTitle,
            default: this.projects[i].ProjectID == this.projectId
          })
        }
      })
  }

  loadCaseExtraParameters() {
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
        this.d_milestones = [
          { name: 'No Milestone', value: 0, default: this.milestoneId == 0 }
        ]
        for (let i = 0; i < this.milestones.length; i++) {
          this.d_milestones.push({
            value: this.milestones[i].MilestoneID,
            name: this.milestones[i].MilestoneTitle,
            default: this.milestones[i].MilestoneID == this.milestoneId
          })
        };
        this.categories = res[1].ResponseData;
        this.d_categories.push({ name: 'No Category', value: 0, default: true });
        for (let i = 0; i < this.categories.length; i++) {
          this.d_categories.push({
            value: this.categories[i].ProjectSectionID,
            name: this.categories[i].ProjectSectionName,
            default: this.categories[i].ProjectSectionID == this.projectSectionId
          })
          if (this.categories[i].ProjectSectionID == this.projectSectionId) {
            this.d_categories[0].default = false;
          }
        }

        this.assigntos = res[2].ResponseData;
        for (let i = 0; i < this.assigntos.length; i++) {
          this.d_assigntos.push({
            value: this.assigntos[i].UserID,
            name: this.assigntos[i].UserInfoDisplayName,
            default: this.assigntos[i].UserID == this.assignedToUserId,
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

  navToList() {
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();

    this.navCtrl.push('cases', {
      id: this.caseId
    }, {
        direction: 'back'
      })
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
      this.titleClass = 'red';
      let yOffset = document.getElementById('caseTitle').offsetTop;
      this.content.scrollTo(0, yOffset - 50, 1000);
      this.translate.get("TOAST.TITLEEMPTY").subscribe(res => {
        this.presentToast(res);
      });
      return;
    } else if (this.issueDescription == undefined || this.issueDescription == '') {
      this.bodyClass = 'red';
      let yOffset = document.getElementById('caseBody').offsetTop;
      this.content.scrollTo(0, yOffset - 50, 1000);
      this.translate.get("TOAST.BODYEMPTY").subscribe(res => {
        this.presentToast(res);
      });
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

    this.contentProvider.updateCase(this.caseId, JSON.stringify(body))
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
            this.translate.get("TOAST.UPDATED").subscribe(res => {
              this.presentToast(res);
            });
            this.navToList();
          })

          this.appCenterAnalytics.isEnabled().then((b) => {
            if (b) {
              this.appCenterAnalytics.trackEvent('Case Edit Success.', { id: res.ResponseData, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Case Edit Event tracked');
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
              this.appCenterAnalytics.trackEvent('Case Edit Failed.', { error: res.ResponseMessage, userid: localStorage.getItem('UserID') }).then(() => {
                console.log('Case Edit Event Failed');
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
  setRecipientCheck(person) {
    this.additional_recipients.push(person);
  }
}
