import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';

/*
  Generated class for the Alert provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Alert {

  constructor(
    private alert: AlertController,
    private toastCtrl: ToastController
  ) {}

  showBasicAlert(msg, ok, callback?, cancel?, cancelCb?) {

    let buttons: any = [
      {
        text: ok,
        handler: () => {
          !!callback && callback();
        }
      }
    ];

    if(!!cancel) {
      const cancelbtn = {
        text: cancel,
        handler: () => {
          !!cancelCb && cancelCb();
        }
      }
      buttons.push(cancelbtn);
    }

    const newAlert = this.alert.create({
      subTitle: msg,
      buttons: buttons
    });
    return newAlert.present();
  } 

  showBasicToast(msg) {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'bottom'
    });


    toast.present();
  }

}