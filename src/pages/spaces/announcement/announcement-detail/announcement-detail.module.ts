import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnnouncementDetailPage } from './announcement-detail';
import { ComponentsModule } from '../../../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../../pipes/pipes.modules';
import { SpacesProvider } from '../../../../providers/spaces';

@NgModule({
  declarations: [
    AnnouncementDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AnnouncementDetailPage),
    ComponentsModule,
    TranslateModule,
    PipesModule,
  ],
  providers: [
    SpacesProvider
  ]
})
export class AnnouncementDetailPageModule {}
