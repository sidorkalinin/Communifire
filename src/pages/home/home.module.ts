import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';
import { SpacesProvider } from '../../providers/spaces';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PipesModule } from '../../pipes/pipes.modules'
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    IonicPageModule,
    TranslateModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [
    SpacesProvider,
    SplashScreen
  ]
})
export class HomePageModule { }
