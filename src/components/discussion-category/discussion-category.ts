import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { DiscussionCategorySelectModal } from '../../modals/discussion-category-select-modal/discussion-category-select';

/**
 * Generated class for the DiscussionCategoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'discussion-category',
  templateUrl: 'discussion-category.html'
})
export class DiscussionCategoryComponent {
  spaceid: any;
  userid: any;
  selecteditem: any;
  label: any;
  id: any;
  title: any;

  @Input()
  set entity(entity: any) {    
    this.spaceid = entity.spaceid;
    this.userid = entity.userid;
    this.label = entity.label;
    this.id = entity.id;
    this.title = entity.title;
  }
  @Output() select = new EventEmitter<any>();

  constructor(
    private modalCtrl: ModalController,
  ) {
    
  }

  notifySelect(){    
    this.select.emit(this.selecteditem);
  }

  openModal(){
    let modal = this.modalCtrl.create(DiscussionCategorySelectModal, {spaceid: this.spaceid, userid: this.userid, id: this.id});
    modal.present();
    modal.onDidDismiss((data) =>{
      if(data == undefined)
        return;
      this.selecteditem = data;
      this.notifySelect();
    });
  }
}
