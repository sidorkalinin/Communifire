import { Component } from '@angular/core';

/**
 * Generated class for the TypeToSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'type-to-search',
  templateUrl: 'type-to-search.html'
})
export class TypeToSearchComponent {

  text: string;

  constructor() {
    console.log('Hello TypeToSearchComponent Component');
    this.text = 'Hello World';
  }

}
