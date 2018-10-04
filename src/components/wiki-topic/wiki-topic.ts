import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ContentProvider } from '../../providers/content';

/**
 * Generated class for the WikiTopicComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'wiki-topic',
  templateUrl: 'wiki-topic.html'
})
export class WikiTopicComponent {

  text: string;
  //Topic
  parentTopic: any;
  filterTopics: any = [];
  parentContentID: any;
  spaceId: any;
  userId: any;
  subcriber: Subscription;

  @Output() topic = new EventEmitter<any>();

  constructor(
    private contentProvider: ContentProvider,
  ) {
    console.log('Hello WikiTopicComponent Component');
    this.text = 'Hello World';
  }

  @Input()
  set entity(entity: any) {    
    this.spaceId = entity.spaceId;
    this.userId = entity.userId;
    this.parentContentID = entity.topic;
    if(entity.topic != undefined){
      this.setTopic();
    }
  }
  
  returnCategory(){
    this.topic.emit(this.parentContentID);
  }

  checkBlur(){
    var that = this;
    setTimeout(function(){
      if(that.parentContentID == undefined)
        that.parentTopic = '';
      that.filterTopics = [];
    }, 500);
  }
  // Topic
  chooseTopic(topicID){
    this.parentContentID = topicID;    
    for(var i = 0; i < this.filterTopics.length; i++){     
      if(this.filterTopics[i].ContentID == topicID){
        this.parentTopic = this.filterTopics[i].ContentTitle;
      }
    }
    this.filterTopics = [];
    this.returnCategory();
  }

  changeTopic(){
    if(this.parentTopic == undefined)
      return;
    let options;
    options = {
      EntityType: 9,
      SpaceID: this.spaceId,
      UserID: this.userId
    }
    if(this.subcriber != undefined)
      this.subcriber.unsubscribe();
      this.subcriber = this.contentProvider.getContentList(options).subscribe(res =>{
        this.filterTopics = [];
        for(var i = 0; i < res.ResponseData.length; i++){
          if(res.ResponseData[i].ContentTitle.toLowerCase().includes(this.parentTopic.toLowerCase()))
            this.filterTopics.push(res.ResponseData[i]);
        }
      })
  }

  setTopic(){
    let options;
    options = {
      EntityType: 9,
      SpaceID: this.spaceId,
      UserID: this.userId
    }
    if(this.subcriber != undefined)
      this.subcriber.unsubscribe();
      this.subcriber = this.contentProvider.getContentList(options).subscribe(res =>{
        this.filterTopics = [];
        for(var i = 0; i < res.ResponseData.length; i++){
          if(res.ResponseData[i].ContentID == this.parentContentID)
            this.parentTopic = res.ResponseData[i].ContentTitle;
        }
      })
  }
}
