import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import Config from '../../providers/config';
import { Filters } from '../../providers/filters';
import _ from 'lodash';

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
  public raca: any = '';
  public racas: any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public filterService: Filters
  ) {
    this.filters.faixa = this.filterService.getFaixa();
    this.filters.tipo = this.filterService.getTipo();
  }

  changeTipo(tipo) {
    this.filterService.setTipo(tipo);
    this.events.publish('changedFilters');

    const index = _.findIndex(this.tipos, {value: tipo});
    const t: any = this.tipos[index];

    if(t.racas) {
      this.racas = t.racas;
    } else {
      this.racas = [];
    }

    this.raca = '';
  
  }

  clear() {
    this.filterService.setTipo(null);
    this.filterService.setFaixa(null);
    this.filters = {};
    this.racas = [];
    this.events.publish('changedFilters');
  }

  changeFaixa(faixa) {
    this.filterService.setFaixa(faixa);
    this.events.publish('changedFilters');
  }


  changeRaca(raca) {
    this.filterService.setRaca(raca);
    this.events.publish('changedFilters');
  }

}
