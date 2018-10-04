import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
import { PhotoEditPage } from './photo-edit';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    PhotoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoEditPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
})
export class PhotoEditPageModule { }
