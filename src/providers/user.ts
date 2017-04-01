import { Injectable } from '@angular/core';
import parse from './parse';
import { OneSignal } from 'ionic-native';
import { Storage } from '@ionic/storage';
import moment from 'moment';


@Injectable()
export class User {

  constructor(
    private storage: Storage
  ) {}

  isLogged() {

    return this.storage.get('logged').then((logged) => {
      if(!!logged) return true;
      
      const isLogged = !!parse.User.current();
      if(!!isLogged) {
        this.startOneSignal();
      }

      return isLogged;
    });

  }

  setLogged() {
    return this.storage.set('logged', true);
  }

  updateTelefone(tel) {
    let user = parse.User.current();
    user.set('phone', tel);
    return user.save();
  }

  facebookLogin(result, response) {
    let expire = moment().add(result.authResponse.expiresIn, 'ms').format("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    return parse.FacebookUtils.logIn({
      "id": result.authResponse.userID,
      "access_token": result.authResponse.accessToken,
      "expiration_date": expire
    }, {}).then((res) => {
        let user = parse.User.current();
        user.set('nome', response.name);
        user.set('email', response.email);
        return user.save();
    });
  }

  currentUser() {
    return !!parse.User.current() ? parse.User.current().toJSON() : null;
  }

  logIn(username, password) {
    return parse.User.logIn(username, password).then(() => {
      this.startOneSignal();
    });
  }
  
  logout() {
    return parse.User.logOut();
  }

  signUp(email, name, password) {
    let user = new parse.User();
    user.set('username', email);
    user.set('nome', name);
    user.set('email', email);
    user.set('password', password);

    return user.signUp().then(() => {
      this.startOneSignal();
    });

  }

  updateAddress(address, lat, lng) {
    let user = parse.User.current();
    user.set('address_string', address);
    user.set('address_point', new parse.GeoPoint({ latitude: lat, longitude: lng }));
    return user.save();
  }

  startOneSignal() {
    if(window['cordova']) {
      console.log('OneSignal started');
      OneSignal.startInit('11ccaccc-f923-4474-b1e8-c4b3b6dfa1da', '1089022243588');
      OneSignal.handleNotificationReceived().subscribe((data) => {
        console.log(data);
      });
      OneSignal.endInit();

      OneSignal.getIds().then((data) => {
        let user = parse.User.current();
        user.set('player_id', data.userId);
        user.save();
      });
    }
  }

}
