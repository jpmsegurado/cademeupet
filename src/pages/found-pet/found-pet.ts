import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/*
  Generated class for the FoundPet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-found-pet',
  templateUrl: 'found-pet.html'
})
export class FoundPetPage {

  public pet: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sanitizer: DomSanitizer
  ) {
    this.pet = navParams.get('pet');
  }


  getPhoto(pet) {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${pet.photo}-/resize/500x/')`);
  }


}