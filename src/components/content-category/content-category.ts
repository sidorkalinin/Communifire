import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { ContentProvider } from '../../providers/content';
/**
 * Generated class for the ContentCategoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'content-category',
  templateUrl: 'content-category.html',
})
export class ContentCategoryComponent {
  selectCategory: any;
  categories: any = [];
  text: string;
  spaceId: any;
  _entity: any;
  subcriber: Subscription;

  //@Input() entity;
  @Output() category = new EventEmitter<any>();
  @Output() load = new EventEmitter<any>();

  constructor(
    public navCtrl: NavController,
    private contentProvider: ContentProvider,
    public translate: TranslateService
  ) {
    this.text = 'Hello World';
  }
  async ngOnInit() {
  }

  @Input()
  set entity(entity: any) {
    this._entity = entity;
    this.getCategories();
  }
  
  //Get Category from Content Provider
  getCategories(){
    if(this._entity.spaceId == undefined || this._entity.entityTypeID == undefined)
      return;
    if(this.subcriber != undefined)
      this.subcriber.unsubscribe();
      
    this.subcriber = this.contentProvider.getContentCategories({spaceId: this._entity.spaceId, entityTypeID: this._entity.entityTypeID})
    .finally(()=>{
      this.notifySelect();
    })
    .subscribe(response=>{
      this.categories = response.ResponseData;
      console.log(this.categories);
      //Original
      if(this._entity.category != undefined){          
        this.selectCategory = this._entity.category;
      }
    }, err =>{
    })    
  }

  notifySelect(){
    this.load.emit();
  }
  returnCategory(){
    this.category.emit(this.selectCategory);
  }
}
