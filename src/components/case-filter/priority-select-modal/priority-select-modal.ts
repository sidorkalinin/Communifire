import { Component } from '@angular/core';
import { NavParams, ViewController, LoadingController } from "ionic-angular";
import { ContentProvider } from "../../../providers/content";
import { Device } from '@ionic-native/device';

@Component({
  selector: 'priority-select-modal',
  templateUrl: 'priority-select-modal.html'
})
export class PrioritySelectModalComponent {

  spaceId: number;
  priorities: any = [];
  isIphoneX: boolean = false;
  prioritySelect: any;
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
    this.prioritySelect = this.navParams.get("priority");
    this.isComment = this.navParams.get("isComment");
    this.getPriorities();
  }

  getPriorities(){
    const saveloader = this.loadingCtrl.create({      
    });      
    saveloader.present();
    this.contentProvider.getCasesPriorities(this.spaceId).subscribe(res => {
      this.priorities = res.ResponseData;
      saveloader.dismiss();
    })
  }

  selectPriority(priority){
    this.viewCtrl.dismiss({priority: priority});
  }

  dismiss(){
    this.viewCtrl.dismiss({ isCanceled: true });
  }

}
