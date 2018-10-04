import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { TranslateModule } from '@ngx-translate/core';
// Import Froala Editor.
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ComponentsModule } from '../../../components/components.module';
import { CaseCreatePage } from './case-create';
import { IonTagsInputModule } from 'ionic-tags-input';
import { PeopleProvider } from '../../../providers/people';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    CaseCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(CaseCreatePage),
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
    PeopleProvider,
    AppCenterAnalytics,
  ]
})
export class CaseCreatePageModule { }
