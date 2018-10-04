import { Component, EventEmitter, Output, Input } from '@angular/core';

/**
 * Generated class for the CaseSelectSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'case-select-search',
  templateUrl: 'case-select-search.html'
})
export class CaseSelectSearchComponent {

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
    this.allItems = entity.allItems;    
    this.tmpItems = entity.allItems;
    this.isRequired = entity.isRequired;
    this.label = entity.label;

    var that = this;
    this.timer = setInterval(() => {
      for(var i = 0; i < that.allItems.length; i++){
        if(that.allItems[i].default == true){
          that.selectedItem = that.allItems[i];
          that.notifySelect();
          clearInterval(that.timer);
        }
      }
    }, 500);
    for(var i = 0; i < that.allItems.length; i++){
      if(that.allItems[i].default == true){
        clearInterval(this.timer);
        that.selectedItem = that.allItems[i];        
      }
    }
  }
  @Output() select = new EventEmitter<any>();

  constructor() {
        
  }

  notifySelect(){
    this.select.emit(this.selectedItem);
  }

  focus(){
    if(this.isSearch == true){
      this.isSearch = false;
      this.searchString = '';
      this.search();
    }      
    else if(this.isSearch == false)
      this.isSearch = true;    
  }
  checkBlur(){
    this.isSearch = true;
  }
  // Topic
  search() {
    // reset countries list with initial call
    this.tmpItems = this.allItems;

    // set q to the value of the searchbar
    var q = this.searchString;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
        return true;
    }

    this.tmpItems = this.tmpItems.filter((v) => {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
      }
      return false;
    })
  }

  choose(item){
    this.selectedItem = item;
    this.isSearch = true;
    clearInterval(this.timer);
    this.notifySelect();
  }
}
