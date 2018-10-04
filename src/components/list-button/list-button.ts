import { Component, Input } from '@angular/core';

/**
 * Generated class for the ListButtonComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'list-button',
  templateUrl: 'list-button.html'
})
export class ListButtonComponent {

  @Input() icon;
  @Input() title;

  constructor() {
  }

}
