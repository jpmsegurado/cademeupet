import { Component } from '@angular/core';
import { NavParams, LoadingController } from 'ionic-angular';
import { FoundPet } from '../../providers/found-pet';
import { FoundPetPage } from '../found-pet/found-pet';
import { Geolocation } from 'ionic-native';


@Component({
  selector: 'page-found-pets',
  templateUrl: 'found-pets.html'
})
export class FoundPetsPage {

  public founds: any = [];
  public navCtrl: any;

  constructor(
    public navParams: NavParams,
    public foundService: FoundPet,
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
      this.foundService.getAll(resp.coords.latitude, resp.coords.longitude).then((res) => {
        this.founds = res; 
        !!loader && loader.dismiss();
        !!refresher && refresher.complete();
      }).catch(() => {
        !!loader && loader.dismiss();
        !!refresher && refresher.complete();
      });
    })
    
  }

  openFoundPet(pet) {
    this.navCtrl.push(FoundPetPage, { pet: pet });
  }

}
