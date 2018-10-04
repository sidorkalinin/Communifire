import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController } from 'ionic-angular';
import { ContentProvider } from '../../../providers/content';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the PhotoEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'photo-edit',
  segment: 'photo-edit'
})
@Component({
  selector: 'page-photo-edit',
  templateUrl: 'photo-edit.html',
})
export class PhotoEditPage {
  contentTitle: any;
  contentSummary: any;
  contentBody: any;
  metaTitle: any;
  metaDescription: any;
  images: any;
  
  spaceId:any;
  contentId: any;
  //Loading Controller
  loader: any;

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
    this.contentId = this.navParams.get('contentId');
  }

  async ngOnInit() {
    this.translate.get("COMMONS.LOADING").subscribe(res => {
      this.loader = this.loadingCtrl.create({
        content: res,
      });      
      this.loader.present();
      this.getContentById();      
    });
  }

  getContentById(){
    this.contentProvider.getContentByID(this.contentId)
      .finally(this.loader.dismiss())
      .subscribe(res => {
        let contentData = res.ResponseData;
        this.contentTitle = contentData.ContentTitle;
        this.contentBody = contentData.ContentBody;
        this.contentSummary = contentData.ContentSummary;
        this.spaceId = contentData.SpaceID;
        this.metaTitle = contentData.MetaTitle;
        this.metaDescription = contentData.MetaDescription;
        this.tags = contentData.TagsCSV.split(',');        
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

    this.navCtrl.push('photos', {
      id: this.contentId
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

    let body = {
      'ContentTitle': this.contentTitle,
      'ContentBody': this.contentBody,
      'ContentSummary': this.contentSummary,
      'MetaTitle': this.metaTitle,
      'MetaDescription': this.metaDescription,
      'TagsCSV': this.tags.join(','),
    }

    const loader = this.loadingCtrl.create({      
    });      
    loader.present();

    this.contentProvider.updateContent(this.contentId, JSON.stringify(JSON.stringify(body)))
    .finally(() => {     
      loader.dismiss(); 
      this.navToList();
    })
    .subscribe(res => {
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
