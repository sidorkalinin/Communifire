import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { TranslateModule } from '@ngx-translate/core';
// Import Froala Editor.
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { MbscModule } from '../../..//lib/mobiscroll/js/mobiscroll.angular.min';
import { ComponentsModule } from '../../../components/components.module';
import { IonTagsInputModule } from "ionic-tags-input";
import { EventCreatePage } from './event-create';
import { EventProvider } from '../../../providers/event';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    EventCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(EventCreatePage),
    MbscModule,
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
    EventProvider,
    AppCenterAnalytics,
  ]
})
export class EventCreatePageModule { }
