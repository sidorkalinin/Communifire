import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavParams, ViewController, ToastController } from "ionic-angular";
import { ContentProvider } from "../../providers/content";
import { Device } from '@ionic-native/device';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'forum-topic-comment-modal',
  templateUrl: 'forum-topic-comment-modal.html'
})
export class ForumTopicCommentModalComponent implements AfterViewInit {

  @ViewChild('forumTopic') forumComment;

  ngAfterViewInit(){
    setTimeout(() => {
      this.forumComment.setFocus();
    }, 550);
  }

  commentText: string = "";
  forumTopicId: number;
  forumTopic: any;

  updateCaseData: any = {};
  caseNeedUpdate: boolean = false;
  files: any = false;


  // User permissions
  assignToUser: boolean;
  updateIssuePriority: boolean;
  updateIssueStatus: boolean;
  addRecipients: boolean;
  uploadAttachment: boolean;
  isIphoneX: boolean = false;

  isPosting: boolean = false;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private contentProvider: ContentProvider,
    public device: Device,
    public translate: TranslateService
  ) {
    this.forumTopicId = this.navParams.get('id');
    this.forumTopic = this.navParams.get('forumTopic');
    // this.getPermissions();
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6"){
      this.isIphoneX = true;
    }
  }

  cancel(data){
    this.viewCtrl.dismiss(data);
  }

  getPermissions(){
    this.contentProvider.getCasePermission(this.forumTopic.SpaceID).subscribe(res => {
      let permissions = res.ResponseData;
      this.assignToUser = permissions.AssignToUser;
      this.updateIssuePriority = permissions.UpdateIssuePriority;
      this.updateIssueStatus = permissions.UpdateIssueStatus;
      this.addRecipients = permissions.AddRecipients;
      this.uploadAttachment = permissions.UploadAttachment;
    });
  }

  setStatus($event){
    this.caseNeedUpdate = true;
    this.updateCaseData['IssueStatusID'] = $event;
  }

  setPriority($event){
    this.caseNeedUpdate = true;
    this.updateCaseData['IssuePriorityID'] = $event;
  }

  createComment(){
    this.isPosting = true;
    if (this.commentText.replace(/\s/g, '') !== ""){
      let data = {
        EntityType: 54,
        ParentContentID: this.forumTopic.ContentID,
        GrandParentContentID: this.forumTopic.ParentContentID,
        SpaceID: this.forumTopic.SpaceID,
        ContentBody: this.commentText,
        ContentTitle: this.forumTopic.ContentTitle
      }
      this.contentProvider.createForumTopicComment(data).subscribe(res => {
        this.isPosting = false;
        if (this.files.length > 0) {
          this.translate.get('COMMONS.FILES_BEING_UPLOADED').subscribe((res: string) => {
            let toast = this.toastCtrl.create({
              message: res,
              duration: 3000
            });
            toast.present();
          });
          let commentId = res.ResponseData;
          this.files.forEach(file => {
            this.contentProvider.attachFileToContent(commentId, file);
          });
        }
        this.cancel(null);
      });
    }
  }

  @ViewChild('forumTopic') myInput: ElementRef;
  resize() {
      var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      var scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

  setFiles(files) {
    this.files = files;
  }

  // updateCase(){
  //   this.contentProvider.updateCase(this.forumTopicId, this.updateCaseData).subscribe(res => {
  //     this.cancel({ update: true });
  //   });
  // }

}
