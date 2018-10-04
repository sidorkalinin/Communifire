import { Component } from '@angular/core';

/**
 * Generated class for the EmptyNotificationComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'empty-notification',
  templateUrl: 'empty-notification.html'
})
export class EmptyNotificationComponent {

  text: string;

  constructor() {
    console.log('Hello EmptyNotificationComponent Component');
    this.text = 'Hello World';
  }

}
