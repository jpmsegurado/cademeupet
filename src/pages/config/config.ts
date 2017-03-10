import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { User } from '../../providers/user';
import { MapPage } from '../map/map';
import { Geocoder } from 'ionic-native';
import { Alert } from '../../providers/alert';


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

  public user: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: User,
    public modal: ModalController,
    public alertService: Alert,
    public loadCtrl: LoadingController
  ) {
    this.user = this.userService.currentUser();
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

}
