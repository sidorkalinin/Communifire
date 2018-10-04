import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the AddSpaceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-space',
  templateUrl: 'add-space.html'
})
export class AddSpaceComponent {
  constructor(public navCtrl: NavController) {
  }

  click(){
    this.navCtrl.push('space-create');
  }
}
