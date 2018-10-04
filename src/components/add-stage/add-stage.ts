import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ContentProvider } from '../../providers/content';
/**
 * Generated class for the AddStageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-stage',
  templateUrl: 'add-stage.html'
})
export class AddStageComponent {

  allStages: any = [];
  tmpStages: any = [];
  searchStageString = '';  
  isSearch: boolean = true;
  spaceId: any;
  stageId: any;
  subcriber: Subscription;

  @Input()
  set entity(entity: any) {
    this.spaceId = entity.spaceId;
    this.stageId = entity.stageId;
    this.getStages();
  }
  @Output() load = new EventEmitter<any>();
  @Output() select = new EventEmitter<any>();

  constructor(
    private contentProvider: ContentProvider,
  ) {
  }

  getStages(){
    if(this.spaceId == undefined)
      return;
    
    if(this.subcriber != undefined)
      this.subcriber.unsubscribe();

    this.subcriber = this.contentProvider.getContentStages({spaceId: this.spaceId})
    .finally(()=>{
      this.notifyLoad();
    })
    .subscribe(response=>{
      this.allStages = response.ResponseData;
      if(this.stageId != undefined){
        for(var i = 0; i < this.allStages.length; i++){
          if(this.allStages[i].StageID == this.stageId){
            this.searchStageString = this.allStages[i].StageName;
          }
        }
      }
    }, err =>{
    })
  }

  notifyLoad(){
    this.load.emit();
  }
  notifySelect(){
    this.select.emit(this.stageId);
  }

  focus(){
    this.isSearch = false;
    this.searchCountry();
  }
  checkBlur(){
    // var that = this;
    // setTimeout(function(){
    //   that.tmpStages = [];
    // }, 500);
  }
  // Topic
  searchCountry() {
    this.isSearch = false;
    // reset countries list with initial call
    this.tmpStages = this.allStages;

    // set q to the value of the searchbar
    var q = this.searchStageString;

    // if the value is an empty string don't filter the items
    if (q.trim() == '') {
        return true;
    }

    this.tmpStages = this.tmpStages.filter((v) => {
      if (v.StageName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
      }
      return false;
    })
  }

  chooseCountry(stage){
    this.searchStageString = stage.StageName;
    this.stageId = stage.StageID;
    this.isSearch = true;
    this.notifySelect();
  }
}
