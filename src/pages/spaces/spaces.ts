import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/finally';

import { SpacesProvider } from '../../providers/spaces';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { subscribeOn } from 'rxjs/operator/subscribeOn';

@IonicPage({
  name: 'spaces'
})
@Component({
  selector: 'page-spaces',
  templateUrl: 'spaces.html',
})

export class SpacesPage implements OnInit {
  allSpaces = [];
  mySpaces = [];
  spaces: string = 'my-spaces';
  isLoading: boolean = false;
  topLevel: any = {
    SpaceID: 0,
    SpaceName: "",
    SpaceIconFileName: "",
    SpaceVisibility: 4
  }

  constructor(
    public navCtrl: NavController,
    private spacesProvider: SpacesProvider,
    private appCenterAnalytics: AppCenterAnalytics
  ) {
    
   }

  ngOnInit() {
    this.isLoading = true;

    Observable.forkJoin(
      this.getMySpaces(),
      this.getTopLevel()
    )
      .finally(() => this.isLoading = false)
      .subscribe(spaces => {
        if (spaces[1]) {
          this.topLevel.SpaceName = spaces[1].SpaceName;
          this.topLevel.SpaceIconFileName = spaces[1].SpaceImageURL;
          this.topLevel.SpaceIconURL = spaces[1].SpaceImageURL;
        }
        this.mySpaces = spaces[0];
      });
  }

  // Change tabs on Spaces list page
  changeSegment($event) {        
    if (this.spaces === 'my-spaces' && this.mySpaces.length == 0) {
      this.getMySpaces();
    }
    if (this.spaces === 'all-spaces' && this.allSpaces.length == 0) {
      this.isLoading = true;
      this.getAllSpaces()
      .finally(() => this.isLoading = false)
      .subscribe((allspaceslist) => {
        this.allSpaces = allspaceslist;
      });
    }
  }

  private getMySpaces() {
    return this.spacesProvider.getMySpaces();
  }

  private getAllSpaces() {
    return this.spacesProvider.getSpaces();
  }

  getTopLevel() {
    return this.spacesProvider.getSpace(0);
  }

  addClick() {
    this.navCtrl.push('space-create');
  }
}
