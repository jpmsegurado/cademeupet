import { Injectable } from '@angular/core';
import parse from './parse';
import { File } from './file';

/*
  Generated class for the FoundPet provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FoundPet {

  constructor(
    private fileService: File
  ) {

  }


  add(pet, location, locationStr, src) {
    let promise = src.length === 0 ? Promise.resolve(null) : this.fileService.uploadFile(src);

    return promise.then((url) => {
      let FoundPet = parse.Object.extend('FoundPet');
      let newFound = new FoundPet();
      let point = new parse.GeoPoint({ latitude: location.lat, longitude: location.lng }); 
      if(!!url) newFound.set('photo', url);
      newFound.set('description', pet.description);
      newFound.set('location', point);
      newFound.set('location_description', locationStr);
      newFound.set('user', parse.User.current());

      return newFound.save();

    });
  }
 
  getAll(lat, long) {
    let point = new parse.GeoPoint({ latitude: lat, longitude: long }); 
    let query = new parse.Query('FoundPet');
    query.withinKilometers('location', point, 25);
    return query.find().then((res) => {
      return res.map((item) => {
        const parsed = item.toJSON();
        parsed.trueDistance = this.getDistanceFromLatLonInKm(lat, long, item.toJSON().location.latitude, item.toJSON().location.longitude);
        return parsed;
      });
    });
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // this.deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return Math.floor(d);
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

}
