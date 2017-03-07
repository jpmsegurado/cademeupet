import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { FoundPet } from '../../providers/found-pet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public founds: any = [];

  constructor(
    public navCtrl: NavController,
    public foundService: FoundPet
  ) {
    
  }

  ionViewDidEnter() {
    this.foundService.getAll(-40, 30).then((res) => {
      this.founds = res; 
    })
  }

  goToConfig() {
    
  }

}
