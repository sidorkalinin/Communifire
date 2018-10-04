import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController } from 'ionic-angular';
import { ContentProvider } from '../../../providers/content';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the PhotoCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'photo-create',
  segment: 'photo-create/:id'
})
@Component({
  selector: 'page-photo-create',
  templateUrl: 'photo-create.html',
})
export class PhotoCreatePage {
  navTitle: any;
  contentTitle: any;
  contentSummary: any;
  contentBody: any;
  metaTitle: any;
  metaDescription: any;
  images: any;

  spaceId:any;

  //Add Tag
  newtag: any;
  tags: any = [];

  //Validation
  titleClass: string;
  summaryClass: string;
  bodyClass: string;

  @ViewChild(Content) content: Content;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private contentProvider: ContentProvider,
    public loadingCtrl: LoadingController,
    public translate: TranslateService
  ){
    this.spaceId =  this.navParams.get('spaceId');
    this.navTitle = this.navParams.get('title');
  }

  async ngOnInit() {
    this.translate.get("COMMONS.LOADING_ARTICLE").subscribe(res => {
      const loader = this.loadingCtrl.create({
        content: res,
      });      
      loader.present();
      loader.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoCreatePage');
  }

  //Set Tag
  setTags(tags){
    this.tags = tags;
  }

  //Set MetaInfo
  setMetaInformation(meta){
    this.metaTitle = meta.metaTitle;
    this.metaDescription = meta.metaDescription;
  }

  //Image File
  setFiles(files) {
    this.images = files;
  }

  // Element not validated gets focus
  getFocus(){
    this.titleClass = '';
    this.summaryClass = '';
    this.bodyClass = '';
  }

  navToList(){
    let active = this.navCtrl.getActive();
    let parent = this.navCtrl.getPrevious();

    this.navCtrl.push("photo-list", {
      title: this.navTitle,
      SpaceID: this.spaceId
    }, {
      direction: "back"
    });
    
    this.navCtrl.removeView(active);
    this.navCtrl.removeView(parent);
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
    }else if(this.contentSummary == undefined){
      this.summaryClass ='red';
      let yOffset = document.getElementById('summary').offsetTop;
      this.content.scrollTo(0, yOffset-50, 1000);
      return;
    }

    //let tagscsv = this.tags.join(',');
    let body = {
      'EntityType': 18,
      'SpaceID': this.spaceId,
      'ContentTitle': this.contentTitle,
      'ContentSummary': this.contentSummary,
      'MetaTitle': this.metaTitle,
      'MetaDescription': this.metaDescription,
    }
    this.contentProvider.createContent(JSON.stringify(body))
    .finally(() => {
      this.navToList();
    })
    .subscribe(res => {
      console.log(res.ResponseData);
      this.uploadPhoto(res.ResponseData);
    })
  }
  uploadPhoto(c_id){
    for(var i = 0; i < this.images.length; i++){
      this.contentProvider.uploadAlbumPhoto({
        'fullPath': this.images[i].path,
        'name': this.images[i].filename,
        'contentID': c_id
      })
    }
  }
}
