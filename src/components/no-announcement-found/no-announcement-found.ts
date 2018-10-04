import { Component } from '@angular/core';

/**
 * Generated class for the NoAnnouncementFoundComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'no-announcement-found',
  templateUrl: 'no-announcement-found.html'
})
export class NoAnnouncementFoundComponent {

  text: string;

  constructor() {
    console.log('Hello NoAnnouncementFoundComponent Component');
    this.text = 'Hello World';
  }

}
