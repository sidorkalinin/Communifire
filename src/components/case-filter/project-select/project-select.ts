import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ModalController } from "ionic-angular";
import { ContentProvider } from "../../../providers/content";
import { ProjectSelectModalComponent } from "../project-select-modal/project-select-modal";

@Component({
  selector: 'project-select',
  templateUrl: 'project-select.html'
})
export class ProjectSelectComponent implements OnChanges {

  @Input() spaceId: number;
  @Input() currentProject: number;
  public project: any = {
    ProjectID: 0
  };
  @Output() returnProject = new EventEmitter<any>();
  @Output() ProjectUploaded = new EventEmitter<any>();
  private projects: any;
  @Input() isComment: boolean = false;

  constructor(
    private contentProvider: ContentProvider,
    public modalCtrl: ModalController
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.spaceId) {
      this.getProjects();
    }
  }

  onChange() {
    this.returnProject.emit(this.currentProject);
  }

  getProjects() {
    this.contentProvider.getCasesProjects(this.spaceId).subscribe(res => {
      this.projects = res.ResponseData;
      if (this.currentProject) {
        this.projects.forEach(element => {
          if (this.currentProject === element.ProjectID) {
            this.project = element;
          }
        });
      }
    })
  }

  openModal() {
    const modal = this.modalCtrl.create(ProjectSelectModalComponent, {
      spaceId: this.spaceId,
      project: this.project,
      isComment: this.isComment
    });
    modal.present();
    modal.onDidDismiss((data) => {
      if (!data.isCanceled) {
        if (data.project !== null) {
          this.project = data.project;
          this.currentProject = this.project.ProjectID;
        } else {
          this.project = {
            ProjectID: 0
          };
          this.currentProject = null;
          
        }
        this.returnProject.emit(this.currentProject);
      }
    });
  }
}
