import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '@ionic-native/device';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Badge } from "@ionic-native/badge";

import { CfApp } from './app.component';
import { Settings } from '../providers/settings';
import { NotificationHelper } from '../util/notification-helper';

import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { httpFactory } from './http.interceptor';
import { AuthenticationProvider } from '../providers/authentication';
import { StatusUpdateComponent } from '../components/status-update/status-update';
import { ComponentsModule } from '../components/components.module';
import { ModalModule } from '../modals/modals.module';
import { SamlLoginPage } from '../pages/saml-login/saml-login';

import { Push } from '@ionic-native/push';
import { Keyboard } from '@ionic-native/keyboard';
import { Network } from "@ionic-native/network";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ZoomAreaModule } from 'ionic2-zoom-area';
import { LocalStorageHelper } from '../util/localStorage-helper'
import { Utilities } from '../util/utilities'
import { AppCenterCrashes } from '@ionic-native/app-center-crashes';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { PipesModule } from '../pipes/pipes.modules';
import { Deeplinks } from '@ionic-native/deeplinks';

// Import Angular2 plugin.
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
  });
}

@NgModule({
  declarations: [
    CfApp
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    ModalModule,
    PipesModule,
    IonicModule.forRoot(CfApp, {
      scrollAssist: false,
      autoFocusAssist: false,
      StatusBarOverlaysWebView: false,
      backButtonText: "",
      statusbarPadding: true,
      tabsHideOnSubPages: true,
      mode: "ios"
    }),
    IonicStorageModule.forRoot(),
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    // ZoomAreaModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    CfApp,
    StatusUpdateComponent
  ],
  providers: [
    AppCenterCrashes,
    AppCenterAnalytics,
    Deeplinks,
    TranslateService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
    StatusBar,
    SplashScreen,
    Keyboard,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthenticationProvider,
    Push,
    NotificationHelper,
    LocalStorageHelper,
    Utilities,
    Device,
    AndroidFullScreen,
    ScreenOrientation,
    InAppBrowser,
    Badge,
    Network
  ]
})
export class AppModule { }
