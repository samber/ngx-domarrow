import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxDomarrowModule } from 'ngx-domarrow';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxDomarrowModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
