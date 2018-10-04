import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'people-list',
  templateUrl: 'people-list.html'
})

export class PeopleListComponent {
  @Input() hascheckbox: boolean = false;
  @Input() peoples;
  @Input() isLoading;
  @Input() isLoadingSearch;
  @Output() doSearch: EventEmitter<string> = new EventEmitter();
  @Output() returnArray: EventEmitter<any> = new EventEmitter();

  @Input() array;

  searchText: string = "";

  isSelected(people){
    if (this.hascheckbox){
      return (this.array[people.UserID] && this.array[people.UserID].selected);
    }
  }

  isInvited(people){
    if (this.hascheckbox){
      return (this.array[people.UserID] && this.array[people.UserID].invited == true);
    }
    return false;
  }

  constructor() { }

  search(event) {
    this.searchText = event.target.value;
    this.doSearch.emit(event.target.value)
  }

  addToArray($event){
    this.array[$event.person.UserID] = {
      selected: $event.selected,
      invited: false
    }
    this.returnArray.emit(this.array);
  }

  keyUp(){
    if(this.searchText && this.searchText.length != 0){
      // this.isLoadingSearch = true;
      this.peoples = [];
    } else {
      // this.doSearch.emit("")
    }
  }
  onCancel($event) {
    this.searchText = '';
    this.doSearch.emit(this.searchText);
  }

}
