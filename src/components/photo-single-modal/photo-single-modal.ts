import { Component } from '@angular/core';
import { ViewController, NavParams } from "ionic-angular";
import { Device } from '@ionic-native/device';


@Component({
  selector: 'photo-single-modal',
  templateUrl: 'photo-single-modal.html'
})
export class PhotoSingleModalComponent {

  link: string = "";
  isIphoneX: boolean = false;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public device: Device
  ) {
    this.link = this.navParams.get("link");
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
