import {Component} from '@angular/core';
import {IonicPage, ModalController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocation} from "../set-location/set-location";
import {Location} from "../../models/location";


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
  constructor(private modalCtrl: ModalController) {

  }

  onSubmit(form: NgForm) {
    console.log(form.value)
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
