import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ContentProvider } from "../../../providers/content";
import { SpacesProvider } from "../../../providers/spaces";
import { ForumTopicCommentModalComponent } from "../../../components/forum-topic-comment-modal/forum-topic-comment-modal";
import { TapticEngine } from '@ionic-native/taptic-engine'; 
import { Vibration } from '@ionic-native/vibration'; 
import { Platform, Refresher } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '@ionic-native/device';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage({
  name: "discussion-item",
  segment: "discussion-item/:id"
})
@Component({
  selector: 'page-discussion-item',
  templateUrl: 'discussion-item.html',
})
export class DiscussionItemPage {

  id: number = this.navParams.get('id');
  sort = 0;

  content: any = [];

  comments: any = [];
  loader: any;

  canedit: boolean = false;
  isIos: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public contentProvider: ContentProvider,
    public spacesProvider: SpacesProvider,
    public modalCtrl: ModalController,
    public taptic: TapticEngine,
    public vibration: Vibration,
    public platform: Platform,
    public translate: TranslateService,
    public loadingCtrl: LoadingController,
    public device: Device,
    private sanitizer: DomSanitizer
  ) {
    this.translate.get("COMMONS.LOADING_DISCUSSION").subscribe(res => {
      this.loader = this.loadingCtrl.create({
        content: res,
      });
      this.loader.present();
      this.getContent();
    });
    if (this.device.model === "iPhone10,3" || this.device.model === "iPhone10,6" || this.device.model === "iPhone10;3" || this.device.model === "iPhone10;6") {
      this.isIphoneX = true;
    }
    if(this.platform.is("ios")) {
      this.isIos = true;
    }
  }
    
  isIphoneX: boolean = false;

  vibrate(){
    if(this.platform.is("android")){
      this.vibration.vibrate(50);
    }
  }

  getContent(refresher?: Refresher){
    if (refresher) {
      this.taptic.impact({ style: 'light' }); 
      this.vibrate();
    }
    this.contentProvider.getContentByID(this.id).finally(() => {
      if (refresher) {
        refresher.complete();
      }
    }).subscribe(res => {
      this.content = res.ResponseData;
      this.content.ContentBody = this.sanitizer.bypassSecurityTrustHtml(this.content.ContentBody);
      console.log(this.content);
      this.checkPermission();
      if(this.content.SpaceID == 0){
        this.getSpace(0);
      }
      this.getCommentList();
    });
  }

  getCommentList(){
    let data = {
      EntityType: 54,
      SpaceID: this.content.SpaceID,
      ParentContentID: this.content.ContentID
    }
    this.contentProvider.getContentList(data).subscribe(res => {
      this.comments = res.ResponseData;
      this.comments.pop();
      this.sortByDate();
      this.loader.dismiss();
    })
  }

  getSpace(id: number){
    this.spacesProvider.getSpace(id).subscribe((res) => {
      this.content["SpaceName"] = res.SpaceName;
    });
  }

  public sortByDate(): void {
    this.comments.sort((a: any, b: any) => {
      return new Date(a.DateCreated).getTime() - new Date(b.DateCreated).getTime();
    });
  }

  ionViewDidLoad() {
  }

  openModal(){
    if(this.content.LockedByUserID != 0) return;
    const modal = this.modalCtrl.create(ForumTopicCommentModalComponent, {
      id: this.content.ContentID,
      forumTopic: this.content
    });
    modal.onDidDismiss(data => {
      this.getCommentList();
    });
    modal.present();
  }

  likes: any;

  setCount($event){
    this.likes = $event;
  }

  goToProfile(){
    this.navCtrl.push("profile", {
      id: this.content.AuthorID
    });
  }

  
  cancel(){
    this.navCtrl.pop();
  }

  checkPermission(){
    if(this.content.AuthorID == localStorage.getItem('UserID')){
      this.contentProvider.checkPermission({
        entitytype: 1,
        spaceid: this.content.SpaceID,
      })
      .finally(()=>{      
      })
      .subscribe(res =>{
        this.canedit = res.ResponseData.update;
      })
    }else{
      this.contentProvider.checkPermission({
        entitytype: 1,
        spaceid: this.content.SpaceID,
      })
      .finally(()=>{      
      })
      .subscribe(res =>{
        this.canedit = res.ResponseData.AdminEntityUpdate;
      })
    }
  }

}
