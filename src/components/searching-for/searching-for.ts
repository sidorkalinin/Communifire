import { Component, Input } from '@angular/core';

@Component({
  selector: 'searching-for',
  templateUrl: 'searching-for.html'
})
export class SearchingForComponent {

  @Input() text: string;

  constructor() {
  }

}
