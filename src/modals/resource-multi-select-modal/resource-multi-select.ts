import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams, } from 'ionic-angular';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/finally';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'resource-multi-select',
  templateUrl: 'resource-multi-select.html',
})

export class ResourceMultiSelectModalComponent implements OnInit{
  items:any = [];
  tmpItems: any = [];
  selectedItems: any = [];
  searchString: any;
  id: any;

  constructor(    
    private viewCtrl:ViewController,
    private navParams: NavParams,
    public device: Device,
  ) {
    this.items = this.navParams.get('items');
    this.tmpItems = this.items;
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
  }
  isIphoneX:boolean = false;

  ngOnInit() {
  }
  back(){
    this.selectedItems = [];
    for(let i = 0; i < this.tmpItems.length; i++){
      if(this.tmpItems[i].selected == true)
        this.selectedItems.push(this.tmpItems[i]);
    }
    this.viewCtrl.dismiss({items: this.selectedItems});
  }
  select(item){
    item.selected = !item.selected;    
  }
  search() {
    // reset countries list with initial call
    this.tmpItems = this.items;

    // set q to the value of the searchbar
    var q = this.searchString;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
        return true;
    }

    this.tmpItems = this.tmpItems.filter((v) => {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
      }
      return false;
    })
  }
}
