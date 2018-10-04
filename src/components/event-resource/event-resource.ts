import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ResourceMultiSelectModalComponent } from '../../modals/resource-multi-select-modal/resource-multi-select';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the EventResourceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'event-resource',
  templateUrl: 'event-resource.html'
})
export class EventResourceComponent {
  allItems: any = [];
  tmpItems: any = [];
  selectedItems: any = [];
  label: any;
  searchString = '';  
  isSearch: boolean = true;
  isRequired: boolean;

  timer: any;

  @Input()
  set entity(entity: any) {    
    this.allItems = entity.allItems;    
    this.tmpItems = entity.allItems;
    this.selectedItems = entity.selectedresources;
    this.isRequired = entity.isRequired;
    this.label = entity.label;
  }
  @Output() select = new EventEmitter<any>();

  constructor(
    private modalCtrl: ModalController,
  ) {    
  }

  ngAfterViewInit(){
  }

  notifySelect(){    
    this.select.emit(this.selectedItems);
  }

  openModal(){
    let modal = this.modalCtrl.create(ResourceMultiSelectModalComponent, {items: this.allItems});
    modal.present();
    modal.onDidDismiss((data) =>{
      if(data == undefined)
        return;
      this.selectedItems = data.items;
      for(let i = 0; i < this.selectedItems.length; i++){
        for(let j = 0; j < this.allItems.length; j++){
          if(this.allItems[j].value == this.selectedItems[i].value){
            this.allItems[j].selected = true;
          }
        }
      }
      this.notifySelect();
    });
  }
}
