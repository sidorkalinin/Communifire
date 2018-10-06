import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { Events } from 'ionic-angular';

@IonicPage({
  name: "chat",
  segment: "chat"
})
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild('ioshack') ioshack;
  isKeyBoardOpened = false;
  isEnabled: boolean = true;
  loading : boolean = true; 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private keyboard: Keyboard,
    private events: Events
  ) {
    this.loading = true;
  }

  ionViewDidEnter() {
    // Save the state of keyboard so that it can be used later wt athe time of closing
    this.keyboard.onKeyboardShow().subscribe(() => { this.isKeyBoardOpened = true })
    this.keyboard.onKeyboardHide().subscribe(() => { this.isKeyBoardOpened = false })


    this.events.subscribe('menu:opened', () => {
      // console.log('Menu opened');
      // your action here
      this.closeKeyBoard();
    });

    this.events.subscribe('menu:closed', () => {
      // console.log('Menu closed');
      // your action here
      // this.closeKeyBoard();
    });
    // this.loading = false;
  }

  ionViewDidLeave() {
    // console.log('ionViewDidLeave: Closing keyboard on unloading of chat page.');
    this.closeKeyBoard();
    this.loading = false
  }

  closeKeyBoard() {
    this.keyboard.close();

    // FIX: Keyboard reopens after close repeatedly on iOS
    //Reference: https://forum.ionicframework.com/t/keyboard-reopens-after-close-repeatedly-on-ios/107347
    // https://stackoverflow.com/questions/45420315/ionic-2-keyboard-reopening-after-close
    if (this.isKeyBoardOpened) {
      // console.log('isKeyBoardOpened');
      this.ioshack.setFocus();
    }
  }

}
