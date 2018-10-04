import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from "ionic-angular";

/**
 * Generated class for the DiscussionCategorySelectItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'discussion-category-select-item',
  templateUrl: 'discussion-category-select-item.html'
})
export class DiscussionCategorySelectItemComponent {

  @Input() discussion;
  @Output() select = new EventEmitter<any>();

  notifySelect(){
    this.select.emit(this.discussion);
  }

  constructor(public navCtrl: NavController) {
  }

}
