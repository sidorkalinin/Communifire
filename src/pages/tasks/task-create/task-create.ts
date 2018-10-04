import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TaskProvider } from '../../../providers/task';
import { PeopleProvider } from '../../../providers/people';

/**
 * Generated class for the TaskCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "task-create",
  segment: "task-create"
})
@Component({
  selector: 'page-task-create',
  templateUrl: 'task-create.html',
})
export class TaskCreatePage {
  spaceid: any;
  tasklistid: any;
  isLoading: boolean = false;

  taskTitle: any;
  taskSummary: any;

  d_assigntos: any = [];
  assignedToUserID: any;
  attachFiles: any = [];
  dueDate: any;

  constructor(
    public navCtrl: NavController,
    private taskProvider: TaskProvider,
    private peopleProvider: PeopleProvider,
    public viewCtrl:ViewController,
    private navParams: NavParams
  ) {
    this.spaceid = this.navParams.get('spaceid');
    this.tasklistid = this.navParams.get('tasklistid');
  }

  ngOnInit() {
    this.isLoading = true;
    this.peopleProvider.getSpaceMembers(this.spaceid, '', 1)
      .finally(()=>{
      })
      .subscribe((res)=>{
        let assigntos = res.ResponseData;
        for(var i = 0; i < assigntos.length; i++){
          this.d_assigntos.push({
            value: assigntos[i].UserID,
            name: assigntos[i].UserInfoDisplayName,
            default: false
          })
        }
      })
  }

  setAssignTo(usr){
    this.assignedToUserID = usr.value;
  }

  //Attach File
  setFiles(files) {
    this.attachFiles = files;
  }

  cancel(){
    this.viewCtrl.dismiss();
  }
  save(){
    let body = {
      'TaskName': this.taskTitle,
      'TaskDescription': this.taskSummary,
      'TaskListID': this.tasklistid,
      'SpaceID': this.spaceid,
      'AssignedToUserID': this.assignedToUserID,
      'TaskDueDate': '2018-03-30T06:59:55'
    }
    console.log(body);
    this.taskProvider.createTask(JSON.stringify(body))
      .finally(()=>{
      })
      .subscribe((res)=>{
        console.log(res);
        if(res.IsError == false){
          this.viewCtrl.dismiss();
        }
      })
  }
}
