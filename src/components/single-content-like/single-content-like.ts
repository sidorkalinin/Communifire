import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ContentProvider } from '../../providers/content';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { Vibration } from '@ionic-native/vibration';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'single-content-like',
  templateUrl: 'single-content-like.html'
})
export class SingleContentLikeComponent implements OnChanges {

  @Input() contentID: number;
  @Input() entityType: number;
  @Input() isCard: boolean;
  @Input() isComment: boolean;
  @Input() likeDislikeCountResult: any;
  @Output() getCount = new EventEmitter<any>()
  likeDetails: any = {};

  constructor(
    private contentProvider: ContentProvider,
    public taptic: TapticEngine,
    public vibration: Vibration,
    public platform: Platform
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.contentID.currentValue) {
      this.getLikeCount();
    }
  }

  getLikeCount() {
    if (this.likeDislikeCountResult != null) {
      // If we have already got LikeDislikeCountResult via api then use it instead of hitting like/dislike on each record.
      this.likeDetails = this.likeDislikeCountResult;
      this.getCount.emit(this.likeDetails);
    }
    else {
      this.contentProvider.getContentLike(this.contentID, this.entityType)
        .subscribe(response => {
          this.likeDetails = response.ResponseData;
          this.getCount.emit(this.likeDetails);
        });
    }
  }

  vibrate() {
    if (this.platform.is("android")) {
      this.vibration.vibrate(50);
    }
  }

  postLike() {
    this.likeDetails.DoesCurrentUserLikes = true;
    ++this.likeDetails.LikeCount;
    this.getCount.emit(this.likeDetails);
    this.taptic.impact({ style: 'light' });
    this.vibrate();
    this.contentProvider.postLike(this.contentID, this.entityType).subscribe(res => {

    }, error => {
      this.likeDetails.DoesCurrentUserLikes = false;
      --this.likeDetails.LikeCount;
    })
  }

  deleteLike() {
    this.likeDetails.DoesCurrentUserLikes = false;
    --this.likeDetails.LikeCount;
    this.getCount.emit(this.likeDetails);
    this.contentProvider.deleteLike(this.contentID, this.entityType).subscribe(res => {

    }, error => {
      this.likeDetails.DoesCurrentUserLikes = true;
      ++this.likeDetails.LikeCount;
    })
  }

}
