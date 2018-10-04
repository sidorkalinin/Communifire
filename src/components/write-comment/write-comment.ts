import { Component } from '@angular/core';
import { AuthenticationProvider } from '../../providers/authentication';

@Component({
  selector: 'write-comment',
  templateUrl: 'write-comment.html'
})
export class WriteCommentComponent {

  user: any = {}

  constructor(
    public authenticationCtrl: AuthenticationProvider,
  ) {
    this.authenticationCtrl.user$.filter(user => user !== null).subscribe(user => {
      this.user = user;
    });
  }

}
