import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
/**
 * Generated class for the AddForumComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-forum',
  templateUrl: 'add-forum.html'
})
export class AddForumComponent {
  @Input() entity;

  constructor(public navCtrl: NavController) {
  }

  click(){
    this.navCtrl.push('forum-create', {spaceId: this.entity.spaceId});
  }
}
