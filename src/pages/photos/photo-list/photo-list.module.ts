import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoListPage } from './photo-list';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../pipes/pipes.modules';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@NgModule({
  declarations: [
    PhotoListPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoListPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  providers: [
    AppCenterAnalytics
  ]
})
export class PhotoListPageModule {}
