import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { TranslateModule } from '@ngx-translate/core';
// Import Froala Editor.
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ComponentsModule } from '../../../components/components.module';
import { CaseEditPage } from './case-edit';
import { IonTagsInputModule } from 'ionic-tags-input';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    CaseEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseEditPage),
    TranslateModule,
    ComponentsModule,
    // Froala Editor
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    IonTagsInputModule,
    PipesModule
  ],
  providers: [
    FilePath,
    AppCenterAnalytics,
  ]
})
export class CaseEditPageModule { }
