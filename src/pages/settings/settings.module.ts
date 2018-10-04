import { NgModule, Pipe } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsPage } from './settings';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.modules'

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    TranslateModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [
    AppCenterAnalytics
  ]
})
export class SettingsPageModule { }
