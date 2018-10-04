import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAccountPage } from './my-account';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

import { ContentProvider } from '../../providers/content';
import { Network } from "@ionic-native/network";
import { PipesModule } from '../../pipes/pipes.modules'

@NgModule({
  declarations: [
    MyAccountPage
  ],
  imports: [
    IonicPageModule.forChild(MyAccountPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  providers: [
    ContentProvider,
    Network
  ]
})
export class MyAccountPageModule { }
