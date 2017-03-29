import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MapPage } from '../map/map';
import Config from '../../providers/config';
import _ from 'lodash';
import { User } from '../../providers/user';
import { FoundPet } from '../../providers/found-pet';


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
  public tipos: any = Config.tipos;
  public loading: any = false;
  public faixas: any = Config.faixas;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sanitizer: DomSanitizer,
    public foundService: FoundPet,
    public userService: User
  ) {
    this.pet = navParams.get('pet');
  }


  getPhoto(pet) {
    return this.sanitizer.bypassSecurityTrustStyle(`url('${pet.photo}-/resize/500x/')`);
  }

  getTipo(value) {
    const index = _.findIndex(this.tipos, {value});
    return this.tipos[index].nome;
  }

  openMap(pet) {
    this.navCtrl.push(MapPage, 
    {
      title: 'Local do pet',
      info: 'Pet encontrado aqui',
      location: pet.location
    }); 
  }

  isAdmin() {
    const user = this.userService.currentUser();
    return !!user && this.pet.user.objectId === user.objectId;
  }

  delete() {
    this.loading = true;
    this.foundService.delete(this.pet.objectId).then(() => {
      this.navCtrl.pop();
    }).catch(() => {
      this.loading = false;
    });
  }

  getAge(value) {
    const index = _.findIndex(this.faixas, {value});
    return this.faixas[index].nome;
  }

}
