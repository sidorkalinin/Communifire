import { Component, Input } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/**
 * Generated class for the SpaceForModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'space-for-modal',
  templateUrl: 'space-for-modal.html'
})
export class SpaceForModalComponent {
  @Input() space;
  @Input() isAll;
  communityUrl = localStorage.getItem('community_url');

  constructor(
    public navCtrl: NavController,
    public viewCtrl:ViewController
  ) { }

  goToDetails(): void {
    this.viewCtrl.dismiss({id: this.space.SpaceID});
  }
}
