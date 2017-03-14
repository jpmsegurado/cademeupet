import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapPage } from '../map/map';
import { Geocoder } from 'ionic-native';
import { User } from '../../providers/user';
import { File } from '../../providers/file';
import { Alert } from '../../providers/alert';
import { FoundPet } from '../../providers/found-pet';
import { LostPet } from '../../providers/lost-pet';

/*
  Generated class for the NewPet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-pet',
  templateUrl: 'new-pet.html'
})
export class NewPetPage {

  public type = '';
  public form: any;
  public location: any;
  public locationStr: any;
  public src: any = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: User,
    public loadCtrl: LoadingController,
    public fileService: File,
    public alertService: Alert,
    public foundService: FoundPet,
    public lostService: LostPet
  ) {
    this.type = navParams.get('type');

    if(this.type === 'lost') {
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
      });
    } else {
      this.form = new FormGroup({
        description: new FormControl('', Validators.required),
      });
    }

  }

  pickImage() {
    this.fileService.getPicture().then((data) => {
      console.log(data);
      if(data !== 'Selection cancelled.') this.src = data;
    });
  }

  
  add(type, form, location, locationStr, src) {
    if(form.valid && !!location) {
      let promise: any = type === 'lost' ? 
        this.lostService.add(form.value, location, locationStr, src) :
        this.foundService.add(form.value, location, locationStr, src);

        let loader = this.loadCtrl.create({
          content: 'Enviando...'
        });

        loader.present();

        promise.then(() => {
          // this.alertService.showBasicAlert('Enviado com sucesso', () => this.navCtrl.pop());
          loader.dismiss();
        });

    } else {
      let msg;
      if(!location) {
        msg = 'Por favor, forneça uma localização.';
      } else {
        msg = 'Por favor, preencha os campos antes de enviar';
      }

      this.alertService.showBasicAlert(msg);
    }
  }


  openMap(type) {
    const str = type === 'lost' ? 'onde o pet foi perdido' : 'onde o pet foi encontrado';
    const msg = `Clique no mapa para indicar a localização ${str} , e depois clique na caixa em cima do marcador para confirmar.`
    this.navCtrl.push(MapPage, 
    { 
      msg: msg,
      title: 'Informe seu endereço',
      callback: (lat, lng) => {
        const req = {
          position: {
            lat: lat,
            lng: lng
          }
        };

        let loader = this.loadCtrl.create({
          content: "Carregando informações"
        });
        loader.present();

        Geocoder.geocode(req).then((res) => {
          this.locationStr = res[0].extra.lines.join(',');
          this.location = req.position;
          loader.dismiss();
        });

      }
    }); 
  }


}
