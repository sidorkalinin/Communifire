import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
  selector: 'comments-count',
  templateUrl: 'comments-count.html'
})
export class CommentsCountComponent {
  @Input() comments: number;

  constructor(public events: Events) {
    events.subscribe('comment:created', (value) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.comments = this.comments + 1
    });
  }
}
