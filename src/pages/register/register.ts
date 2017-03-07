import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../providers/user';
import { HomePage } from '../home/home';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  public form: any;
  public loading: any = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: User
  ) {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required)
    });
  }

  register(form) {
    if(form.valid) {
      this.loading = true;
      this.userService.signUp(form.value.email, form.value.nome, form.value.password).then(() => {
        this.loading = false;
        this.navCtrl.setRoot(HomePage, null, { animate: true });
      });
    }
  }


}
