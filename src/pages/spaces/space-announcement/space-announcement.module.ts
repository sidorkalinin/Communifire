import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpaceAnnouncementPage } from './space-announcement';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../pipes/pipes.modules';
import { SpacesProvider } from '../../../providers/spaces';

@NgModule({
  declarations: [
    SpaceAnnouncementPage,
  ],
  imports: [
    IonicPageModule.forChild(SpaceAnnouncementPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  providers: [
    SpacesProvider
  ]
})
export class SpaceAnnouncementPageModule {}
