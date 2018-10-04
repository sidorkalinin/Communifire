import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { TranslateService } from '@ngx-translate/core';
import { SpacesProvider } from '../../../providers/spaces';
/**
 * Generated class for the SpaceCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'space-create',
  segment: 'space-create'
})
@Component({
  selector: 'page-space-create',
  templateUrl: 'space-create.html',
})
export class SpaceCreatePage implements OnInit {

  spaceName: any;
  description: any;
  spaceVisibility: any = 'Public';
  membershipType: any = 1;
  spacephoto: any;
  enableArticles: boolean = true;
  enableBlogs: boolean = true;
  enableCases: boolean = true;
  enableForums: boolean = true;
  enableEvents: boolean = true;
  enableFiles: boolean = true;
  enableIdeas: boolean = true;
  enablePhotos: boolean = true;
  enablePolls: boolean = true;
  enableTasks: boolean = true;
  enableVideos: boolean = true;
  enableWiki: boolean = true;

  //Validation
  titleClass: string;
  summaryClass: string;
  typeClass: string;

  //boolean
  bFirstStep: boolean = true;

  //Loader
  loader: any;

  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private spaceProvider: SpacesProvider,    
    public loadingCtrl: LoadingController,
    public translate: TranslateService
  ) {
  }

  async ngOnInit() {
    this.translate.get("COMMONS.LOADING").subscribe(res => {
      this.loader = this.loadingCtrl.create({
        content: res,
      });
      this.loader.present();
      this.dismiss();
    });
  }

  dismiss(){
    this.loader.dismiss();
  }

  
  //Feature Image
  setSpacePhoto(file){
    this.spacephoto = file;
  }

  // Element not validated gets focus
  getFocus(){
    this.titleClass = '';
    this.summaryClass = '';  
  }

  cancel(){
    this.navCtrl.pop();
  }

  continue(){
    if(this.spaceName == undefined){
      this.titleClass = 'red';      
      let yOffset = document.getElementById('name').offsetTop;
      this.content.scrollTo(0, yOffset-50, 1000);
      return;
    }else if(this.description == undefined){
      this.summaryClass ='red';
      let yOffset = document.getElementById('description').offsetTop;
      this.content.scrollTo(0, yOffset-50, 1000);
      return;
    }
    this.bFirstStep = false;
  }

  back(){
    this.bFirstStep = true;
  }

  save(){
    let body = {
      'Description': this.description,
      'SpaceName': this.spaceName,
      'SpaceVisibility': this.spaceVisibility,
      'MembershipType': this.membershipType,
      'EnableArticles': String(this.enableArticles),
      'EnableBlogs': String(this.enableBlogs),
      'EnableCases': String(this.enableCases),
      'EnableForums': String(this.enableForums),
      'EnableEvents': String(this.enableEvents),
      'EnableFiles': String(this.enableFiles),
      'EnableIdeas': String(this.enableIdeas),
      'EnablePhotos': String(this.enablePhotos),
      'EnablePolls': String(this.enablePolls),
      'EnableTasks': String(this.enableTasks),
      'EnableVideos': String(this.enableVideos),
      'EnableWiki': String(this.enableWiki)
    }
    console.log(body);
    const saveloader = this.loadingCtrl.create({      
    });      
    saveloader.present();

    this.spaceProvider.createSpace(JSON.stringify(body))
    .finally(() => {      
      saveloader.dismiss();
      this.navToList();
    })
    .subscribe(res => {
      console.log(res);      
    })
  }
  
  navToList(){
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();

    this.navCtrl.push("spaces");

    this.navCtrl.removeView(active);
    this.navCtrl.removeView(parent);
  }
}
