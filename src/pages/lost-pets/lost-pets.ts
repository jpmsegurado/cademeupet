import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { LostPet } from '../../providers/lost-pet';
import { LostPetPage } from '../lost-pet/lost-pet';
import { Geolocation } from 'ionic-native';


@Component({
  selector: 'page-found-pets',
  templateUrl: 'lost-pets.html'
})
export class LostPetsPage {

  public losts: any = [];
  public navCtrl: any;

  constructor(
    public navParams: NavParams,
    public lostService: LostPet,
    public loadCtrl: LoadingController
  ) {
    this.navCtrl = navParams.data;
  }

  ionViewDidLoad() {
    this.load();
  }

  load(refresher?) {
    let loader;
    if(!refresher) {
      loader = this.loadCtrl.create({
        content: 'Carregando...'
      });
      loader.present();
    }

    Geolocation.getCurrentPosition().then((resp: any) => {
      this.lostService.getAll(resp.coords.latitude, resp.coords.longitude).then((res) => {
        this.losts = res; 
        !!loader && loader.dismiss();
        !!refresher && refresher.complete();
      });
    });

  }

  openLostPet(pet) {
    this.navCtrl.push(LostPetPage, { pet: pet });
  }

}
