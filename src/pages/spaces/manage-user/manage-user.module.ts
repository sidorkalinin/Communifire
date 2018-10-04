import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageUserPage } from './manage-user';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../pipes/pipes.modules';
import { PeopleProvider } from '../../../providers/people';
import { SpacesProvider } from '../../../providers/spaces';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@NgModule({
  declarations: [
    ManageUserPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageUserPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  providers: [
    PeopleProvider,
    SpacesProvider,
    AppCenterAnalytics
  ]
})
export class ManageUserPageModule {}
