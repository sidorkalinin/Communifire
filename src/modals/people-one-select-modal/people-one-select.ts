import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'people-one-select-modal',
  templateUrl: 'people-one-select.html',
})

export class PeopleOneSelectModalComponent implements OnInit{
  isIphoneX: boolean = false;
  selectedpeople: any;
  searchString: any;

  peoples: any = [];
  tmppeoples: any = [];

  constructor(
    public viewCtrl: ViewController,
    private navParams: NavParams,
    public device: Device
  ) {
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }

    this.peoples = this.navParams.get('items');
    this.tmppeoples = this.peoples;
    
  }

  ngOnInit() {
  }

  back(){
    this.viewCtrl.dismiss();
  }
  select(){
    this.viewCtrl.dismiss({item: this.selectedpeople});
  }

  setCheck(item){
    if(item.selected == true){
      this.selectedpeople = item.person;
      this.select();
    }
    
  }

  search() {
    // reset countries list with initial call
    this.tmppeoples = this.peoples;

    // set q to the value of the searchbar
    var q = this.searchString;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
        return true;
    }

    this.tmppeoples = this.tmppeoples.filter((v) => {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
      }
      return false;
    })
  }
}