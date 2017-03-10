import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConfigPage } from '../pages/config/config';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { FoundPetPage } from '../pages/found-pet/found-pet';
import { FoundPetsPage } from '../pages/found-pets/found-pets';
import { LostPetPage } from '../pages/lost-pet/lost-pet';
import { LostPetsPage } from '../pages/lost-pets/lost-pets';
import { NewPetPage } from '../pages/new-pet/new-pet';

import { FoundPet } from '../providers/found-pet';
import { LostPet } from '../providers/lost-pet';
import { User } from '../providers/user';
import { Alert } from '../providers/alert';
import { File } from '../providers/file';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConfigPage,
    RegisterPage,
    LoginPage,
    MapPage,
    FoundPetPage,
    FoundPetsPage,
    LostPetPage,
    LostPetsPage,
    NewPetPage
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
    LoginPage,
    MapPage,
    FoundPetPage,
    FoundPetsPage,
    LostPetPage,
    LostPetsPage,
    NewPetPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FoundPet,
    LostPet,
    User,
    Alert,
    File
  ]
})
export class AppModule {}
