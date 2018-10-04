import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Device } from '@ionic-native/device';

@IonicPage({
  name: "cases-filters"
})
@Component({
  selector: 'page-cases-filter',
  templateUrl: 'cases-filter.html',
})
export class CasesFilterPage {

  spaceId: number = null;

  projectId: number = null;
  categoryId: number = null;
  milestoneId: number = null;
  statusId: number = null;
  priorityId: number = null;
  assignedToId: number = null;
  createdById: number = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public device: Device,
    public viewCtrl: ViewController
  ) {
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
    this.spaceId = this.navParams.get("spaceId");

    this.projectId = this.navParams.get("projectId");
    this.categoryId = this.navParams.get("categoryId");
    this.milestoneId = this.navParams.get("milestoneId");
    this.statusId = this.navParams.get("statusId");
    this.priorityId = this.navParams.get("priorityId");
    this.assignedToId = this.navParams.get("assignedToId");
    this.createdById = this.navParams.get("createdById");
  }

  isIphoneX: boolean = false;

  ionViewDidLoad() {
    
  }

  setPriority($event){
    this.priorityId = $event;
  }

  setStatus($event){
    this.statusId = $event;
  }

  setMilestone($event){
    this.milestoneId = $event;
  }

  setProject($event){
    this.projectId = $event;
    if(!$event){
      this.categoryId = null;
      this.milestoneId = null;
    }
  }

  setCategory($event){
    this.categoryId = $event;
  }

  setAssignedUser($event){
    this.assignedToId = $event;
  }

  setReportedUser($event){
    this.createdById = $event;
  }

  dismiss(){
    this.viewCtrl.dismiss({isCanceled: true});
  }

  applyFilter(){
    this.viewCtrl.dismiss({
      spaceId: this.spaceId,
      projectId: this.projectId,
      categoryId: this.categoryId,
      milestoneId: this.milestoneId,
      statusId: this.statusId,
      priorityId: this.priorityId,
      assignedToId: this.assignedToId,
      createdById: this.createdById,
    });
  }

  reset(){
    this.projectId = null;
    this.categoryId = null;
    this.milestoneId = null;
    this.statusId = null;
    this.priorityId = null;
    this.assignedToId = null;
    this.createdById = null;
    // this.applyFilter();
  }

}
