import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
import { TaskProvider } from '../../../providers/task';
import { SpacesProvider } from '../../../providers/spaces';
import { MbscModule } from '../../../lib/mobiscroll/js/mobiscroll.angular.min';
import { TaskEditPage } from './task-edit';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    TaskEditPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskEditPage),
    TranslateModule,
    ComponentsModule,
    MbscModule,
    PipesModule
  ],
  providers: [
    TaskProvider,
    SpacesProvider
  ]
})
export class TaskEditPageModule { }
