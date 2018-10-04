import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogListPage } from './blog-list';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../../../pipes/pipes.modules';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';

@NgModule({
  declarations: [
    BlogListPage,
  ],
  imports: [
    IonicPageModule.forChild(BlogListPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  providers: [
    AppCenterAnalytics,
  ]
})
export class BlogListPageModule {}
