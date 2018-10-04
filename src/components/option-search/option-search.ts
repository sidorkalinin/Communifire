import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SelectSearchModalComponent } from '../../modals/select-search-modal/select-search';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the CaseOptionSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'option-search',
  templateUrl: 'option-search.html'
})
export class OptionSearchComponent implements AfterViewInit{
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
    if(this.timer != undefined){
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      for(var i = 0; i < that.allItems.length; i++){        
        if(that.allItems[i].default == true){          
          that.allItems[i].default = false;
          that.selectedItem = that.allItems[i];          
          clearInterval(that.timer);
          that.notifySelect();
        }
      }
    }, 500);
    for(var i = 0; i < that.allItems.length; i++){
      if(that.allItems[i].default == true){
        that.allItems[i].default = false;
        that.selectedItem = that.allItems[i];        
        clearInterval(this.timer);
        that.notifySelect();
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
    let modal = this.modalCtrl.create(SelectSearchModalComponent, {items: this.allItems, label: this.label});
    modal.present();
    modal.onDidDismiss((data) =>{
      if(data == undefined)
        return;
      this.selectedItem = data.item;      
      this.notifySelect();
    });
  }
}
