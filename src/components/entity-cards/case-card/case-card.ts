import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { CaseCommentModalComponent } from '../../case-comment-modal/case-comment-modal';
import { COMMON_URLS } from '../../../util/constants';

@Component({
  selector: 'case-card',
  templateUrl: 'case-card.html'
})
export class CaseCardComponent implements OnChanges {
  @Input() case;
  private checkUrl: RegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  private communityUrl: string = localStorage.getItem('community_url');
  likesCount: any;
  avatarImageURL: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.avatarImageURL = COMMON_URLS.AVATAR_DEFAULT_IMAGE;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.case.currentValue) {
      const caseImage = this.case.TitleImageURL;

      if (caseImage && caseImage.length) {
        if (!this.checkUrl.test(caseImage)) {
          this.case.TitleImageURL = this.communityUrl + caseImage;
        }
      }
    }
  }

  setCount($event) {
    this.likesCount = $event;
  }

  goToCase() {
    this.navCtrl.push('cases', {
      id: this.case.ActivityEntityID
    });
  }

  goToProfile() {
    this.navCtrl.push('profile', {
      id: this.case.UserID
    });
  }

  openComment() {
    let modal = this.modalCtrl.create(CaseCommentModalComponent, {
      id: this.case.ActivityEntityID,
      case: this.case
    });
    modal.present();
  }

}
