import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";

@Component({
  selector: 'case-item',
  templateUrl: 'case-item.html'
})
export class CaseItemComponent {

  @Input() case;

  text: string;

  constructor(
    private navCtrl: NavController
  ) {
  }

  navigateToCase(){
    this.navCtrl.push('cases', {
      id: this.case.IssueID
    })
  }

}
