import { Injectable } from '@angular/core';
import parse from './parse';


@Injectable()
export class User {

  constructor() {}

  isLogged() {
    return !!parse.User.current();
  }

  currentUser() {
    return parse.User.current();
  }

  logIn(username, password) {
    return parse.User.logIn(username, password);
  }

  signUp(email, name, password) {
    let user = new parse.User();
    user.set('username', email);
    user.set('nome', name);
    user.set('email', email);
    user.set('password', password);

    return user.signUp();

  }

}
