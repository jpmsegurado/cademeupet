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

  constructor() {}

  getTipo() {
    return this.tipo;
  }

  getFaixa() {
    return this.faixa;
  }

  setFaixa(faixa) {
    this.faixa = faixa;
  }

  setTipo(tipo) {
    this.tipo = tipo;
  }

}
