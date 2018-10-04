import { Component } from '@angular/core';
import { NavParams, ViewController } from "ionic-angular";
import { ContentProvider } from "../../../providers/content";
import { Device } from '@ionic-native/device';

@Component({
  selector: 'milestone-select-modal',
  templateUrl: 'milestone-select-modal.html'
})
export class MilestoneSelectModalComponent {

  spaceId: number;
  milestones: any = [];
  isIphoneX: boolean = false;
  milestoneSelect: any;
  projectId: number;
  isComment: boolean;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public device: Device,
    public contentProvider: ContentProvider
  ) {
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
    this.spaceId = this.navParams.get("spaceId");
    this.projectId = this.navParams.get("projectId");
    this.milestoneSelect = this.navParams.get("milestone");
    this.isComment = this.navParams.get("isComment");
    this.getMilestones();
  }

  getMilestones(){
    this.contentProvider.getCasesMilestones(this.spaceId, this.projectId).subscribe(res => {
      this.milestones = res.ResponseData;
    })
  }

  selectMilestone(milestone){
    this.viewCtrl.dismiss({milestone: milestone});
  }

  dismiss(){
    this.viewCtrl.dismiss({ isCanceled: true });
  }

}
