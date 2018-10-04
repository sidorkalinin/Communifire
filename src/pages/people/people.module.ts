import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module'
import { PipesModule } from '../../pipes/pipes.modules'

import { PeoplePage } from './people';
import { PeopleProvider } from '../../providers/people';

@NgModule({
  declarations: [
    PeoplePage
  ],
  imports: [
    IonicPageModule.forChild(PeoplePage),
    TranslateModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [
    PeopleProvider
  ]
})
export class PeoplePageModule {}
