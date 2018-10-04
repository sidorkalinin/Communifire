import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WallpostDetailPage } from './wallpost-detail';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { Vibration } from '@ionic-native/vibration';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    WallpostDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WallpostDetailPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  providers: [
    TapticEngine,
    InAppBrowser,
    Vibration
  ]
})
export class WallpostDetailPageModule { }
