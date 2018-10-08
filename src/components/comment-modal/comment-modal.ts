import { TranslateService } from '@ngx-translate/core';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ViewController, NavParams, InfiniteScroll, ToastController, Content, Events } from 'ionic-angular';
import { ContentProvider } from '../../providers/content';
import { AuthenticationProvider } from '../../providers/authentication';
import { Keyboard } from "@ionic-native/keyboard";
import { Device } from '@ionic-native/device';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';

@Component({
  selector: 'comment-modal',
  templateUrl: 'comment-modal.html'
})
export class CommentModalComponent implements AfterViewInit {

  @ViewChild('textarea') textarea;
  @ViewChild(Content) content: Content;

  entity: any = {};
  page: number = 0;
  comments: any = [];
  parentId: number = null;
  commentText: string = "";
  user: any = this.authenticationProvider.user$['source']['_value'];
  commentsAdded: number = 0;
  isLoading: boolean = false;
  isIphoneX: boolean = false;
  parentComment: any;
  tempComments: any = [];
  isHighlighted: boolean = false;
  dateCommentedText: any;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public contentProvider: ContentProvider,
    public toastCtrl: ToastController,
    public authenticationProvider: AuthenticationProvider,
    public keyboard: Keyboard,
    public device: Device,
    public translate: TranslateService,
    public events: Events
  ) {
    this.entity = this.navParams.get('entity');
    console.log(this.entity);
    if (this.navParams.get('parentComment')) {
      this.parentComment = this.navParams.get('parentComment');
      this.parentId = this.parentComment.CommentID;
    }
    if (this.entity.WallComment && this.entity.WallID && this.entity.WallID !== 0) {
      this.comments = this.entity.WallComment;
    } else {
      this.getComments();
    }
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
    this.translate.get("MODAL.FEWSECONDSAGO").subscribe((res) => {
      this.dateCommentedText = res;
    })
  }

  close() {
    // this.viewCtrl.dismiss({ comments: this.comments, count: this.commentsAdded });
    this.viewCtrl.dismiss({});
  }

  getComments(infiniteScroll?: InfiniteScroll) {
    console.log(this.tempComments);
    if (this.entity.WallComment && this.entity.WallID && this.entity.WallID !== 0) {
      return;
    }
    if (this.tempComments.length >= 0 && this.tempComments.length < 10 && infiniteScroll) {
      infiniteScroll.enable(false);
    }

    this.page++;

    let contentId = (this.entity.Entity && this.entity.Entity.ContentID) || (this.entity.ContentID) || (this.entity.EventID) || (this.entity.WallID);
    this.contentProvider.getContentComments(contentId, this.page)
      .finally(() => {
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
      .do(response => {
        if (!response.ResponseData && infiniteScroll) {
          infiniteScroll.enable(false);
          this.page--; // Restore page back to the last correct page
        }
      })
      .subscribe(res => {
        this.handleComments(res);
        if (res.ResponseData && res.ResponseData.length < 10 && infiniteScroll) {
          infiniteScroll.enable(false);
        }
      })
  }

  private handleComments(response) {
    if (response.ResponseData) {
      this.comments = this.comments.concat(response.ResponseData);
      this.tempComments = this.tempComments.concat(response.ResponseData);
      console.log(this.tempComments);
      this.comments = this.contentProvider.getNestedChildren(this.comments, 0);
    }
  }

  prepareComment($event) {
    this.content.scrollToTop(500);
    this.parentId = $event.CommentID;
    this.parentComment = $event;
    this.textarea.setFocus();
    this.keyboard.show();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.textarea.setFocus();
    }, 550);
  }

  createComment() {
    if (this.commentText.replace(/\s/g, '') !== "") {
      var pp = this.commentText.split('\n');
      this.commentText = '';
      let tmptext = '';
      for(var k = 0; k < pp.length; k++){
        tmptext += '<p>'+pp[k]+'</p>';
      }
      let data = {
        CommentText: tmptext,
        EntityID: (this.entity.Entity && this.entity.Entity.ContentID) || (this.entity.ContentID) || (this.entity.EventID) || (this.entity.WallID),
        EntityType: (this.entity.Entity && this.entity.Entity.EntityType) || (this.entity.EntityType)
      };
      if (this.entity.EventID && !data.EntityType) {
        data.EntityType = 5;
      }
      if (this.entity.WallID && !data.EntityType) {
        data.EntityType = 10;
        this.parentId = null;
      }
      this.isLoading = true;
      if (this.parentId == null) {
        this.contentProvider.createComment(data).subscribe(res => {
          if (!res.IsError && res.ResponseData) {
            let entityCommentId = 0;
            switch (data.EntityType) {
              case 3:
                entityCommentId = 24;
                break;
              case 4:
                entityCommentId = 25;
                break;
              case 5:
                entityCommentId = 26;
                break;
              case 7:
                entityCommentId = 29;
                break;
              case 9:
                entityCommentId = 31;
                break;
              case 44:
                entityCommentId = 45;
                break;
              case 10:
                entityCommentId = 33;
                break;
              case 18:
                entityCommentId = 28;
                break;
              case 14:
                entityCommentId = 32;
                break;
            }
            this.presentToast();
            let comment = {
              CommentID: res.ResponseData,
              UserAvatarVirtualPath: this.user.AvatarImageURL,
              CommentText: tmptext,
              CommentTextFormatted: tmptext,
              CommentTextHtmlFormatted: tmptext,
              UserDisplayName: this.user.UserInfoDisplayName,
              DateCommentedText: this.dateCommentedText,
              UserID: this.user.UserID,
              CommentEntityType: entityCommentId,
              ParentCommentID: 0,
            };
            
            if (res.ResponseData.CommentID) {
              comment.CommentID = res.ResponseData.CommentID;
            }
            // console.log(comment.CommentText.split('\n'));
            //comment.CommentText = comment.CommentText.split('\n').join('<br/>');
            console.log(comment);
            tmptext = "";
            this.comments.push(comment);
            this.tempComments.push(comment);
            if (this.comments.length > 10) {
              this.comments.shift();
            }
            ++this.commentsAdded;
            this.isLoading = false;
            setTimeout(() => {
              this.content.scrollToBottom(1000);
            }, 300);
            this.events.publish('comment:created', 1);
          }
        });
      } else {
        data['ParentCommentID'] = this.parentId;
        this.content.scrollToTop();
        this.contentProvider.createComment(data).subscribe(res => {
          if (!res.IsError && res.ResponseData) {
            this.presentToast();
            let entityCommentId = 0;
            switch (data.EntityType) {
              case 3:
                entityCommentId = 24;
                break;
              case 4:
                entityCommentId = 25;
                break;
              case 5:
                entityCommentId = 26;
                break;
              case 7:
                entityCommentId = 29;
                break;
              case 9:
                entityCommentId = 31;
                break;
              case 44:
                entityCommentId = 45;
                break;
              case 10:
                entityCommentId = 33;
                break;
              case 18:
                entityCommentId = 28;
                break;
              case 14:
                entityCommentId = 32;
                break;
            }
            let comment = {
              ParentCommentID: this.parentId,
              CommentID: res.ResponseData,
              UserAvatarVirtualPath: this.user.AvatarImageURL,
              CommentText: tmptext,
              CommentTextFormatted: tmptext,
              CommentTextHtmlFormatted: tmptext,
              UserDisplayName: this.user.UserInfoDisplayName,
              DateCommentedText: this.dateCommentedText,
              UserID: this.user.UserID,
              CommentEntityType: entityCommentId
            };
            
            if (res.ResponseData.CommentID) {
              comment.CommentID = res.ResponseData.CommentID;
            }
            //comment.CommentText.replace(/\n/g, '<br/>');
            this.parentId = null;
            tmptext = "";
            this.tempComments.push(comment);
            this.deleteNested();
            this.comments = this.contentProvider.getNestedChildren(this.tempComments, 0);
            ++this.commentsAdded;
            this.isLoading = false;
            this.content.scrollToTop().then(() => {
              this.scrollTo('comment' + res.ResponseData);
            });
            this.events.publish('comment:created', 1);
          }
        });
      }
    }
  }

  deleteNested() {
    for (let i = 0; i < this.tempComments.length; ++i) {
      if (this.tempComments[i].children) {
        this.tempComments[i].children = [];
      }
    }
  }

  presentToast() {
    this.translate.get("MODAL.COMMENTSUCCESS").subscribe((res) => {      
      const toast = this.toastCtrl.create({
        message: res,
        position: "bottom",
        duration: 2000
      });
      toast.present();
    })
    
  }

  scrollTo(elementId: string) {
    let yOffset = document.getElementById(elementId).offsetTop;
    this.content.scrollTo(0, yOffset, 4000)
  }

}
