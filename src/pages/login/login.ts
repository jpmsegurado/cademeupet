import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../providers/user';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public form: any;
  public loadingNormal: any = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: User
  ) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }


  login(form) {
    if(form.valid) {
      this.loadingNormal = true;
      this.userService.logIn(form.value.email, form.value.password).then(() => {
        this.loadingNormal = false;
        this.navCtrl.setRoot(HomePage, null, { animate: true });
      }, () => {
        this.loadingNormal = false;

        // give feedback for the user.

      });
    }
  }

  pular() {
    this.navCtrl.setRoot(HomePage, null, { animate: true });
    this.userService.setLogged();
  }


  register() {
    this.navCtrl.push(RegisterPage);
  }

  

}
