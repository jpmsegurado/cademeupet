import { Component } from '@angular/core';
import { NavParams, LoadingController, Events } from 'ionic-angular';
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
  public loading: any = false;

  constructor(
    public navParams: NavParams,
    public lostService: LostPet,
    public loadCtrl: LoadingController,
    public events: Events
  ) {
    this.navCtrl = navParams.data;
    this.events.subscribe('changedFilters', () => this.load());
  }

  ionViewDidLoad() {
    this.load();
  }

  load(refresher?) {
    if(!refresher) {
      this.loading = true;
    }

    Geolocation.getCurrentPosition().then((resp: any) => {
      this.lostService.getAll(resp.coords.latitude, resp.coords.longitude).then((res) => {
        this.losts = res; 
        if(!refresher) this.loading = false;
        !!refresher && refresher.complete();
      });
    });

  }

  openLostPet(pet) {
    this.navCtrl.push(LostPetPage, { pet: pet });
  }

}
