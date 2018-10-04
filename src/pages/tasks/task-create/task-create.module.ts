import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
import { TaskProvider } from '../../../providers/task';
import { SpacesProvider } from '../../../providers/spaces';
import { MbscModule } from '../../../lib/mobiscroll/js/mobiscroll.angular.min';
import { TaskCreatePage } from './task-create';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    TaskCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TaskCreatePage),
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
export class TaskCreatePageModule { }
