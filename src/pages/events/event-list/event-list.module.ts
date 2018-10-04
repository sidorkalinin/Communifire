import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventListPage } from './event-list';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../pipes/pipes.modules'
import { ComponentsModule } from '../../../components/components.module';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@NgModule({
  declarations: [
    EventListPage,
  ],
  imports: [
    IonicPageModule.forChild(EventListPage),
    TranslateModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [
    AppCenterAnalytics,
  ]
})
export class EventListPageModule { }
