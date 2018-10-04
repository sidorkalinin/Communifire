import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'folder-operation-modal',
  templateUrl: 'folder-operation.html',
})

export class FolderOperationModalComponent implements OnInit{
  title: any;
  name: any;
  constructor(    
    private viewCtrl:ViewController,    
    private navParams: NavParams,
  ) {
    this.title = this.navParams.get('title');
  }

  ngOnInit() {    
  }

  back(){
    this.viewCtrl.dismiss();
  }
  submit(){
    this.viewCtrl.dismiss({name: this.name});
  }
}
