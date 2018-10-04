import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CasesFilterPage } from './cases-filter';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    CasesFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(CasesFilterPage),
    TranslateModule,
    ComponentsModule,
    PipesModule
  ],
})
export class CasesFilterPageModule { }
