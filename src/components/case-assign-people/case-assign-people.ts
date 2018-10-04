import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { PeopleOneSelectModalComponent } from '../../modals/people-one-select-modal/people-one-select';

/**
 * Generated class for the CaseAssignPeopleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'case-assign-people',
  templateUrl: 'case-assign-people.html'
})
export class CaseAssignPeopleComponent {
  allItems: any = [];
  tmpItems: any = [];
  selectedItem: any;
  label: any;
  searchString = '';  
  isSearch: boolean = true;
  isRequired: boolean;

  timer: any;

  @Input()
  set entity(entity: any) {
    this.selectedItem = {};
    this.allItems = entity.allItems;    
    this.tmpItems = entity.allItems;
    this.isRequired = entity.isRequired;
    this.label = entity.label;

    var that = this;
    this.timer = setInterval(() => {
      for(var i = 0; i < that.allItems.length; i++){        
        if(that.allItems[i].default == true){
          that.allItems[i].default = false;
          that.selectedItem = that.allItems[i];
          that.notifySelect();
          clearInterval(that.timer);
        }
      }
    }, 500);
    for(var i = 0; i < that.allItems.length; i++){
      if(that.allItems[i].default == true){
        that.allItems[i].default = false;
        that.selectedItem = that.allItems[i];
        that.notifySelect();
        clearInterval(this.timer);
        that.selectedItem = that.allItems[i];        
      }
    }
  }
  @Output() select = new EventEmitter<any>();

  constructor(
    private modalCtrl: ModalController,
  ) {
    
  }

  ngAfterViewInit(){
  }

  notifySelect(){    
    this.select.emit(this.selectedItem);    
  }

  openModal(){
    let modal = this.modalCtrl.create(PeopleOneSelectModalComponent, {items: this.allItems});
    modal.present();
    modal.onDidDismiss((data) =>{
      if(data == undefined)
        return;
      this.selectedItem = data.item;
      this.notifySelect();
    });
  }
}
