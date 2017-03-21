import { Component } from '@angular/core';
import { NavParams, LoadingController, Events } from 'ionic-angular';
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
  public loading: any = true;

  constructor(
    public navParams: NavParams,
    public foundService: FoundPet,
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
      this.foundService.getAll(resp.coords.latitude, resp.coords.longitude).then((res) => {
        this.founds = res; 
        if(!refresher) this.loading = false;
        !!refresher && refresher.complete();
      }).catch(() => {
        if(!refresher) this.loading = false;
        !!refresher && refresher.complete();
      });
    })
    
  }

  openFoundPet(pet) {
    this.navCtrl.push(FoundPetPage, { pet: pet });
  }

}
