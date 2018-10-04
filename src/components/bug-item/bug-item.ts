import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'bug-item',
  templateUrl: 'bug-item.html'
})
export class BugItemComponent {

  @Input() item;

  constructor(public navCtrl: NavController) {
  }

  goToItem(){
    this.navCtrl.push('discussion-item',{
      id: this.item.ContentID
    })
  }

}
