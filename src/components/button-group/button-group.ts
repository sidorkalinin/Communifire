import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'button-group',
  templateUrl: 'button-group.html'
})
export class ButtonGroupComponent {
  @Input() buttons: any;
  @Input() selected: number = 0;
  @Output() changed: EventEmitter<{index: number, text: string}> = new EventEmitter();

  constructor() { }

  select(text, index) {
    if (this.selected !== index) {
      this.selected = index;
      this.changed.emit({ index, text });
    }
  }
}
