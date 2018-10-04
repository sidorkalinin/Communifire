import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the AnnouncementComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'announcement',
  templateUrl: 'announcement.html'
})
export class AnnouncementComponent {

  @Input() announcement;
  @Output() open = new EventEmitter<any>();
  communityUrl = localStorage.getItem('community_url');
  constructor(
    public navCtrl: NavController
  ) {
    
  }

  goToDetails(): void {
    this.open.emit(this.announcement);
  }
}
