import {Location} from "./location";
/**
 * Created by samuel on 4/22/17.
 */
export class Place {

  constructor(public title: string,
              public description: string,
              public location: Location,
              public imagePath: string) {
  }

}
