import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscussionCategoryPage } from './discussion-category';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    DiscussionCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscussionCategoryPage),
    TranslateModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [
    AppCenterAnalytics,
  ]
})
export class DiscussionCategoryPageModule { }
