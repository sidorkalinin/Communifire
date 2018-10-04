import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

import { enableProdMode } from '@angular/core';
enableProdMode();

import * as $ from 'jquery'; window["$"] = $; window["jQuery"] = $;

platformBrowserDynamic().bootstrapModule(AppModule);
