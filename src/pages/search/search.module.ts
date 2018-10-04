import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { PipesModule } from '../../pipes/pipes.modules';
import { Vibration } from '@ionic-native/vibration';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  providers: [
    Vibration,
    AppCenterAnalytics,
  ]
})
export class SearchPageModule {}
