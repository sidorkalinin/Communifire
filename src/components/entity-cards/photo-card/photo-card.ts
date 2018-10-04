import { Component, Input } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CommentModalComponent } from '../../comment-modal/comment-modal';

@Component({
  selector: 'photo-card',
  templateUrl: 'photo-card.html'
})
export class PhotoCardComponent {
  @Input() activity;
  likesCount: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) { }

  goToProfile() {
    let id = 0;
    if(this.activity.AuthorID){
      id = this.activity.AuthorID;
    } else if(this.activity.UserID){
      id = this.activity.UserID;
    } else {
      id = this.activity.AuthorUserID;
    }
    this.navCtrl.push('profile', {
      id: id
    });
  }

  goToAlbum() {
    if(this.activity.Entity){
      this.navCtrl.push('photos', {
        id: this.activity.ParentEntityID,
        title: this.activity.SpaceName
      })
    } else {
      this.navCtrl.push('photos', {
        id: this.activity.ContentID,
        title: this.activity.SpaceName
      })
    }
    
  }

  setCount($event){
    this.likesCount = $event;
  }

  openComment() {
    let modal = this.modalCtrl.create(CommentModalComponent, { entity: this.activity });
    modal.present();
  }
}
