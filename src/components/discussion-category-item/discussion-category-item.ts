import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";

@Component({
  selector: 'discussion-category-item',
  templateUrl: 'discussion-category-item.html'
})
export class DiscussionCategoryItemComponent {  

  @Input() discussion;

  goToDiscussion(){
    this.navCtrl.push('discussion-category', {
      id: this.discussion.ContentID,
      title: this.discussion.SpaceName,
      spaceId: this.discussion.SpaceID,
      subTitle: this.discussion.ContentTitle      
    })
  }

  constructor(public navCtrl: NavController) {
  }

}
