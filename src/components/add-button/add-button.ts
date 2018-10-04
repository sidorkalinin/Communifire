import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
/**
 * Generated class for the AddButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-button',
  templateUrl: 'add-button.html'
})
export class AddButtonComponent {
  my_entity: any;
  @Input()
  set entity(entity){
    this.my_entity = entity;
  };

  constructor(
    public navCtrl: NavController,
  ) {
    
  }

  clickButton(){
    switch(this.my_entity.name){
      case 'Article': {
        this.navCtrl.push('article-create', {spaceId: this.my_entity.spaceId, title: this.my_entity.title});
        break;
      }
      case 'Blog': {
        this.navCtrl.push('blog-create', {spaceId: this.my_entity.spaceId, title: this.my_entity.title});
        break;
      }
      case 'Wiki': {
        this.navCtrl.push('wiki-create', {spaceId: this.my_entity.spaceId, title: this.my_entity.title});
        break;
      }
      case 'Photo Album': {
        this.navCtrl.push('photo-create', {spaceId: this.my_entity.spaceId, title: this.my_entity.title});
        break;
      }
      case 'Video': {
        this.navCtrl.push('video-create', {spaceId: this.my_entity.spaceId, title: this.my_entity.title});
        break;
      }
      case 'Idea': {
        this.navCtrl.push('idea-create', {spaceId: this.my_entity.spaceId, title: this.my_entity.title});
        break;
      }
      case 'File': {
        this.navCtrl.push('file-create', {spaceId: this.my_entity.spaceId, title: this.my_entity.title});
        break;
      }
      case 'Case': {
        this.navCtrl.push('case-create', {spaceId: this.my_entity.spaceId});
        break;
      }
      case 'Event': {
        this.navCtrl.push('event-create', {spaceId: this.my_entity.spaceId});
        break;
      }
    }    
  }
}
