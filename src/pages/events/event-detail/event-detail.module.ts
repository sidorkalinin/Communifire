import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDetailPage } from './event-detail';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'angular2-moment';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    EventDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDetailPage),
    ComponentsModule,
    TranslateModule,
    MomentModule,
    PipesModule
  ],
  providers: [
    AppCenterAnalytics,
  ]
})
export class EventDetailPageModule { }
