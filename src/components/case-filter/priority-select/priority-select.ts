import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ModalController } from "ionic-angular";
import { ContentProvider } from "../../../providers/content";
import { PrioritySelectModalComponent } from "../priority-select-modal/priority-select-modal";

@Component({
  selector: 'priority-select',
  templateUrl: 'priority-select.html'
})
export class PrioritySelectComponent implements OnChanges {

  
  @Input() spaceId: number;
  @Input() currentPriority: number;
  public priority: any = {
    IssuePriorityID: 0
  };
  @Output() returnPriority = new EventEmitter<any>();
  @Output() priorityUploaded = new EventEmitter<any>();
  private priorities: any;
  @Input() isComment: boolean = false;

  constructor(
    private contentProvider: ContentProvider,
    public modalCtrl: ModalController
  ) {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.spaceId){
      this.getPrioriries();
    }
  }

  onChange(){
    this.returnPriority.emit(this.currentPriority);
  }

  getPrioriries(){
    this.contentProvider.getCasesPriorities(this.spaceId).subscribe(res => {
      this.priorities = res.ResponseData;
      this.priorityUploaded.emit();
      if (this.currentPriority) {
        this.priorities.forEach(element => {
          if (this.currentPriority === element.IssuePriorityID) {
            this.priority = element;
          }
        });
      }
    })
  }

  openModal() {
    const modal = this.modalCtrl.create(PrioritySelectModalComponent, {
      spaceId: this.spaceId,
      priority: this.priority,
      isComment: this.isComment
    });
    modal.present();
    modal.onDidDismiss((data) => {
      if (!data.isCanceled) {
        if (data.priority !== null) {
          this.priority = data.priority;
          this.currentPriority = this.priority.IssuePriorityID;
        } else {
          this.priority = {
            IssuePriorityID: 0
          };
          this.currentPriority = null;
          
        }
        this.returnPriority.emit(this.currentPriority);
      }
    });
  }

}
