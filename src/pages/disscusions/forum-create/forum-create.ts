import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { TranslateService } from '@ngx-translate/core';
import { ContentProvider } from '../../../providers/content';
/**
 * Generated class for the ForumCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'forum-create',
  segment: 'forum-create'
})
@Component({
  selector: 'page-forum-create',
  templateUrl: 'forum-create.html',
})
export class ForumCreatePage implements OnInit {

  contentTitle: any;
  urlStub: any;
  contentSummary: any;
  spaceId: any;

  //Refresher
  isLoading: boolean = false;
  loader: any;

  //Validation
  titleClass: string;
  stubClass: string;
  summaryClass: string;

  @ViewChild(Content) content: Content;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contentProvider: ContentProvider,
    public loadingCtrl: LoadingController,
    public translate: TranslateService
  ) {
    this.spaceId = this.navParams.get('spaceId');
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

  ionViewDidLoad() {
  }

  dismiss(){
    this.loader.dismiss();
  }

  // Element not validated gets focus
  getFocus(){
    this.titleClass = '';
    this.summaryClass = '';
  }

  cancel(){
    this.navCtrl.pop();
  }

  save(){
    if(this.contentTitle == undefined){
      this.titleClass = 'red';      
      let yOffset = document.getElementById('headline').offsetTop;
      this.content.scrollTo(0, yOffset-50, 1000);
      return;
    }else if(this.urlStub == undefined){
      this.stubClass = 'red';
      let yOffset = document.getElementById('stub').offsetTop;
      this.content.scrollTo(0, yOffset-50, 1000);
      return;
    }else if(this.contentSummary == undefined){
      this.summaryClass ='red';
      let yOffset = document.getElementById('summary').offsetTop;
      this.content.scrollTo(0, yOffset-50, 1000);
      return;
    }
    let body = {
      'EntityType': 1,
      'ContentTitle': this.contentTitle,
      'ContentBody': this.contentSummary,
      'SpaceID': this.spaceId
    }

    const saveloader = this.loadingCtrl.create({      
    });      
    saveloader.present();

    this.contentProvider.createContent(JSON.stringify(body))
      .finally(() => {
        saveloader.dismiss();
        this.navCtrl.pop();
      })
      .subscribe(res => {
        console.log(res);
      })
  }
}
