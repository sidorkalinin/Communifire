import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpaceDetailsPage } from './space-details';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
import { PeopleProvider } from '../../../providers/people';
import { SpacesProvider } from '../../../providers/spaces';
import { PipesModule } from '../../../pipes/pipes.modules'
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@NgModule({
  declarations: [
    SpaceDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SpaceDetailsPage),
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
export class SpaceDetailsPageModule {}
