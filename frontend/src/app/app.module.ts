import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/material-module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, SPINNER } from 'ngx-ui-loader';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { tokenInterceptor } from './services/token.interceptor';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from './shared/shared.module';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: "Loading...",
  textColor: "white",
  textPosition: "center-center",
  pbColor: "white",
  bgsColor: "white",
  fgsColor: "white",
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5

}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    QuillModule.forRoot(),
    SharedModule
  ],
  // multi is set to true cause multiple req is set to hit at the same time for passing the token through Interceptor
  providers: [HttpClientModule, { provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true }],
  // provideClientHydration(),
  // provideAnimationsAsync()

  bootstrap: [AppComponent]
})
export class AppModule { }
