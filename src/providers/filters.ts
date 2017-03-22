import { Injectable } from '@angular/core';

/*
  Generated class for the Filters provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Filters {

  private tipo;
  private faixa;
  private raca;

  constructor() {}

  getTipo() {
    return this.tipo;
  }

  getFaixa() {
    return this.faixa;
  }

  getRaca() {
    return this.raca;
  }

  setFaixa(faixa) {
    this.faixa = faixa;
  }

  setTipo(tipo) {
    this.tipo = tipo;
  }

  setRaca(raca) {
    this.raca = raca;
  }

}
