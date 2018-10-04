import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ModalController } from "ionic-angular";
import { PeopleProvider } from "../../../providers/people";
import { AssignedToSelectModalComponent } from "../assigned-to-select-modal/assigned-to-select-modal";

@Component({
  selector: 'assign-to-select',
  templateUrl: 'assign-to-select.html'
})
export class AssignToSelectComponent implements OnChanges {

  @Input() spaceId: number;
  @Input() currentUser: number;
  @Input() projectId: number;
  @Input() isCaseUpdate: boolean;
  @Input() title: string = "COMMONS.ASSIGN_TO";
  @Output() returnUser = new EventEmitter<any>();
  @Output() userUploaded = new EventEmitter<any>();
  //private users: any;
  user: any = {
    UserID: 0
  };
  @Input() isComment: boolean = false;

  constructor(
    private peopleProvider: PeopleProvider,
    public modalCtrl: ModalController
  ) {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.currentUser){
      if(this.currentUser){
        this.getUser();
      }
    }
  }

  onChange(){
    this.returnUser.emit(this.currentUser);
  }

  getUser(){
    this.peopleProvider.getUserDetail(this.currentUser).subscribe(res => {
      this.user = res.ResponseData;
      this.userUploaded.emit();
    })
  }

  openModal() {
    console.log(this.isCaseUpdate);
    const modal = this.modalCtrl.create(AssignedToSelectModalComponent, {
      spaceId: this.spaceId,
      user: this.user,
      title: this.title,
      isComment: this.isComment,
      isCaseUpdate: this.isCaseUpdate,
      projectId: this.projectId
    });
    modal.present();
    modal.onDidDismiss((data) => {
      if (!data.isCanceled) {
        if (data.user !== null) {
          this.user = data.user;
          this.currentUser = this.user.UserID;
        } else {
          this.user = {
            UserID: 0
          };
          this.currentUser = null;
          
        }
        this.returnUser.emit(this.currentUser);
      }
    });
  }

}
