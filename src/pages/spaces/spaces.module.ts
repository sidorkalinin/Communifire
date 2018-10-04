import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SpacesPage } from './spaces';
import { ComponentsModule } from '../../components/components.module';
import { SpacesProvider } from '../../providers/spaces';
import { PipesModule } from '../../pipes/pipes.modules'

@NgModule({
  declarations: [
    SpacesPage,
  ],
  imports: [
    IonicPageModule.forChild(SpacesPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  providers: [
    SpacesProvider
  ]
})
export class SpacesPageModule { }
