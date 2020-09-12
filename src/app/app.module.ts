import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarModule} from "./components/nav-bar/nav-bar.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DividerSkewModule} from "./components/divider-skew/divider-skew.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ModalModule} from './components/modal/modal.module';
import {AuthInterceptor} from './interceptors/HttpInterceptor';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from './components/button/button.module';
import {LoaderModule} from './components/loader/loader.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NavBarModule,
    DividerSkewModule,
    ModalModule,
    ScrollToModule.forRoot(),
    ButtonModule,
    LoaderModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
