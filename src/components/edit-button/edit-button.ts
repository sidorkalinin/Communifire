import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the EditButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'edit-button',
  templateUrl: 'edit-button.html'
})
export class EditButtonComponent {

  @Input() entity;

  constructor(public navCtrl: NavController) {
  }

  clickButton(){
    let contentId = this.entity.contentId;
    let entityType = this.entity.entityType;
    if(entityType == 'article'){
      this.navCtrl.push('article-edit', {contentId: contentId});
    }else if(entityType == 'blog'){
      this.navCtrl.push('blog-edit', {contentId: contentId});
    }else if(entityType == 'wiki'){
      this.navCtrl.push('wiki-edit', {contentId: contentId});
    }else if(entityType == 'album'){
      this.navCtrl.push('photo-edit', {contentId: contentId});
    }else if(entityType == 'video'){
      this.navCtrl.push('video-edit', {contentId: contentId});
    }else if(entityType == 'idea'){
      this.navCtrl.push('idea-edit', {contentId: contentId});
    }else if(entityType == 'case'){
      this.navCtrl.push('case-edit', {caseId: contentId});
    }else if(entityType == 'forum'){
      
    }else if(entityType == 'discussion'){
      this.navCtrl.push('discussion-edit', {contentId: contentId});      
    }else if(entityType == 'event'){
      this.navCtrl.push('event-edit', {contentId: contentId});
    }
  }
}
