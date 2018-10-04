import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams, LoadingController, } from 'ionic-angular';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/finally';
import { ContentProvider } from '../../providers/content';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'folder-select-modal',
  templateUrl: 'folder-select.html',
})

export class FolderSelectModalComponent{
  userId: number = Number(localStorage.getItem('UserID'));
  spaceId: number = this.navParams.get('SpaceID');
  parentId: number = this.navParams.get('ParentID')?this.navParams.get('ParentID'): 0;
  previousIds = [];
  folders: any = [];
  isLoadingFolders: boolean = false;
  isIphoneX:boolean = false;
  constructor(    
    private viewCtrl:ViewController,
    private navParams: NavParams,
    private contentProvider: ContentProvider,
    public loadingCtrl: LoadingController,
    public device: Device,
  ) {
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
    this.loadFolder();
  }
  loadFolder() {
    this.folders = [];
    let options = {
    }    
    options['parentid'] = this.parentId;
    if (this.spaceId != undefined) {
      options['spaceid'] = this.spaceId;
    }
    this.isLoadingFolders = true;
    new Promise((resolve, reject) => {
      if(this.parentId == 0) {
        this.contentProvider.getDirectories(options)      
        .subscribe(response => {        
          resolve(response.ResponseData[0].DirectoryID)
        }, err => {
          reject(err);
        });
      } else {
        resolve(this.parentId);
      }      
    }).then((parentid: any) => {
      this.parentId = parentid;
      this.previousIds.push(this.parentId);
      let options1 = options;
      options1['parentid'] = parentid;
      this.contentProvider.getDirectories(options1)
      .finally(() => {
        this.isLoadingFolders = false;        
      })
      .subscribe(response => {
        console.log(response);
        for(var i = 0; i < response.ResponseData.length; i++) {
          this.folders.push({
            title: response.ResponseData[i].DirectoryName,
            ID: response.ResponseData[i].DirectoryID
          })
        }
      })      
    })
  }

  gotoFolder(item: any) {
    this.folders = [];
    let options = {
    }
    options['parentid'] = item.ID;    
    if (this.spaceId) {
      options['spaceid'] = this.spaceId;
    }
    this.previousIds.push(item.ID);
    this.isLoadingFolders = true;
    this.contentProvider.getDirectories(options)
    .finally(() => {
      this.isLoadingFolders = false;
    })
    .subscribe(response => {
      for(var i = 0; i < response.ResponseData.length; i++) {
        this.folders.push({
          title: response.ResponseData[i].DirectoryName,
          ID: response.ResponseData[i].DirectoryID
        })
      }
    })
  }
  gotoParentFolder() {
    this.folders = [];
    let options = {
    }
    options['parentid'] = this.previousIds[this.previousIds.length - 2];
    if (this.spaceId) {
      options['spaceid'] = this.spaceId;
    }    
    this.isLoadingFolders = true;
    this.contentProvider.getDirectories(options)
    .finally(() => {
      this.isLoadingFolders = false;
    })
    .subscribe(response => {
      for(var i = 0; i < response.ResponseData.length; i++) {
        this.folders.push({
          title: response.ResponseData[i].DirectoryName,
          ID: response.ResponseData[i].DirectoryID
        })
      }
      this.previousIds.pop();
    })
  }
  back() {
    this.viewCtrl.dismiss();
  }
  choose() {
    this.viewCtrl.dismiss({ID: this.previousIds[this.previousIds.length -1]});
  }
}
