import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PeopleMultiSelectModalComponent } from '../../modals/people-multi-select-modal/people-multi-select';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the CaseAdditionalRecipientComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'case-additional-recipient',
  templateUrl: 'case-additional-recipient.html'
})
export class CaseAdditionalRecipientComponent {
  spaceid: any;
  selectedItems: any = [];
  label: any;

  @Input()
  set entity(entity: any) {    
    this.spaceid = entity.spaceid;
    this.label = entity.label;    
  }
  @Output() select = new EventEmitter<any>();

  constructor(
    private modalCtrl: ModalController,
  ) {
    
  }

  notifySelect(){    
    this.select.emit(this.selectedItems);
  }

  openModal(){
    let modal = this.modalCtrl.create(PeopleMultiSelectModalComponent, {spaceid: this.spaceid});
    modal.present();
    modal.onDidDismiss((data) =>{
      if(data == undefined)
        return;
      this.selectedItems = [];
      for (let key of Object.keys(data.items)) {
        this.selectedItems.push(key);
      }
      this.notifySelect();
    });
  }
}
