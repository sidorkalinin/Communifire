import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleDetailPage } from './article-detail';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from '../../../modals/modals.module';
import { ComponentsModule } from '../../../components/components.module';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { Vibration } from '@ionic-native/vibration';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    ArticleDetailPage
  ],
  imports: [
    IonicPageModule.forChild(ArticleDetailPage),
    TranslateModule,
    ModalModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [
    TapticEngine,
    Vibration,
    AppCenterAnalytics,
  ]
})
export class ArticleDetailPageModule { }
