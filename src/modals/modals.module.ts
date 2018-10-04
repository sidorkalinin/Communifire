import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';
import { InvitePeopleModalComponent } from './invite-people-modal/invite-people-modal';
import { SpaceModalComponent } from './select-space-modal/spaces';

import { PeopleProvider } from '../providers/people';
import { Device } from '@ionic-native/device';
import { TaskProvider } from '../providers/task';
import { MbscModule } from '../lib/mobiscroll/js/mobiscroll.angular.min';
import { SelectSearchModalComponent } from './select-search-modal/select-search';
import { PeopleMultiSelectModalComponent } from './people-multi-select-modal/people-multi-select';
import { FolderSelectModalComponent } from './folder-select-modal/folder-select';
import { FolderOperationModalComponent } from './folder-operation-modal/folder-operation';
import { DiscussionCategorySelectModal } from './discussion-category-select-modal/discussion-category-select';
import { ResourceMultiSelectModalComponent } from './resource-multi-select-modal/resource-multi-select';
import { PeopleOneSelectModalComponent } from './people-one-select-modal/people-one-select';
import { CroppingPageModal } from './cropping-page-modal/cropping-page-modal';
import { ImageCropperModule } from "ng2-img-cropper/index";
import { PipesModule } from '../pipes/pipes.modules';

@NgModule({
  declarations: [
    InvitePeopleModalComponent,
    SpaceModalComponent,
    SelectSearchModalComponent,
    PeopleMultiSelectModalComponent,
    PeopleOneSelectModalComponent,
    FolderSelectModalComponent,
    FolderOperationModalComponent,
    DiscussionCategorySelectModal,
    ResourceMultiSelectModalComponent,
    CroppingPageModal
  ],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule,
    ComponentsModule,
    MbscModule,
    ImageCropperModule,
    PipesModule
  ],
  entryComponents: [
    InvitePeopleModalComponent,
    SpaceModalComponent,
    SelectSearchModalComponent,
    PeopleMultiSelectModalComponent,
    PeopleOneSelectModalComponent,
    FolderSelectModalComponent,
    FolderOperationModalComponent,
    DiscussionCategorySelectModal,
    ResourceMultiSelectModalComponent,
    CroppingPageModal
  ],
  providers: [
    PeopleProvider,
    TaskProvider,
    Device
  ]
})
export class ModalModule { }