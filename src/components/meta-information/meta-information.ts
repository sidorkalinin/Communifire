import { Component, EventEmitter, Output, Input } from '@angular/core';

/**
 * Generated class for the MetaInformationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'meta-information',
  templateUrl: 'meta-information.html'
})
export class MetaInformationComponent {
  isMore: boolean = false;  
  text: string;
  metaTitle: any;
  metaDescription: any;

  @Output() meta = new EventEmitter<any>();
  metaInfo: any;

  constructor() {
    console.log('Hello MetaInformationComponent Component');
    this.text = 'Hello World';
  }
  
  @Input()
  set entity(entity: any) {
    this.metaTitle = entity.metaTitle;
    this.metaDescription = entity.metaDescription
  }
  returnInfo(){
    this.metaInfo = {
      metaTitle: this.metaTitle,
      metaDescription: this.metaDescription
    };
    this.meta.emit(this.metaInfo);
  }

  showMore(){    
    this.isMore = !this.isMore;
  }
}
