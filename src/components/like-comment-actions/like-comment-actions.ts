import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { CommentModalComponent } from '../comment-modal/comment-modal';
import { CaseCommentModalComponent } from "../case-comment-modal/case-comment-modal";

@Component({
  selector: 'like-comment-actions',
  templateUrl: 'like-comment-actions.html'
})
export class LikeCommentActionsComponent implements OnChanges {

  @Input() entity;
  @Input() isStream = true;
  @Output() likeCount = new EventEmitter<any>();
  contentId: number = null;
  entityType: number = null;
  likeDislikeCountResult: any;

  constructor(
    public modalCtrl: ModalController,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.entity) {
      this.entityType = this.entity.ActivityEntityTypeID;
      this.contentId = (this.entity.ActivityEntityID) || (this.entity.WallID);
      if (this.entity.WallID && !this.entityType) {
        this.entityType = 10;
      }
      this.likeDislikeCountResult = this.entity.LikeDislikeCountResult;
    }
  }

  returnCount($event) {
    this.likeCount.emit($event);
  }

  openModal() {
    console.log(this.entity);
    if (this.entity.ActivityEntityTypeID === 19) {
      let modal = this.modalCtrl.create(CaseCommentModalComponent, {
        id: this.entity.ActivityEntityID,
        case: this.entity
      });
      modal.present();
    } else {
      let modal = this.modalCtrl.create(CommentModalComponent, { entity: this.entity });
      modal.present();
    }

  }

}
