import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SamlLoginPage } from './saml-login';
import { PipesModule } from '../../pipes/pipes.modules'

@NgModule({
  declarations: [
    SamlLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(SamlLoginPage),
    TranslateModule,
    PipesModule
  ],
})
export class SamlLoginPageModule { }
