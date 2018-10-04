import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitePage } from './invite';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.modules'
import { SpacesProvider } from '../../providers/spaces';

@NgModule({
  declarations: [
    InvitePage,
  ],
  imports: [
    TranslateModule,
    ComponentsModule,
    PipesModule,
    IonicPageModule.forChild(InvitePage),
  ],
  providers: [
    SpacesProvider,    
  ]
})
export class InvitePageModule {}
