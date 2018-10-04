import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { SpacesProvider } from "../../../providers/spaces";
import { TranslateService } from '@ngx-translate/core';
import { TaskProvider } from '../../../providers/task';
import { AuthenticationProvider } from '../../../providers/authentication';

/**
 * Generated class for the TaskListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "task-list",
  segment: "task-list"
})
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage implements OnInit{
  loader: any;
  spaces: any = [];
  tasklist: any = [];
  tasks: any = [];
  filteredtasks: any = [];

  selectedSpaceID: any;
  selectedTaskListID: any;

  myID: any;

  isLoadingTasks: boolean;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,  
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    private spaceProvider: SpacesProvider,
    private taskProvider: TaskProvider,
    private authProvider: AuthenticationProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
  }

  async ngOnInit() {
    this.translate.get("COMMONS.LOADING").subscribe(res => {
      this.loader = this.loadingCtrl.create({
        content: res,
      });
      this.loader.present();
      this.loadSpaceList();
      this.loadMyID();
    });
  }

  loadMyID(){
    this.authProvider.getMyDetails()
      .finally(()=>{

      })
      .subscribe((res)=>{
        this.myID = res.UserID;
      })
  }

  loadSpaceList(){
    this.spaceProvider.getMySpaces()
      .finally(()=>{
        this.loader.dismiss();
      })
      .subscribe((res) =>{
        this.spaces = [];
        //this.spaces.push({ name: 'Top Level Community', value: 0, default: true });
        for(let i = 0; i < res.length; i++){
          this.spaces.push({name: res[i].SpaceName, value: res[i].SpaceID, default: i == 0})
        }
      })
  }
  loadTaskList(spaceid){
    this.tasklist = [];
    this.tasks = [];
    this.taskProvider.getList(spaceid)
      .finally(()=>{
      })
      .subscribe((res)=>{        
        for(let i = 0; i < res.ResponseData.length; i++){
          this.tasklist.push({name: res.ResponseData[i].TaskListName, value: res.ResponseData[i].TaskListID, default: i == 0});
        }
      });
  }
  loadTasks(listid){
    this.isLoadingTasks = true;
    this.taskProvider.getTasks(listid)
      .finally(()=>{        
        this.isLoadingTasks = false;
      })
      .subscribe(res =>{        
        this.tasks = res.ResponseData;
        this.filteredtasks = this.tasks;
      });
  }
  setSpace(space){
    this.selectedSpaceID = space.value;
    this.loadTaskList(space.value);
  }
  setTaskList(tasklist){
    if(tasklist.value == -1)
      return;
    this.selectedTaskListID = tasklist.value;
    this.loadTasks(tasklist.value);
  }
  addTaskList(){
    this.navCtrl.push('task-list-create');    
  }
  addTask(){
    this.navCtrl.push('task-create', {spaceid: this.selectedSpaceID, tasklistid: this.selectedTaskListID});    
  }

  edit(task){
    this.navCtrl.push('task-edit', {task: task});
  }
  filter(type){
    if(type == 'All'){
      this.filteredtasks = this.tasks;
    }else if(type == 'Today'){

    }else if(type == 'Mine'){
      this.filteredtasks = this.tasks.filter((v) => {
        if (v.AssignedToUserID == this.myID) {
            return true;
        }else
          return false;
      })
    }
  }
}
