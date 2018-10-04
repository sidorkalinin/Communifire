import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { SpacesProvider } from '../../../providers/spaces';
import { TaskProvider } from '../../../providers/task';

/**
 * Generated class for the TaskListCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "task-list-create",
  segment: "task-list-create"
})
@Component({
  selector: 'page-task-list-create',
  templateUrl: 'task-list-create.html',
})
export class TaskListCreatePage implements OnInit{
  spaces = [];
  isLoading: boolean = false;

  listTitle: any;
  listSummary: any;
  spaceID: any;

  constructor(
    public navCtrl: NavController,
    private spacesProvider: SpacesProvider,
    private taskProvider: TaskProvider,
    public viewCtrl:ViewController
  ) { }

  setSpace(space){
    this.spaceID = space.value;
  }

  ngOnInit() {
    this.isLoading = true;

    this.spacesProvider.getMySpaces()
      .finally(() => this.isLoading = false)
      .subscribe(res => {
        this.spaces = [];
        this.spaces.push({ name: 'Personal', value: -1, default: true });
        for(let i = 0; i < res.length; i++){
          this.spaces.push({name: res[i].SpaceName, value: res[i].SpaceID, default: false})
        }
      })
  }

  cancel(){
    this.viewCtrl.dismiss();
  }
  save(){
    let body = {
      'TaskListName': this.listTitle,
      'TaskListDescription': this.listSummary,
      'SpaceID': this.spaceID,
      'IsActive': true
    }
    this.taskProvider.createList(JSON.stringify(body))
      .finally(()=>{        
      })
      .subscribe((res)=>{
        if(res.IsError == false){
          this.viewCtrl.dismiss();
        }
      })
  }
}
