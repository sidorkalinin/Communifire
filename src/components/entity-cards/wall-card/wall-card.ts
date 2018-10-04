import { Component, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CommentModalComponent } from '../../comment-modal/comment-modal';

@Component({
  selector: 'wall-card',
  templateUrl: 'wall-card.html'
})

export class WallCardComponent {
  @Input() activity;
  likeDetails;
  likesCount: any;
  b_badge :boolean = false;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) { 
    
  }

  goToEntity() {
    if (this.activity.ActivityEntityTypeID === 13) {
      this.navCtrl.push('space-details', {
        id: this.activity.ActivityEntityID
      });
    }
    if (this.activity.ActivityEntityTypeID === 10) {
      this.navCtrl.push('wallpost', {
        id: this.activity.WallID
      });
    }    
  }

  goToWallPost(){
    if (this.activity.ActivityEntityTypeID === 10) {
      this.navCtrl.push('wallpost', {
        id: this.activity.WallID
      });
    }
  }

  goToProfile() {
    this.navCtrl.push('profile', {
      id: this.activity.UserID
    });
  }


  setCount($event){
    this.likesCount = $event;
  }

  openComment() {
    console.log(this.activity);
    let modal = this.modalCtrl.create(CommentModalComponent, { entity: this.activity });
    modal.present();
  }

}
