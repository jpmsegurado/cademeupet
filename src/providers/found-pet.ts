import { Injectable } from '@angular/core';
import parse from './parse';

/*
  Generated class for the FoundPet provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FoundPet {

  constructor() {

  }
 
  getAll(lat, long) {
    let point = new parse.GeoPoint({ latitude: lat, longitude: long }); 
    let query = new parse.Query('FoundPet');
    query.withinKilometers('location', point, 25);
    return query.find().then((res) => {
      return res.map((item) => item.toJSON());
    });
  }

}
