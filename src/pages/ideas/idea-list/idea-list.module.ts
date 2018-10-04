import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdeaListPage } from './idea-list';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../pipes/pipes.modules';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@NgModule({
  declarations: [
    IdeaListPage,
  ],
  imports: [
    IonicPageModule.forChild(IdeaListPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  providers: [
    AppCenterAnalytics
  ]
})
export class IdeaListPageModule { }
