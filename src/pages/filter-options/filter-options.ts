import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  template: `
    <ion-item (click)="close('profile')">Perfil</ion-item>
    <ion-item (click)="close('filter')">Filtros</ion-item>
  `
})
export class FilterOptionsPage {
  constructor(
    public viewCtrl: ViewController
  ) {}

  close(str) {
    this.viewCtrl.dismiss(str);
  }
}