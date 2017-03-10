import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions, GoogleMapsMarker, AnimateCameraOptions } from 'ionic-native'
import { Alert } from '../../providers/alert';
/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  public map: GoogleMap;
  public title: any = '';
  public msg: any = '';
  public coords: any;
  public loading: Boolean = false;
  public callback: any;
  public info: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertService: Alert
  ) {
    this.title = navParams.get('title');
    this.msg = navParams.get('msg');
    this.callback = navParams.get('callback');
    this.info = navParams.get('info');
  }

  ionViewDidLoad() {
    !!this.msg && this.alertService.showBasicToast(this.msg);
    Geolocation.getCurrentPosition().then((resp) => {
      this.loadMap(resp.coords);
    });
  }

  loadMap(coords) {

    let element: HTMLElement = document.getElementById('map');
    element.style.display = 'initial';

    this.map = new GoogleMap(element);

    // listen to MAP_READY event
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {

      this.addMarker(coords.latitude, coords.longitude, this.info || 'Sua localização');

      !!this.callback && this.map.on('click').subscribe((res) => {
        this.addMarker(res.lat, res.lng, 'Clique aqui para confirmar');
      });


    });
  }

  addMarker(lat, lng, msg) {
    let ionic = new GoogleMapsLatLng(lat, lng);
    let markerOptions: GoogleMapsMarkerOptions = {
      position: ionic,
      title: msg
    };
    this.map.clear();
    this.map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
        marker.on('info_click').subscribe(() => {
          if(!!this.callback) {
            this.callback(lat, lng);
            this.navCtrl.pop();
          }
        });
    });

    let position: AnimateCameraOptions = {
      target: ionic,
      zoom: 18,
      tilt: 0,
      duration: 1000
    };

    

    this.map.animateCamera(position);
  }

  ionViewWillLeave() {
    this.map.remove();
  }

}
