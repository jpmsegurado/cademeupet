import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FoundPet } from '../../providers/found-pet';
import { LostPet } from '../../providers/lost-pet';
import _ from 'lodash';
import { FoundPetPage } from '../found-pet/found-pet';
import { LostPetPage } from '../lost-pet/lost-pet';

/*
  Generated class for the PetsAdded page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pets-added',
  templateUrl: 'pets-added.html'
})
export class PetsAddedPage {

  public pets: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public lostService: LostPet,
    public foundService: FoundPet,
    public loadCtrl: LoadingController
  ) {
    let loader = loadCtrl.create({
      content: 'Carregando...'
    });

    loader.present();

    this.foundService.getMine().then((found) => {
      this.lostService.getMine().then((lost) => {
        this.pets = _.flatten(found.concat(lost));
        this.pets = _.orderBy(this.pets, ['createdAt'], ['desc']);
        loader.dismiss();
      });
    });
  }

  open(pet) {
    if(pet.type === 'found') {
      this.navCtrl.push(FoundPetPage, { pet })
    } else {
      this.navCtrl.push(LostPetPage, { pet })
    }
  }


}
