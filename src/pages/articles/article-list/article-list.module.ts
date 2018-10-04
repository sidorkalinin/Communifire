import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleListPage } from './article-list';
import { ComponentsModule } from '../../../components/components.module';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { Vibration } from '@ionic-native/vibration';
import { PipesModule } from '../../../pipes/pipes.modules';

import { TranslateModule } from '@ngx-translate/core';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@NgModule({
  declarations: [
    ArticleListPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleListPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  providers: [
    TapticEngine,
    Vibration,
    AppCenterAnalytics,
  ]
})
export class ArticleListPageModule {}
