import { Component } from '@angular/core';
import { NavParams, ViewController, LoadingController } from "ionic-angular";
import { ContentProvider } from "../../../providers/content";
import { Device } from '@ionic-native/device';

@Component({
  selector: 'category-select-modal',
  templateUrl: 'category-select-modal.html'
})
export class CategorySelectModalComponent {

  spaceId: number;
  categories: any = [];
  isIphoneX: boolean = false;
  categorySelect: any;
  projectId: number;
  isComment: boolean;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public device: Device,
    public loadingCtrl: LoadingController,
    public contentProvider: ContentProvider
  ) {
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
    this.spaceId = this.navParams.get("spaceId");
    this.projectId = this.navParams.get("projectId");
    this.categorySelect = this.navParams.get("category");
    this.isComment = this.navParams.get("isComment");
    this.getCategories();
  }

  getCategories(){
    const saveloader = this.loadingCtrl.create({      
    });      
    saveloader.present();
    this.contentProvider.getCasesCategories(this.spaceId, this.projectId).subscribe(res => {
      this.categories = res.ResponseData;
      saveloader.dismiss();
    })
  }

  selectCategory(category){
    this.viewCtrl.dismiss({category: category});
  }

  dismiss(){
    this.viewCtrl.dismiss({ isCanceled: true });
  }

}
