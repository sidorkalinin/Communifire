import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ModalController } from "ionic-angular";
import { ContentProvider } from "../../../providers/content";
import { CategorySelectModalComponent } from "../category-select-modal/category-select-modal";

@Component({
  selector: 'category-select',
  templateUrl: 'category-select.html'
})
export class CategorySelectComponent {

  @Input() spaceId: number;
  @Input() currentCategory: number;
  @Input() projectId: number;
  @Input() isComment: boolean = false;
  public category: any = {
    ProjectSectionID: 0
  };
  @Output() returnCategory = new EventEmitter<any>();
  @Output() CategoryUploaded = new EventEmitter<any>();
  private categories: any;

  constructor(
    private contentProvider: ContentProvider,
    public modalCtrl: ModalController
  ) {
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.spaceId){
      this.getCategories();
    }
  }

  onChange(){
    this.returnCategory.emit(this.currentCategory);
  }

  getCategories(){
    this.contentProvider.getCasesCategories(this.spaceId, this.projectId).subscribe(res => {
      this.categories = res.ResponseData;
      this.CategoryUploaded.emit();
      if (this.currentCategory) {
        this.categories.forEach(element => {
          if (this.currentCategory === element.ProjectSectionID) {
            this.category = element;
          }
        });
      }
    })
  }

  openModal() {
    const modal = this.modalCtrl.create(CategorySelectModalComponent, {
      spaceId: this.spaceId,
      category: this.category,
      projectId: this.projectId,
      isComment: this.isComment
    });
    modal.present();
    modal.onDidDismiss((data) => {
      if (!data.isCanceled) {
        if (data.category !== null) {
          this.category = data.category;
          this.currentCategory = this.category.ProjectSectionID;
        } else {
          this.category = {
            ProjectSectionID: 0
          };
          this.currentCategory = null;
          
        }
        this.returnCategory.emit(this.currentCategory);
      }
    });
  }


}
