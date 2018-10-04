import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NavController } from 'ionic-angular';
import { COMMON_URLS } from '../../util/constants';

@Component({
  selector: 'person',
  templateUrl: 'person.html'
})

export class PersonComponent {
  @Input() person;
  @Input() hascheckbox: boolean = false;
  @Output() checkPress = new EventEmitter<any>();

  @Input() selected: boolean = false;
  @Input() invited: boolean = false;
  avatarImageURL: string;

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() {
    this.avatarImageURL = COMMON_URLS.AVATAR_DEFAULT_IMAGE;
  }

  goToDetails() {
    this.navCtrl.push('profile', {
      id: this.person.UserID
    });
  }

  onSelect() {
    this.checkPress.emit({ person: this.person, selected: this.selected });
  }
}
