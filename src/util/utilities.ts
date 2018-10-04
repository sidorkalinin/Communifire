import { Injectable } from "@angular/core";
import { ToastController } from 'ionic-angular';

@Injectable()
export class Utilities {

    constructor() { }

    getQueryString = function (field, url) {
        var href = url ? url : window.location.href;
        var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        var string = reg.exec(href);
        return string ? string[1] : null;
    };

    /**
* Present Ionic Toast to user.
* @param msg Message to display in Ionic Toast
*/
    presentToast(toastCtrl: ToastController, msg) {
        let toast = toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

    processUserImage(url: any) {

        if (url == 'null' || url == null || url == '') {
            return 'assets/images/profile-default.jpg';
        }
        else {
            return url;
        }
    }
}// end class