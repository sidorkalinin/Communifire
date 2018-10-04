import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileDetailPage } from './file-detail';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from '../../../modals/modals.module';
import { ComponentsModule } from '../../../components/components.module';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { Vibration } from '@ionic-native/vibration';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileOpener } from '@ionic-native/file-opener';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { PipesModule } from '../../../pipes/pipes.modules'

@NgModule({
  declarations: [
    FileDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FileDetailPage),
    TranslateModule,
    ModalModule,
    ComponentsModule,
    PipesModule
  ],
  providers: [
    TapticEngine,
    InAppBrowser,
    Vibration,
    File,
    FileTransfer,
    FileTransferObject,
    AppCenterAnalytics,
    DocumentViewer,
    FileOpener,
    PhotoLibrary
  ]
})
export class FileDetailPageModule { }
