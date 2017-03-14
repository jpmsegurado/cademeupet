import { Injectable } from '@angular/core';
import parse from './parse';
import { OneSignal } from 'ionic-native';
import { Storage } from '@ionic/storage';


@Injectable()
export class User {

  constructor(
    private storage: Storage
  ) {}

  isLogged() {

    return this.storage.get('logged').then((logged) => {
      if(logged) return true;
      
      const isLogged = !!parse.User.current();
      if(!!isLogged) {
        this.startOneSignal();
      }

      let object = {
        location: { latitude: -16.6494498, longitude: -49.2247317 }
      };

      parse.Cloud.run('bla', object).then(console.log);

      return isLogged;
    });

  }

  setLogged() {
    return this.storage.set('logged', true);
  }

  currentUser() {
    return !!parse.User.current() ? parse.User.current().toJSON() : null;
  }

  logIn(username, password) {
    return parse.User.logIn(username, password).then(() => {
      this.startOneSignal();
    });
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
