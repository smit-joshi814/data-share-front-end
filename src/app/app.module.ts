/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { RequestInterceptor } from './interceptor/request.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:8080',
          login: {
            redirect: {
              success: '/pages/dashboard',
              failure: null
            },
            endpoint: '/api/auth/login',
            method: 'post',

          },
          register: {
            redirect: {
              success: '/pages/dashboard',
              failure: null
            },
            endpoint: '/api/auth/register',
            method: 'post',
          },

          token: {
            class: NbAuthJWTToken, // which type of token
            key: 'token', // this parameter tells where to look for the token
          }
        }),
      ],
      forms: {},
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule {
}
