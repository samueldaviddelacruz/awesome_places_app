import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PlacePage} from './PlacePage';

@NgModule({
  declarations: [
    PlacePage,
  ],
  imports: [
    IonicPageModule.forChild(PlacePage),
  ],
  exports: [
    PlacePage
  ]
})
export class PlaceModule {
}
