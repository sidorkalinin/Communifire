import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PeopleMultiSelectModalComponent } from '../../modals/people-multi-select-modal/people-multi-select';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the EventGuestsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'space-people-select',
  templateUrl: 'space-people-select.html'
})
export class SpacePeopleSelectComponent {
  spaceid: any;
  selectedItems: any = [];
  label: any;
  label2: any;

  @Input()
  set entity(entity: any) {    
    this.spaceid = entity.spaceid;
    this.label = entity.label; 
    this.label2 = entity.label2;
    this.selectedItems = entity.selecteditems != undefined?entity.selecteditems:[];    
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
    let modal = this.modalCtrl.create(PeopleMultiSelectModalComponent, {spaceid: this.spaceid, selectedItems: this.selectedItems, label: this.label, label2: this.label2});
    modal.present();
    modal.onDidDismiss((data) =>{
      if(data == undefined)
        return;
      //this.selectedItems = [];  
      for (let key of Object.keys(data.items)) {
        if(data.items[key].selected == true){
          if(this.selectedItems.indexOf(Number(key).toString()) == -1)
            this.selectedItems.push(Number(key).toString());
        } else{
          if(this.selectedItems.indexOf(Number(key).toString()) > -1){
            this.selectedItems = this.selectedItems.filter(v => {
              if(v == Number(key).toString())
                return false;
              else 
                return true;
            })
          }
        }
      }
      //console.log(this.selectedItems);
      this.notifySelect();
    });
  }
}
