import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscussionItemPage } from './discussion-item';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    DiscussionItemPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscussionItemPage),
    TranslateModule,
    ComponentsModule,
    PipesModule
  ],
})
export class DiscussionItemPageModule { }
