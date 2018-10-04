import { Component, Input } from '@angular/core';
import { SpacesProvider } from '../../providers/spaces';

@Component({
  selector: 'spaces-list',
  templateUrl: 'spaces-list.html'
})
export class SpacesListComponent {
  @Input() spaces;
  @Input() isLoading;
  @Input() isAll;
  @Input() notMe;
  @Input() topLevel: any;
  constructor(
    public spacesProvider: SpacesProvider
  ) {
    
  }

}
