import { Injectable } from '@angular/core';
import { Camera, Transfer } from 'ionic-native';
/*
  Generated class for the File provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class File {

  public config = {
    UPLOADCARE_PUB_KEY: "46ca2788f7954848f9bd",
    UPLOADCARE_BASE_URL: "https://upload.uploadcare.com/base/"
  }

  constructor(

  ) {}

  getPicture() {
    let options = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI,
      encodingType: Camera.EncodingType.JPEG,
      targetHeight: 400,
      targetWidth: 400
    };
    return Camera.getPicture(options).then((imageData) => {
      return imageData
    }, (err) => {
      return err;
    });
  }

  uploadFile(imagePath){
     let filename = btoa(new Date().toISOString());
    filename = filename + "." + imagePath.split('.').pop()
    let options = {
      mimeType: 'image/*',
      fileName: filename,
      params : {
          "UPLOADCARE_PUB_KEY": this.config.UPLOADCARE_PUB_KEY,
          "UPLOADCARE_STORE": 'auto',
          "file" : "image.jpg"
      }
    };

    let ft = new Transfer();
    return ft.upload(imagePath, this.config.UPLOADCARE_BASE_URL, options).then((res: any) => {
      const fileId = JSON.parse(res.response).file;
      const uploadcare_path = "https://ucarecdn.com/"+fileId+"/";
      console.log(res);
      return uploadcare_path;
    }, (err) => {
      console.log(err);
      return err;
    });
  }

}
