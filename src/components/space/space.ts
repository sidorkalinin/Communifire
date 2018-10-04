import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { COMMON_URLS } from '../../util/constants';

@Component({
  selector: 'space',
  templateUrl: 'space.html'
})

export class SpaceComponent {
  @Input() space;
  @Input() isAll;
  communityUrl = localStorage.getItem('community_url');
  spaceDefaultImageURL: string;

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.spaceDefaultImageURL = COMMON_URLS.SPACE_DEFAULT_IMAGE;
  }

  goToDetails(): void {
    this.navCtrl.push('space-details', {
      id: this.space.SpaceID,
    });
  }
}
