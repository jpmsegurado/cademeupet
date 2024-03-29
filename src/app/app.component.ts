import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { User } from '../providers/user';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  public rootPage;

  constructor(
    platform: Platform,
    userService: User
  ) {
    platform.ready().then(() => {

      StatusBar.styleDefault();
      Splashscreen.hide();
      userService.isLogged().then((logged) => {
        this.rootPage = !!logged ? HomePage : LoginPage;
      });

    });
  }
}
