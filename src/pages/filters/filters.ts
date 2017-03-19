import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import Config from '../../providers/config';
import { Filters } from '../../providers/filters';

/*
  Generated class for the Filters page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html'
})
export class FiltersPage {

  public filters: any = {};
  public tipos = Config.tipos;
  public faixas = Config.faixas;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public filterService: Filters
  ) {}

  changeTipo(tipo) {
    console.log(tipo);
    this.filterService.setTipo(tipo);
    this.events.publish('changedFilters');
  }

  changeFaixa(faixa) {
    this.filterService.setFaixa(faixa);
    this.events.publish('changedFilters');
  }

}
