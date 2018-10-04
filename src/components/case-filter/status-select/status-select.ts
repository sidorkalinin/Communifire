import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ModalController } from "ionic-angular";
import { ContentProvider } from "../../../providers/content";
import { StatusSelectModalComponent } from "../status-select-modal/status-select-modal";

@Component({
  selector: 'status-select',
  templateUrl: 'status-select.html'
})
export class StatusSelectComponent implements OnChanges {

  @Input() spaceId: number;
  @Input() currentStatus: number;
  public status: any = {
    IssueStatusID: 0
  };
  @Output() returnStatus = new EventEmitter<any>();
  @Output() statusUploaded = new EventEmitter<any>();
  private statuses: any;
  @Input() isComment: boolean = false;

  constructor(
    private contentProvider: ContentProvider,
    public modalCtrl: ModalController
  ) {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.spaceId){
      this.getStatuses();
    }
  }

  onChange(){
    this.returnStatus.emit(this.currentStatus);
  }

  getStatuses(){
    this.contentProvider.getCasesStatuses(this.spaceId).subscribe(res => {
      this.statuses = res.ResponseData;
      this.statusUploaded.emit();
      if (this.currentStatus) {
        this.statuses.forEach(element => {
          if (this.currentStatus === element.IssueStatusID) {
            this.status = element;
          }
        });
      }
    })
  }

  openModal() {
    const modal = this.modalCtrl.create(StatusSelectModalComponent, {
      spaceId: this.spaceId,
      status: this.status,
      isComment: this.isComment
    });
    modal.present();
    modal.onDidDismiss((data) => {
      if (!data.isCanceled) {
        if (data.status !== null) {
          this.status = data.status;
          this.currentStatus = this.status.IssueStatusID;
        } else {
          this.status = {
            IssueStatusID: 0
          };
          this.currentStatus = null;
          
        }
        this.returnStatus.emit(this.currentStatus);
      }
    });
  }

}
