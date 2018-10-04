import { Component } from '@angular/core';
import { NavParams, ViewController, InfiniteScroll, LoadingController } from "ionic-angular";
import { PeopleProvider } from "../../../providers/people";
import { ContentProvider } from "../../../providers/content";
import { Device } from '@ionic-native/device';

@Component({
  selector: 'assigned-to-select-modal',
  templateUrl: 'assigned-to-select-modal.html'
})
export class AssignedToSelectModalComponent {

  spaceId: number;
  users: any = [];
  isIphoneX: boolean = false;
  userSelect: any;
  title: string;
  public page = 0;
  isComment: boolean;
  searchText: string = "";
  isLoadingSearch: boolean = false;
  isCaseUpdate: boolean = false;
  projectId: number = null;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public device: Device,
    public peopleProvider: PeopleProvider,
    public loadingCtrl: LoadingController,
    public contentProvider: ContentProvider
  ) {
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
    this.spaceId = this.navParams.get("spaceId");
    this.userSelect = this.navParams.get("user");
    this.title = this.navParams.get("title");
    this.isComment = this.navParams.get("isComment");
    this.projectId = this.navParams.get("projectId");
    if(this.navParams.get('isCaseUpdate')){
      this.isCaseUpdate = this.navParams.get('isCaseUpdate');
      console.log(this.isCaseUpdate, "modal");
    }
    this.getUsers();
  }

  getUsers(infiniteScroll?: InfiniteScroll){
    // ++this.page;

    // this.peopleProvider.getSpaceMembers(this.spaceId, null, this.page).subscribe(res => {
    //   this.users = this.users.concat(res.ResponseData);
    // })
    if (this.users.length > 0 && this.users.length < 15 && infiniteScroll) {
      infiniteScroll.enable(false);
      return;
    }

    if(infiniteScroll){
      ++this.page;
    } else {
      this.page = 1;
      this.users = [];
    }
    

    // Fetch Space user by Id
    if(!this.isCaseUpdate && this.spaceId != 0){
      const saveloader = this.loadingCtrl.create({      
      });      
      saveloader.present();
      this.peopleProvider.getSpaceMembers(this.spaceId, this.searchText, this.page)
      .finally(() => {
        saveloader.dismiss();
        this.isLoadingSearch = false;
        if(infiniteScroll){
          infiniteScroll.complete();
        }
      })
      .do(response => {
        if(infiniteScroll && !response.ResponseData.length){
          infiniteScroll.enable(false);
        }
      })
      .subscribe(res => {
        this.users = this.users.concat(res.ResponseData);
        if(res.ResponseData.length < 15 && infiniteScroll){
          infiniteScroll.enable(false);
        }
      });
    } else {
      const saveloader = this.loadingCtrl.create({      
      });      
      saveloader.present();
      this.contentProvider.getCasesAssignTo(this.spaceId, this.projectId, this.page, this.searchText)
      .finally(() => {
        saveloader.dismiss();
        this.isLoadingSearch = false;
        if(infiniteScroll){
          infiniteScroll.complete();
        }
      })
      .do(response => {
        if(infiniteScroll && !response.ResponseData.length){
          infiniteScroll.enable(false);
        }
      })
      .subscribe(res => {
        this.users = this.users.concat(res.ResponseData);
        if(res.ResponseData.length < 15 && infiniteScroll){
          infiniteScroll.enable(false);
        }
      });
    }
  }

  selectUser(user){
    this.viewCtrl.dismiss({user: user});
  }

  dismiss(){
    this.viewCtrl.dismiss({ isCanceled: true });
  }

  search(event) {
    this.searchText = event.target.value;
  }

}
