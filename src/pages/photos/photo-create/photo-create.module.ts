import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
import { PhotoCreatePage } from './photo-create';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    PhotoCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoCreatePage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
})
export class PhotoCreatePageModule { }
