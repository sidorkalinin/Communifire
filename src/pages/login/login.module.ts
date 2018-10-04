import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { LoginPage } from './login';
import { ComponentsModule } from '../../components/components.module';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PipesModule } from '../../pipes/pipes.modules'
import { Push } from '@ionic-native/push';
import { NotificationHelper } from '../../util/notification-helper';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    TranslateModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [
    SplashScreen,
    Push,
    NotificationHelper,
  ]
})
export class LoginPageModule { }
