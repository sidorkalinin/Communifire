import { NgModule } from '@angular/core';
import { SearchPipe } from './search';
import { SafeHtmlPipe } from "./safe-html";
import { SortByPipe } from './sort-by';
import { LocalizedDatePipe } from './date';
import { SecurePipe } from './secure/secure';
import { PipesModules } from './pipes.module';

@NgModule({
  declarations: [
    SearchPipe,
    SafeHtmlPipe,
    SortByPipe,
    LocalizedDatePipe
  ],
  imports: [PipesModules],
  exports: [
    SearchPipe,
    SafeHtmlPipe,
    SortByPipe,
    LocalizedDatePipe,
    SecurePipe
  ]
})
export class PipesModule { }