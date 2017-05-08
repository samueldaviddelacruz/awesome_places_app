import {Component} from '@angular/core';
import {IonicPage, LoadingController, ModalController, ToastController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocation} from "../set-location/set-location";
import {Location} from "../../models/location";

import {Geolocation} from '@ionic-native/geolocation';
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

  locationIsSet = false;

  constructor(private modalCtrl: ModalController, private geoLocation: Geolocation, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {

  }

  onSubmit(form: NgForm) {
    console.log(form.value)
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
      })

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

}
