import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FoundPet } from '../../providers/found-pet';
import { FoundPetPage } from '../found-pet/found-pet';


@Component({
  selector: 'page-found-pets',
  templateUrl: 'found-pets.html'
})
export class FoundPetsPage {

  public founds: any = [];
  public navCtrl: any;

  constructor(
    public navParams: NavParams,
    public foundService: FoundPet
  ) {
    this.navCtrl = navParams.data;
  }

  ionViewDidLoad() {
    this.foundService.getAll(-40, 30).then((res) => {
      this.founds = res; 
    })
  }

  openFoundPet(pet) {
    this.navCtrl.push(FoundPetPage, { pet: pet });
  }

}
