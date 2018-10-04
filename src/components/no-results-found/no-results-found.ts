import { Component } from '@angular/core';

/**
 * Generated class for the NoResultsFoundComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'no-results-found',
  templateUrl: 'no-results-found.html'
})
export class NoResultsFoundComponent {

  text: string;

  constructor() {
    console.log('Hello NoResultsFoundComponent Component');
    this.text = 'Hello World';
  }

}
