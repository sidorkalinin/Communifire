import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the PeopleRequestComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'people-request',
  templateUrl: 'people-request.html'
})
export class PeopleRequestComponent {

  @Input() peoples;
  @Output() approve: EventEmitter<any> = new EventEmitter();
  @Output() decline: EventEmitter<any> = new EventEmitter();

  constructor(
    public navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private translate: TranslateService,
  ) {
  }

  goToDetails(person: any) {
    this.navCtrl.push('profile', {
      id: person.UserID
    });
  }

  approveUser(person: any) {
    this.approve.emit(person)
  }
  
  declineUser(person: any) {
    this.decline.emit(person)
  }

  opensheet(person: any) {
    this.translate.get(["EXTRA.JOINREQUEST", "EXTRA.APPROVE", "EXTRA.DECLINE", "COMPONENT.CANCEL"]).subscribe((res) => {
      let actionSheet = this.actionSheetCtrl.create({
        title: res['EXTRA.JOINREQUEST'],
        buttons: [
          {
            text: res['EXTRA.APPROVE'],
            handler: () => {
              this.approveUser(person);
            }
          },
          {
            text: res['EXTRA.DECLINE'],
            handler: () => {
              this.declineUser(person);
            }
          },          
          {
            text: res['COMPONENT.CANCEL'],
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    });
  }

}
