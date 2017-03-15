import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { User } from '../../providers/user';
import { MapPage } from '../map/map';
import { Geocoder } from 'ionic-native';
import { Alert } from '../../providers/alert';
import { LoginPage } from '../login/login';
import VMasker from 'vanilla-masker';


/*
  Generated class for the Config page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

  public user: any;
  public tel: any = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: User,
    public modal: ModalController,
    public alertService: Alert,
    public loadCtrl: LoadingController,
    public el: ElementRef
  ) {
    this.user = this.userService.currentUser();
    if(!!this.user && !!this.user.phone) this.tel = this.user.phone;
  }

  ionViewDidLoad() {
    function inputHandler(masks, max, event) {
      var c = event.target;
      var v = c.value.replace(/\D/g, '');
      var m = c.value.length > max ? 1 : 0;
      VMasker(c).unMask();
      VMasker(c).maskPattern(masks[m]);
      c.value = VMasker.toPattern(v, masks[m]);
    }

    var telMask = ['(99) 9999-99999', '(99) 99999-9999'];
    var tel = this.el.nativeElement.querySelector('.tel input');
    VMasker(tel).maskPattern(telMask[0]);
    tel.addEventListener('input', inputHandler.bind(undefined, telMask, 14), false);
  }

  ionViewWillLeave() {
    const tel = this.el.nativeElement.querySelector('.tel input').value;
    if(tel.length >= 14) {
      this.userService.updateTelefone(tel);
    }
  }

  loadMap() {
    this.navCtrl.push(MapPage, 
    { 
      msg: 'Clique no mapa para indicar sua localização atual, e depois confirme.',
      title: 'Informe seu endereço',
      callback: (lat, lng) => {
        const req = {
          position: {
            lat: lat,
            lng: lng
          }
        };

         let loader = this.loadCtrl.create({
          content: "Carregando informações"
        });
        loader.present();

        Geocoder.geocode(req).then((res) => {
          const address = res[0].extra.lines.join(',');
          this.userService.updateAddress(address, lat, lng).then(() => {
            this.user = this.userService.currentUser();
            loader.dismiss();
          });
        });

      }
    }); 
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage, null, { animate: true });
  }

}
