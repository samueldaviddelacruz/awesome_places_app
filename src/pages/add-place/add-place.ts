import {Component} from '@angular/core';
import {IonicPage, ModalController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocation} from "../set-location/set-location";


@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlace {

  constructor(private modalCtrl: ModalController) {

  }

  onSubmit(form: NgForm) {
    console.log(form.value)
  }

  onOpenMap() {

    const modal = this.modalCtrl.create(SetLocation);

    modal.present();

  }

}
