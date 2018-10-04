import { Component, Input } from '@angular/core';

@Component({
  selector: 'comments-count',
  templateUrl: 'comments-count.html'
})
export class CommentsCountComponent {
  @Input() comments: number;

  constructor() {
  }

}
