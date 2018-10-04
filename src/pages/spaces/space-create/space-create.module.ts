import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { TranslateModule } from '@ngx-translate/core';
// Import Froala Editor.
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ComponentsModule } from '../../../components/components.module';
import { SpaceCreatePage } from './space-create';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    SpaceCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(SpaceCreatePage),
    TranslateModule,
    ComponentsModule,
    // Froala Editor
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    PipesModule
  ],
  providers: [
    FilePath
  ]
})
export class SpaceCreatePageModule { }
