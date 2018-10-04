import { Component } from '@angular/core';

/**
 * Generated class for the EmptyPeopleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'empty-people',
  templateUrl: 'empty-people.html'
})
export class EmptyPeopleComponent {

  text: string;

  constructor() {
    console.log('Hello EmptyPeopleComponent Component');
    this.text = 'Hello World';
  }

}
