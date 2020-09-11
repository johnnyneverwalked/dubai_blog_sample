import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarModule} from "./components/nav-bar/nav-bar.module";
import {HttpClientModule} from "@angular/common/http";
import {DividerSkewModule} from "./components/divider-skew/divider-skew.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NavBarModule,
    DividerSkewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
