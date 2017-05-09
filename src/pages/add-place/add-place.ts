import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocation} from "../set-location/set-location";
import {Location} from "../../models/location";

import {Geolocation} from '@ionic-native/geolocation';
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {PlacesService} from "../../services/places";

declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlace {

  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  imageUrl = '';

  locationIsSet = false;

  constructor(private modalCtrl: ModalController,
              private geoLocation: Geolocation,
              private camera: Camera,
              private file: File,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private placesService: PlacesService) {

  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);

    form.reset();
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };

    this.imageUrl = '';
    this.locationIsSet = false;
  }

  async onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Fetching Location..'
    });
    try {

      loader.present();

      let location;

      location = await this.geoLocation.getCurrentPosition();
      if (location) {
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        this.locationIsSet = true;
      }
      loader.dismiss();

    } catch (error) {

      loader.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Could not fetch location, please select manually on map!',
        duration: 2500
      });

      toast.present();
    }


  }
  onOpenMap() {

    const modal = this.modalCtrl.create(SetLocation, {location: this.location, isSet: this.locationIsSet});

    modal.present();

    modal.onDidDismiss((data) => {
      if (data) {
        this.location = data.location;
        this.locationIsSet = true;
      }

    })

  }

  async onTakePhoto() {
    let imageData;
    let movedFilePath;
    try {
      imageData = await this.camera.getPicture({
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true
      });

      if (imageData) {

        const currentName = imageData.replace(/^.*[\\\/]/, '');
        const path = imageData.replace(/[^\/]*$/, '');
        const newFileName = new Date().getUTCMilliseconds() + '.jpg';
        try {

          movedFilePath = await this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName);

          if (movedFilePath) {
            this.imageUrl = movedFilePath.nativeURL;
            this.camera.cleanup();
            // this.file.removeFile(path,currentName);
          }

        } catch (error) {
          const toast = this.toastCtrl.create({
            message: 'An error has occurred, could not save the image,try again',
            duration: 2500
          });

          toast.present();
          this.camera.cleanup();
        }


      }


    } catch (error) {
      //console.log(error);
      this.imageUrl = '';
      const toast = this.toastCtrl.create({
        message: 'An error has occurred, could not take the image,try again',
        duration: 2500
      });

      toast.present();
      this.camera.cleanup();
    }

  }



}
