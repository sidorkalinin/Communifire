import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { TranslateModule } from '@ngx-translate/core';
// Import Froala Editor.
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ComponentsModule } from '../../../components/components.module';
import { VideoCreatePage } from './video-create';
import { IonTagsInputModule } from 'ionic-tags-input';
import { MbscModule } from '../../../lib/mobiscroll/js/mobiscroll.angular.min';
import { VideoEditor } from '@ionic-native/video-editor';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    VideoCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(VideoCreatePage),
    TranslateModule,
    ComponentsModule,
    // Froala Editor
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    IonTagsInputModule,
    MbscModule,
    PipesModule
  ],
  providers: [
    FilePath,
    VideoEditor,
    AppCenterAnalytics,
  ]
})
export class VideoCreatePageModule { }
