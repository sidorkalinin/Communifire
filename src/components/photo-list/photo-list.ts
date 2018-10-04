import { Component, Input, SimpleChanges } from '@angular/core';
import { ContentProvider } from "../../providers/content";
import { PhotoModalComponent } from './../photo-modal/photo-modal';
import { ModalController } from "ionic-angular";

@Component({
  selector: 'photo-list',
  templateUrl: 'photo-list.html'
})
export class PhotoListComponent {

  text: string;
  @Input() parentId;

  photos: any = [];

  constructor(
    private contentProvider: ContentProvider,
    public modalCtrl: ModalController,  
  ) {
    
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.parentId.currentValue) {
      this.getPhotos();
    }
  }

  getPhotos(){
    this.contentProvider.getPhotosByParent(this.parentId).subscribe(res => {
      this.photos = res.ResponseData;
    });
  }

  openModal(index){
    let modal = this.modalCtrl.create(PhotoModalComponent, { index: index, photos: this.photos });
    modal.present();
  }

}
