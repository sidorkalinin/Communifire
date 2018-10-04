import { Component, Input  } from '@angular/core';

/**
 * Generated class for the DefaultHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'default-header',
  templateUrl: 'default-header.html'
})
export class DefaultHeaderComponent {

  @Input() title: string;

  constructor() {

  }

}
