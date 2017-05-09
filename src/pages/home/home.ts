import {Component, OnInit} from '@angular/core';
import {ModalController} from 'ionic-angular';
import {AddPlace} from "../add-place/add-place";
import {Place} from "../../models/place";
import {PlacesService} from "../../services/places";
import {PlacePage} from "../place/PlacePage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  addPlacePage = AddPlace;

  async ngOnInit() {

    this.places = await this.placesService.fetchPlaces();

  }

  places: Place[] = [];

  constructor(public modalCtrl: ModalController, private placesService: PlacesService) {

  }


  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present();

    modal.onDidDismiss(() => {
      this.places = this.placesService.loadPlaces();
    });


  }


}
