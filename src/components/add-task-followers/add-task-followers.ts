import { Component } from '@angular/core';

/**
 * Generated class for the AddTaskFollowersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-task-followers',
  templateUrl: 'add-task-followers.html'
})
export class AddTaskFollowersComponent {

  text: string;

  constructor() {
    console.log('Hello AddTaskFollowersComponent Component');
    this.text = 'Hello World';
  }

}
