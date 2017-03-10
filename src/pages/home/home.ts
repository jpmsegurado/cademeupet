import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { FoundPet } from '../../providers/found-pet';
import { ConfigPage } from '../config/config';
import { FoundPetPage } from '../found-pet/found-pet';
import { FoundPetsPage } from '../found-pets/found-pets';
import { LostPetsPage } from '../lost-pets/lost-pets';
import { NewPetPage } from '../new-pet/new-pet';
import { Geolocation } from 'ionic-native';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public founds: any = [];
  public tab1Root = FoundPetsPage;
  public tab2Root = LostPetsPage;

  constructor(
    public navCtrl: NavController
  ) {
    
  }

  openNewPetPage(type) { 
    this.navCtrl.push(NewPetPage, { type });
  }


  goToConfig() {
    this.navCtrl.push(ConfigPage);
  }


}
