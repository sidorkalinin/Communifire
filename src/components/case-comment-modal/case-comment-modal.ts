import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavParams, ViewController, ToastController, LoadingController, Events } from "ionic-angular";
import { ContentProvider } from "../../providers/content";
import { SpacesProvider } from "../../providers/spaces";
import { TranslateService } from '@ngx-translate/core';
import { Device } from '@ionic-native/device';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'case-comment-modal',
  templateUrl: 'case-comment-modal.html'
})
export class CaseCommentModalComponent implements AfterViewInit {

  ngAfterViewInit() {    
  }

  commentText: string = "";
  caseId: number;
  case: any;
  isPosting: boolean = false;

  updateCaseData: any = {};
  caseNeedUpdate: boolean = false;

  // User permissions
  assignToUser: boolean;
  updateIssuePriority: boolean;
  updateIssueStatus: boolean;
  addRecipients: boolean;
  uploadAttachment: boolean;
  hasAddCommentPerm: boolean;
  isIphoneX: boolean = false;

  loader: any;
  isStatusUploaded: boolean = false;
  isPriorityUploaded: boolean = false;

  files: any = [];

  statusUploaded($event) {
    this.isStatusUploaded = true;
    console.log(this.loader, 1);
    if (this.isPriorityUploaded) {
      console.log(this.loader, 11);
      setTimeout(() => {
        this.caseComment.setFocus();
      }, 550);
      this.loader.dismiss();
    }
  }

  priorityUploaded($event) {
    this.isPriorityUploaded = true;
    console.log(this.loader, 2);
    if (this.isStatusUploaded) {
      console.log(this.loader, 22);
      setTimeout(() => {
        this.caseComment.setFocus();
      }, 550);
      this.loader.dismiss();
    }
  }

  preventKeyboardHiding(){
    console.log(1);
    this.caseComment.setFocus();
  }

  setFiles(files) {
    this.files = files;
  }

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private contentProvider: ContentProvider,
    private spacesProvider: SpacesProvider,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    public device: Device,
    public keyboard: Keyboard,
    public loadingCtrl: LoadingController,
    public events: Events
  ) {
    this.translate.get("LOGIN.WAIT").subscribe(res => {
      this.loader = this.loadingCtrl.create({
        content: res
      });
      this.loader.present();    
      this.caseId = this.navParams.get('id');
      this.case = this.navParams.get('case');

      this.getPermissions();
      if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
        this.isIphoneX = true;
      }
    });
  }

  cancel(data) {
    this.viewCtrl.dismiss();
  }

  getPermissions() {
    this.contentProvider.getCasePermission(this.case.SpaceID).subscribe(res => {
      let permissions = res.ResponseData;
      this.assignToUser = permissions.AssignToUser;
      this.updateIssuePriority = permissions.UpdateIssuePriority;
      this.updateIssueStatus = permissions.UpdateIssueStatus;
      this.addRecipients = permissions.AddRecipients;
      this.uploadAttachment = permissions.UploadAttachment;
      
      this.loader.dismiss();
    });

    // Check Case comment permission
    this.contentProvider.checkPermission({entitytype: 20, spaceid: this.case.SpaceID}, "Create").subscribe(res => {
      this.hasAddCommentPerm = res.ResponseData.Create;
    });
  }

  setProject($event) {
    this.caseNeedUpdate = true;
    this.updateCaseData['ProjectID'] = $event;
  }

  setCategory($event) {
    this.caseNeedUpdate = true;
    this.updateCaseData['ProjectSectionID'] = $event;
  }

  setMilestone($event) {
    this.caseNeedUpdate = true;
    this.updateCaseData['MilestoneID'] = $event;
  }

  setStatus($event) {
    this.caseNeedUpdate = true;
    this.updateCaseData['IssueStatusID'] = $event;
  }

  setPriority($event) {
    this.caseNeedUpdate = true;
    this.updateCaseData['IssuePriorityID'] = $event;
  }

  setAssignedUser($event) {
    this.caseNeedUpdate = true;
    this.updateCaseData['AssignedToUserID'] = $event;
  }

  getFormattedText(text) {
    var commentArrayOfParagraphs = text.split('\n');
    let formattedCommentText = '';
    for(var k = 0; k < commentArrayOfParagraphs.length; k++){
      formattedCommentText += '<p>' + commentArrayOfParagraphs[k] + '</p>';
    }
    return formattedCommentText;
  }

  createToast(message, duration) {
    this.translate.get(message).subscribe((res: string) => {
      let toast = this.toastCtrl.create({
        message: res,
        duration: duration
      });
      toast.present();
    });
  }

  createComment() {
    if (this.hasAddCommentPerm) {

      // User should add comment while updating the case if user has permission.
      if (this.commentText.replace(/\s/g, '') == "")
      {
        this.createToast('COMMONS.ENTER_MESSAGE', 1000);
        return;
      }

      this.isPosting = true;
      var formattedCommentText = this.getFormattedText(this.commentText);
      console.log("Case has comment.");

      this.contentProvider.createCaseComment(formattedCommentText, this.caseId)
      .finally(() => {
        this.commentText = ''; // Clear the comment box
      })
      .subscribe(res => {

        // Check if user has changed any of the fields to update the case.
        if (this.caseNeedUpdate) {
          this.updateCase();
        } else {
          this.isPosting = false;
          this.cancel({ update: false });
        }

        // Upload files
        if (this.files.length > 0) {
          this.createToast('COMMONS.FILES_BEING_UPLOADED', 3000);

          let commentId = res.ResponseData;
          this.files.forEach(elem => {
            this.spacesProvider.attachFileToCaseComment(elem, this.caseId, commentId, this.case.SpaceID);
          });
        }
        this.events.publish('comment:created', 1);
        this.cancel({ update: true }); 
      });
    } else{
      this.updateCase();
    }
  }

  updateCase() {
    console.log(this.updateCaseData);
    this.contentProvider.updateCase(this.caseId, this.updateCaseData).finally(()=>{
      this.isPosting = false;
      this.cancel({ update: true });      

      console.log("Case is updated");
    })
    .subscribe(res => {
      console.log(JSON.parse(res));
    })
  }

  @ViewChild('caseComment') myInput: ElementRef;
  @ViewChild('caseComment') caseComment;
  resize() {
    var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

}
