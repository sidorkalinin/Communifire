import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { SpacesProvider } from "../../providers/spaces"; 
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'folder-select',
  templateUrl: 'folder-select.html'
})
export class FolderSelectComponent implements OnChanges {

  @Input() spaceId;
  @Output() folderSelected = new EventEmitter<any>();
  folderList: any = [];
  currentFolder: any = null;
  selectOptions: any = {
    title: ""
  }

  constructor(
    private spacesProvider: SpacesProvider,
    private translate: TranslateService
  ) {
    this.translate.get("COMMONS.SELECT_FOLDER").subscribe(trans => {
      this.selectOptions.title = trans;
    });
  }

  ngOnChanges(changes?: SimpleChanges){
    if(changes.spaceId){
      this.getFolders();
    }
  }

  onChange($event){
    console.log($event);
    this.folderSelected.emit($event);
  }

  getFolders(){
    this.spacesProvider.getFolderList(this.spaceId).subscribe(res => {
      this.folderList = res.ResponseData;
      if (this.folderList[0]){
        this.currentFolder = this.folderList[0];
        this.folderSelected.emit(this.currentFolder);
      }
    })
  }

}
