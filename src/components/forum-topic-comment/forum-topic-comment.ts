import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NavController } from "ionic-angular";
import { ContentProvider } from '../../providers/content';
//import { Content } from 'ionic-angular/navigation/nav-interfaces';

@Component({
  selector: 'forum-topic-comment',
  templateUrl: 'forum-topic-comment.html'
})
export class ForumTopicCommentComponent implements OnChanges {

  @Input() comment: any;
  attachments: any = [];

  constructor(
    private navCtrl: NavController,
    private content: ContentProvider
  ) {
  }

  likes: any;

  setCount($event){
    this.likes = $event;
  }

  goToProfile(){
    this.navCtrl.push("profile", {
      id: this.comment.UpdatedByUserID
    });
  }

  getAttachments(){
    this.content.getAttachmentsById(this.comment.ContentID, 54).subscribe((res) => {
      if(!res.IsError){
        this.attachments = res.ResponseData;
      }
    })
  }

  ngOnChanges(changes?: SimpleChanges){
    if(changes.comment){
      this.getAttachments();
    }
  }

}
