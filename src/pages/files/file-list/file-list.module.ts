import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileListPage } from './file-list';
import { ComponentsModule } from '../../../components/components.module';
import { TapticEngine } from '@ionic-native/taptic-engine';
import { Vibration } from '@ionic-native/vibration';
import { PipesModule } from '../../../pipes/pipes.modules';
import { File } from '@ionic-native/file';
import { TranslateModule } from '@ngx-translate/core';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { PhotoLibrary } from '@ionic-native/photo-library';

@NgModule({
  declarations: [
    FileListPage,
  ],
  imports: [
    IonicPageModule.forChild(FileListPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
  providers: [
    TapticEngine,
    Vibration,
    AppCenterAnalytics,
    File,
    FilePath,
    FileTransfer,
    FileTransferObject,
    PhotoLibrary
  ]
})
export class FileListPageModule { }
