import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdeaDetailPage } from './idea-detail';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from '../../../modals/modals.module';
import { ComponentsModule } from '../../../components/components.module'
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    IdeaDetailPage
  ],
  imports: [
    IonicPageModule.forChild(IdeaDetailPage),
    TranslateModule,
    ModalModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [
    AppCenterAnalytics
  ]
})
export class IdeaDetailPageModule { }
