import { Component } from '@angular/core';
import { NavParams, ViewController, LoadingController } from "ionic-angular";
import { ContentProvider } from "../../../providers/content";
import { Device } from '@ionic-native/device';

@Component({
  selector: 'project-select-modal',
  templateUrl: 'project-select-modal.html'
})
export class ProjectSelectModalComponent {

  spaceId: number;
  projects: any = [];
  isIphoneX: boolean = false;
  projectSelect: any;
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
    this.projectSelect = this.navParams.get("project");
    this.isComment = this.navParams.get("isComment");
    this.getProjects();
  }

  getProjects(){
    const saveloader = this.loadingCtrl.create({      
    });      
    saveloader.present();
    this.contentProvider.getCasesProjects(this.spaceId).subscribe(res => {
      this.projects = res.ResponseData;
      saveloader.dismiss();
    })
  }

  selectProject(project){
    this.viewCtrl.dismiss({project: project});
  }

  dismiss(){
    this.viewCtrl.dismiss({ isCanceled: true });
  }

}
