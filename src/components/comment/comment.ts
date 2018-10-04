import { Component, Input, Output, EventEmitter, SimpleChanges, IterableDiffers } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'comment',
  templateUrl: 'comment.html'
})
export class CommentComponent {

  @Input() comments;
  @Input() step;
  @Output() sendParent = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.comments && this.comments && this.comments[0]){
      this.entityType = this.comments[0].CommentEntityType;
      if(this.comments[0].WallID){
        this.entityType = 33;
      }
    }
  }

  public iterableDiffer;

  ngDoCheck(){
    let changes = this.iterableDiffer.diff(this.comments);
    if (changes) {
      if (this.comments && this.comments.length > 0){
        this.entityType = this.comments[0].CommentEntityType;
        if(this.comments[0].WallID){
          this.entityType = 33;
        }
      }
    }
  }

  entityType: number = null;

  constructor( public navCtrl: NavController, private _iterableDiffers: IterableDiffers ) {
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
    
  }

  goToProfile(comment) {
    let active = this.navCtrl.getActive();
    this.navCtrl.push('profile', {
      id: comment.UserID
    });
    this.navCtrl.removeView(active);
  }

  createChildComment(comment){
    this.sendParent.emit(comment);
  }

  counter: number = 0;

  setCount($event){
    for (let i = 0; i < this.comments.length; ++i){
      if ($event.EntityID == this.comments[i].CommentID){
        this.comments[i]['likeCount'] = $event;
      }
    }
  }

}
