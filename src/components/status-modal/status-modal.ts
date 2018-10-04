import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from 'ionic-angular';
import 'rxjs/add/operator/filter';

import { AuthenticationProvider } from '../../providers/authentication';
import { StatusUpdateComponent } from '../status-update/status-update';
import { Utilities } from '../../util/utilities';
@Component({
  selector: 'status-modal',
  templateUrl: 'status-modal.html'
})
export class StatusModalComponent implements OnInit {
  userAvatar;

  @Input() spaceId: number = 0;
  @Input() toUser: string;
  @Input() isText: boolean;
  @Output() modalClose = new EventEmitter<any>();

  constructor(
    public modalCtrl: ModalController,
    private authenticationProvider: AuthenticationProvider,
    private utilities: Utilities
  ) {
  }

  ngOnInit() {
    this.userAvatar = this.authenticationProvider.getMyAvatarImageURL();
  }

  openStatusModal() {
    let modal = this.modalCtrl.create(StatusUpdateComponent, { spaceId: this.spaceId, toUser: this.toUser, isText: this.isText });
    modal.present();
    modal.onDidDismiss(data => {
      if (data.created) {
        let user = this.authenticationProvider.user$['source']['_value'];
        let temp = {
          WallID: data.wallId,
          result: true,
          EntityType: 10,
          UserID: user.UserID,
          UserAvatarFullUrl: user.AvatarImageURL,
          UserDisplayName: user.UserInfoDisplayName,
          WallText: data.content,
          WallComment: [],
          CanBeLiked: true,
          CanBeCommented: true,
          WallTextHtmlFormatted: data.content,
          Entity: {
            EntityType: 10
          }
        }
        if (data.files.length > 0) {
          let ChildNewsFeed = {
            Subject: data.directory.DirectoryName,
            ActionText: "added " + data.files.length + " new files to the file directory",
            Files: [

            ]
          }
          for (let index = 0; index < data.files.length; ++index) {
            let title = data.files[index].split('/');
            title = title[title.length - 1];
            ChildNewsFeed.Files.push({
              ContentTitle: title
            });
          }
          temp['ChildNewsFeed'] = ChildNewsFeed;
        }
        if (data.content === "") {
          temp.result = false;
        }
        this.modalClose.emit(temp);
      }
    });
  }

}
