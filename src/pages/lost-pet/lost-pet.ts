import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MapPage } from '../map/map';
import Config from '../../providers/config';
import { User } from '../../providers/user';
import { LostPet } from '../../providers/lost-pet';
import _ from 'lodash';

/*
  Generated class for the FoundPet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-found-pet',
  templateUrl: 'lost-pet.html'
})
export class LostPetPage {

  public pet: any;
  public tipos: any = Config.tipos;
  public faixas: any = Config.faixas;
  public loading: any = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sanitizer: DomSanitizer,
    public userService: User,
    public lostService: LostPet
  ) {
    this.pet = navParams.get('pet');
  }


  getPhoto(pet) {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${pet.photo}-/resize/500x/')`);
  }

  isAdmin() {
    return this.pet.user.objectId === this.userService.currentUser().objectId;
  }

  openMap(pet) {
    this.navCtrl.push(MapPage, 
    {
      title: 'Local do pet',
      info: 'Pet foi perdido aqui'
    }); 
  }

  delete() {
    this.loading = true;
    this.lostService.delete(this.pet.objectId).then(() => {
      this.navCtrl.pop();
    }).catch(() => {
      this.loading = false;
    });
  }

  getTipo(value) {
    const index = _.findIndex(this.tipos, {value});
    return this.tipos[index].nome;
  }

  getAge(value) {
    const index = _.findIndex(this.faixas, {value});
    return this.faixas[index].nome;
  }


}
