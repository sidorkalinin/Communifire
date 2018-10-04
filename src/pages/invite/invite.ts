import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import { SpacesProvider } from '../../providers/spaces';
/**
 * Generated class for the InvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'page-invite'
})
@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html',
})
export class InvitePage {
  data: any;
  activityAction: any;
  pendingRequests: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public spaceProvider: SpacesProvider,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {
    this.data = this.navParams.get('data');
    this.activityAction = Number(this.data.additionalData.activityAction);
  }

  ionViewDidLoad() {
    if(this.activityAction == 13) {
      this.pendingRequests.push(this.data);
    }
  }

  accept(d, action) {
    if(action == 15) {      
      const saveloader = this.loadingCtrl.create({      
      });      
      saveloader.present();
      this.spaceProvider.setMember(d.additionalData.spaceID, localStorage.getItem('UserID'))
      .finally(() => {
        saveloader.dismiss();
      })
      .subscribe(res => {
        if(res.IsError == false){
          let active = this.navCtrl.getActive();
          this.navCtrl.push('space-details', {
            id: d.additionalData.spaceID,
          });
          this.navCtrl.removeView(active);
        } else {
          this.translate.get("TOAST.ERROR").subscribe(res => {
            this.presentToast(res);
          });
        }
      });
    }
  }

  reject() {
    this.navCtrl.pop();
  }

  private presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
