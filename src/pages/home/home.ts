import { Component } from '@angular/core';

import { NavController, PopoverController } from 'ionic-angular';
import { ConfigPage } from '../config/config';
import { FoundPetsPage } from '../found-pets/found-pets';
import { LostPetsPage } from '../lost-pets/lost-pets';
import { NewPetPage } from '../new-pet/new-pet';
import { FilterOptionsPage } from '../filter-options/filter-options';
import { FiltersPage } from '../filters/filters';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public founds: any = [];
  public tab1Root = FoundPetsPage;
  public tab2Root = LostPetsPage;

  constructor(
    public navCtrl: NavController,
    public popCtrl: PopoverController
  ) {
    
  }

  openNewPetPage(type) { 
    this.navCtrl.push(NewPetPage, { type });
  }

  options(event){
    let popover = this.popCtrl.create(FilterOptionsPage);
    popover.present({
      ev: event
    });

    popover.onDidDismiss((res) => {
      if(!!res){
        if(res === 'profile') this.goToConfig();
        if(res === 'filter') this.navCtrl.push(FiltersPage);
      }
    });
  }


  goToConfig() {
    this.navCtrl.push(ConfigPage);
  }


}
