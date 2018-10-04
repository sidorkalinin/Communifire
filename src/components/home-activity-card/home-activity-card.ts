import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CaseCommentModalComponent } from '../case-comment-modal/case-comment-modal';
import { CommentModalComponent } from '../comment-modal/comment-modal';

@Component({
  selector: 'home-activity-card',
  templateUrl: 'home-activity-card.html'
})
export class HomeActivityCardComponent implements OnChanges{
  @Input() activity;
  private checkUrl: RegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  private communityUrl: string = localStorage.getItem('community_url');
  likesCount: any;
  
  constructor (
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {}

  ngOnChanges (changes: SimpleChanges) {
    if (changes.activity.currentValue) {
      const activityImage = this.activity.ContentThumbImageFullURL;

      if (activityImage && activityImage.length) {
        if (!this.checkUrl.test(activityImage)) {
          this.activity.ContentThumbImageFullURL = this.communityUrl + activityImage;
        }
      }
    }
  }

  goToArticle() {
    this.navCtrl.push('articles', {
      id: this.activity.ContentID
    });
  }

  goToEntity() {
    if (this.activity.EntityType == 44){
      this.navCtrl.push('ideas', {
        id: this.activity.ContentID
      })
      return 0;
    }
    if (this.activity.EntityType == 7){
      this.navCtrl.push('videos', {
        id: this.activity.ContentID
      })
      return 0;
    }
    if (this.activity.EntityType == 4){
      this.navCtrl.push('blogs', {
        id: this.activity.ContentID
      })
      return 0;
    }
    if (this.activity.EntityType == 9){
      this.navCtrl.push('wikis', {
        id: this.activity.ContentID
      })
      return 0;
    }
    if (this.activity.EntityType == 18){
      this.navCtrl.push('photos', {
        id: this.activity.ContentID,
        title: this.activity.SpaceName
      })
      return 0;
    }
    if (this.activity.EntityType == 1){
      if(this.activity.SpaceID == 0){
        this.navCtrl.push('discussion-category', {
          id: this.activity.ContentID,
          title: this.activity.AuthorDisplayName,
          subTitle: this.activity.ContentTitle
        })
      } else {
        this.navCtrl.push('discussion-category', {
          id: this.activity.ContentID,
          title: this.activity.SpaceName,
          subTitle: this.activity.ContentTitle
        })
      }
      return 0;
    }
    if (this.activity.EntityType == 54){
      this.navCtrl.push('discussion-item',{
        id: this.activity.ContentID
      })
      return 0;
    }
    if (this.activity.EntityType == 14){
      this.navCtrl.push('files',{
        id: this.activity.ContentID
      })
      return 0;
    }
    if (this.activity.EntityType == 6){
      this.navCtrl.push('photos',{
        id: this.activity.ParentContentID
      })
      return 0;
    }
    this.goToArticle();
  }

  goToProfile() {
    let id = 0;
    if(this.activity.AuthorID){
      id = this.activity.AuthorID;
    } else {
      id = this.activity.AuthorUserID;
    }
    this.navCtrl.push('profile', {
      id: id
    });
  }

  getArticle(id){
    for(let i = 0; i < this.anTypes.length; ++i){
      if (id == this.anTypes[i]){
        return "ARTICLE.AN";
      }
    }
    return "ARTICLE.A";
  }

  

  setCount($event){
    this.likesCount = $event;
  }

  anTypes = [3, 5, 15, 18, 19, 20, 24, 26, 28, 43, 44, 45, 74];

  types = {
    1: "Forum",
    2: "ForumGroup",
    3: "Article",
    4: "Blog",
    5: "Event",
    6: "Photo",
    7: "Video",
    8: "Job",
    9: "Wiki",
    10: "Wall",
    11: "Poll",
    12: "CMSPage",
    13: "Space",
    14: "File",
    15: "User",
    18: "Album",
    19: "Issue",
    20: "IssueComment",
    24: "ArticleComment",
    25: "BlogComment",
    26: "EventComment",
    27: "PhotoComment",
    28: "AlbumComment",
    29: "VideoComment",
    30: "JobComment",
    31: "WikiComment",
    32: "FileComment",
    33: "WallComment",
    38: "TaskList",
    39: "TaskItem",        
    40: "FileDirectory",
    41: "PollVote",
    43: "IssueCommentInternal",
    44: "Idea",
    45: "IdeaComment",
    54: "ForumPost",
    55: "ForumTopic",
    57: "Calendar",
    65: "Milestone",
    74: "Universal",
    77: "TaskComment"
  };
  
  openModal() {
    if(this.activity.ActivityEntityTypeID === 19){
      let modal = this.modalCtrl.create(CaseCommentModalComponent, {
        id: this.activity.ActivityEntityID,
        case: this.activity 
      });
      modal.present();
    } else {
      let modal = this.modalCtrl.create(CommentModalComponent, { entity: this.activity });
      modal.present();
    }    
  }
}
