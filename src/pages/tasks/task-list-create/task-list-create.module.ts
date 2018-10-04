import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
import { TaskListCreatePage } from './task-list-create';
import { TaskProvider } from '../../../providers/task';
import { SpacesProvider } from '../../../providers/spaces';
import { MbscModule } from '../../../lib/mobiscroll/js/mobiscroll.angular.min';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    TaskListCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TaskListCreatePage),
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
export class TaskListCreatePageModule { }
