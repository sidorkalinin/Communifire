import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ModalController } from "ionic-angular";
import { ContentProvider } from "../../../providers/content";
import { MilestoneSelectModalComponent } from "../milestone-select-modal/milestone-select-modal";

@Component({
  selector: 'milestone-select',
  templateUrl: 'milestone-select.html'
})
export class MilestoneSelectComponent implements OnChanges {

  @Input() spaceId: number;
  @Input() currentMilestone: number;
  @Input() projectId: number;
  @Output() returnMilestone = new EventEmitter<any>();
  @Output() milestoneUploaded = new EventEmitter<any>();
  private milestones: any;
  public milestone: any = {
    MilestoneID: 0
  };
  @Input() isComment: boolean = false;

  constructor(
    private contentProvider: ContentProvider,
    public modalCtrl: ModalController
  ) {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.spaceId){
      this.getMilestones();
    }
  }

  onChange(){
    this.returnMilestone.emit(this.currentMilestone);
  }

  getMilestones(){
    this.contentProvider.getCasesMilestones(this.spaceId, this.projectId).subscribe(res => {
      this.milestones = res.ResponseData;
      this.milestoneUploaded.emit();
      if (this.currentMilestone) {
        this.milestones.forEach(element => {
          console.log(this.currentMilestone, element.MilestoneID);
          if (this.currentMilestone === element.MilestoneID) {
            this.milestone = element;
          }
        });
      }
    })
  }

  openModal() {
    const modal = this.modalCtrl.create(MilestoneSelectModalComponent, {
      spaceId: this.spaceId,
      milestone: this.milestone,
      projectId: this.projectId,
      isComment: this.isComment
    });
    modal.present();
    modal.onDidDismiss((data) => {
      if (!data.isCanceled) {
        if (data.milestone !== null) {
          this.milestone = data.milestone;
          this.currentMilestone = this.milestone.MilestoneID;
        } else {
          this.milestone = {
            MilestoneID: 0
          };
          this.currentMilestone = null;
          
        }
        this.returnMilestone.emit(this.currentMilestone);
      }
    });
  }

}
