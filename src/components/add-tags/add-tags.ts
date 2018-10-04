import { Component, EventEmitter, Output, Input } from '@angular/core';

/**
 * Generated class for the AddTagsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-tags',
  templateUrl: 'add-tags.html'
})
export class AddTagsComponent {
  newtag: any;
  tagArray: any = [];
  text: string;
  
  @Output() tags = new EventEmitter<any>();

  constructor() {
    console.log('Hello AddTagsComponent Component');
    this.text = 'Hello World';
  }

  @Input()
  set entity(entity: any) {
    this.tagArray = entity.tags;
  }

  returnTags(){
    this.tags.emit(this.tagArray);
  }
  
  //Tag Input function
  removeTag(tag){
    for(var i = 0; i < this.tagArray.length; i++){
      if(this.tagArray[i] == tag){
        this.tagArray.splice(i , 1);
      }
    }
  }
  addTag(ev){
    if(this.newtag == undefined)
      return;
    let length = this.newtag.length;
    if(this.newtag[length -1] == ' ' || this.newtag[length-1] == ','){
      let i;
      for(i = 0; i < this.tagArray.length; i++){
        if(this.tagArray[i] == this.newtag.substring(0, length -1)){
          break;
        }
      }
      if( i == this.tagArray.length)
        this.tagArray.push(this.newtag.substring(0, length -1));
      this.newtag = '';
    }
    this.returnTags();
  }
}
