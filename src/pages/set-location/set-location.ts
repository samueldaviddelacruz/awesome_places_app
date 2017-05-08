import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {Location} from "../../models/location";

/**
 * Generated class for the SetLocation page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocation {
  location: Location;
  marker: Location;

  constructor(private navParams: NavParams, private viewCtrl: ViewController) {
    this.location = navParams.get('location');

    if (navParams.get('isSet')) {

      this.marker = this.location;

    }


  }

  onSetMarker(event: any) {

    this.marker = new Location(event.coords.lat, event.coords.lng);

  }

  onConfirm() {
    this.viewCtrl.dismiss({location: this.marker})
  }

  onAbort() {
    this.viewCtrl.dismiss()
  }


}
