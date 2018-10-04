import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageFriendPage } from './manage-friend';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../pipes/pipes.modules';
import { PeopleProvider } from '../../providers/people';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@NgModule({
  declarations: [
    ManageFriendPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageFriendPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  providers: [
    PeopleProvider,
    AppCenterAnalytics
  ]
})
export class ManageFriendPageModule {}
