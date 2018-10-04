import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/finally';

import { SpacesProvider } from '../../providers/spaces';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'space-modal',
  templateUrl: 'spaces.html',
})

export class SpaceModalComponent implements OnInit{
  allSpaces = [];
  mySpaces = [];
  spaces: string = 'my-spaces';
  isLoading: boolean = false;

  constructor(
    public navCtrl: NavController,
    private spacesProvider: SpacesProvider,
    public viewCtrl:ViewController,
    public device: Device,
  ) {
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
  }
  isIphoneX:boolean = false;

  ngOnInit() {
    this.isLoading = true;

    Observable.forkJoin(
      this.getMySpaces(),
      this.getAllSpaces()
    )
    .finally(() => this.isLoading = false)
    .subscribe(spaces => {
      this.mySpaces = spaces[0];
      this.allSpaces = [];
      spaces[1].map(space => {
        if (space.SpaceVisibility == 0){
          return 0;
        }
        for (let item in spaces[0]){
          if (spaces[0][item]['SpaceID'] == space.SpaceID){
            return 0;
          }
        }
        this.allSpaces.push(space);
       });
    })
  }

  private getMySpaces () {
    return this.spacesProvider.getMySpaces();
  }

  private getAllSpaces () {
    return this.spacesProvider.getSpaces();
  }

  back(){
    this.viewCtrl.dismiss();
  }
}
