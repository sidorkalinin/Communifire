import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoDetailPage } from './photo-detail';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    PhotoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoDetailPage),
    TranslateModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [
    AppCenterAnalytics
  ]
})
export class PhotoDetailPageModule { }
