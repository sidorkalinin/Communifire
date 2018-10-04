import { Component } from '@angular/core';

/**
 * Generated class for the EmptyDiscussionCategoryCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'empty-discussion-category-card',
  templateUrl: 'empty-discussion-category-card.html'
})
export class EmptyDiscussionCategoryCardComponent {

  text: string;

  constructor() {    
    this.text = 'Hello World';
  }

}
