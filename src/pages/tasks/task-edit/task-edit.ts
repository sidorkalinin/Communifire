import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TaskProvider } from '../../../providers/task';
import { PeopleProvider } from '../../../providers/people';

/**
 * Generated class for the TaskEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "task-edit",
  segment: "task-edit"
})
@Component({
  selector: 'page-task-edit',
  templateUrl: 'task-edit.html',
})
export class TaskEditPage {
  task: any;
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
    this.task = this.navParams.get('task');
    console.log(this.task);
    this.spaceid = this.task.SpaceID;
    this.tasklistid = this.task.TaskListID;
    this.taskTitle = this.task.TaskName;
    this.taskSummary = this.task.TaskDescription;
    this.task.dueDate = this.task.TaskDueDate;
    this.assignedToUserID = this.task.AssignedToUserID;    
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
            default: assigntos[i].UserID == this.assignedToUserID
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
