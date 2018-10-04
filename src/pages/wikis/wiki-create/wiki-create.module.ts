import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
// Import Froala Editor.
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { WikiCreatePage } from './wiki-create';
import { IonTagsInputModule } from 'ionic-tags-input';
import { MbscModule } from '../../..//lib/mobiscroll/js/mobiscroll.angular.min';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    WikiCreatePage,
  ],
  imports: [
    TranslateModule,
    ComponentsModule,
    // Froala Editor
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    IonTagsInputModule,
    MbscModule,
    PipesModule,
    IonicPageModule.forChild(WikiCreatePage),
  ],
  providers: [
    FilePath,
    AppCenterAnalytics
  ]
})
export class WikiCreatePageModule { }
