import { Component, Input } from '@angular/core';

/**
 * Generated class for the SpaceListForModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'space-list-for-modal',
  templateUrl: 'space-list-for-modal.html'
})
export class SpaceListForModalComponent {
  @Input() spaces;
  @Input() isLoading;
  @Input() isAll;
  @Input() notMe;
  topLevel: any = {
    SpaceID: 0,
    SpaceName: "Top Level Community",
    SpaceIconURL: "/Themes/default/images/space-default.png",
    SpaceVisibility: 4
  }
  constructor() {
  }
}
