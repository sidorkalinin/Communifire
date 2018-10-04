import { Component } from '@angular/core';
import { NavParams, ViewController, LoadingController } from "ionic-angular";
import { ContentProvider } from "../../../providers/content";
import { Device } from '@ionic-native/device';

@Component({
  selector: 'status-select-modal',
  templateUrl: 'status-select-modal.html'
})
export class StatusSelectModalComponent {

  spaceId: number;
  statuses: any = [];
  isIphoneX: boolean = false;
  statusSelect: any;
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
    this.statusSelect = this.navParams.get("status");
    this.isComment = this.navParams.get("isComment");
    this.getStatuses();
  }

  getStatuses(){
    const saveloader = this.loadingCtrl.create({      
    });      
    saveloader.present();
    this.contentProvider.getCasesStatuses(this.spaceId).subscribe(res => {
      this.statuses = res.ResponseData;
      saveloader.dismiss();
    })
  }

  selectStatus(status){
    this.viewCtrl.dismiss({status: status});
  }

  dismiss(){
    this.viewCtrl.dismiss({ isCanceled: true });
  }

}
