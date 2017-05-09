import {Place} from "../models/place";
import {Location} from "../models/location";
import {Storage} from '@ionic/storage';
import {Injectable} from "@angular/core";
import {File} from "@ionic-native/file";
declare var cordova: any;

/**
 * Created by samuel on 5/9/17.
 */
@Injectable()
export class PlacesService {
  private places: Place[] = [];

  constructor(private storage: Storage, private file: File) {

  }

  async addPlace(title: string, description: string, location: Location, imageUrl: string) {

    const place = new Place(title, description, location, imageUrl);


    this.places.push(place);

    try {
      await this.storage.set('places', this.places);
    } catch (error) {

      this.places.splice(this.places.indexOf(place), 1);
    }


  }


  loadPlaces() {
    return this.places.slice();
  }

  async fetchPlaces() {

    try {
      let result = await this.storage.get('places');

      if (result) {
        this.places = result;
      }

    } catch (error) {
      console.log(error);
    }
    return this.loadPlaces();
  }

  async deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);
    try {
      await this.storage.set('places', this.places);
      this.removeFile(place);


    } catch (error) {
      console.log(error)
    }


  }

  private async removeFile(place: Place) {
    const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');

    try {
      await this.file.removeFile(cordova.file.dataDirectory, currentName);
    } catch (error) {
      console.log(error)
      this.addPlace(place.title, place.description, place.location, place.imageUrl);
    }

  }


}
