import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscussionListPage } from './discussion-list';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    DiscussionListPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscussionListPage),
    TranslateModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [
    AppCenterAnalytics,
  ]
})
export class DiscussionListPageModule { }
