import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapPage } from '../map/map';
import { LoginPage } from '../login/login';
import { ConfigPage } from '../config/config';
import { Geocoder } from 'ionic-native';
import { User } from '../../providers/user';
import { File } from '../../providers/file';
import { Alert } from '../../providers/alert';
import { FoundPet } from '../../providers/found-pet';
import { LostPet } from '../../providers/lost-pet';
import Config from '../../providers/config';
import _ from 'lodash';

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
  public tipos = Config.tipos;
  public faixas = Config.faixas;
  public racas: any = [];
  public raca: any = '';

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
        tipo: new FormControl('', Validators.required),
        faixa: new FormControl('', Validators.required),
        raca: new FormControl('')
      });
    } else {
      this.form = new FormGroup({
        description: new FormControl('', Validators.required),
        faixa: new FormControl('', Validators.required),
        tipo: new FormControl('', Validators.required),
        name: new FormControl(''),
        raca: new FormControl('')
      });
    }

  }

  pickImage() {
    this.fileService.getPicture().then((data) => {
      if(data !== 'Selection cancelled.') this.src = data;
    });
  }

  changedTipo(form) {
    const index = _.findIndex(this.tipos, {value: form.value.tipo});
    const tipo: any = this.tipos[index];

    if(tipo.racas) {
      this.racas = tipo.racas;
    } else {
      this.racas = [];
    }

    this.raca = '';

  }
  
  add(type, form, location, locationStr, src) {
    if(!this.userService.currentUser()) {
      return this.alertService.showBasicAlert('É necessário fazer login para realizar esta ação', 'Ok', () => {
        this.navCtrl.setRoot(LoginPage, null, { animate: true });
      });
    }

    if(form.valid && !!location) {
      let promise: any = type === 'lost' ? 
        this.lostService.add(form.value, location, locationStr, src) :
        this.foundService.add(form.value, location, locationStr, src);

        let loader = this.loadCtrl.create({
          content: 'Enviando...'
        });

        loader.present();

        promise.then(() => {
          if(!!this.userService.currentUser().phone) {
            this.alertService.showBasicAlert('Enviado com sucesso', 'Ok', () => this.navCtrl.pop());
          } else {
            this.navCtrl.pop();
            this.alertService.showBasicAlert(
              'Enviado com sucesso. Que tal atualizar seu telefone para contato agora?', 
              'Ok', 
              () => this.navCtrl.push(ConfigPage), 
              'Não, obrigado.');
          }
          loader.dismiss();
        });

    } else {
      let msg;
      if(!location) {
        msg = 'Por favor, forneça uma localização.';
      } else {
        msg = 'Por favor, preencha os campos antes de enviar';
      }

      this.alertService.showBasicAlert(msg, 'Ok');
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
