import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoListPage } from './video-list';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../pipes/pipes.modules';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@NgModule({
  declarations: [
    VideoListPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoListPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  providers: [
    AppCenterAnalytics
  ]
})
export class VideoListPageModule { }
