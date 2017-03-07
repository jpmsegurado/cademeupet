import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConfigPage } from '../pages/config/config';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';

import { FoundPet } from '../providers/found-pet';
import { User } from '../providers/user';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConfigPage,
    RegisterPage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConfigPage,
    RegisterPage,
    LoginPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FoundPet,
    User
  ]
})
export class AppModule {}
