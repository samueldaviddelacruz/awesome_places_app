import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {PlacePage} from "../pages/place/PlacePage";
import {SetLocation} from "../pages/set-location/set-location";
import {AddPlace} from "../pages/add-place/add-place";
import {AgmCoreModule} from "angular2-google-maps/core";
import {Geolocation} from '@ionic-native/geolocation';
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {PlacesService} from "../services/places";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlacePage,
    SetLocation,
    AddPlace
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAw194hTA6eddcQY29JXrrWSlPwsg6qWHY"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlacePage,
    SetLocation,
    AddPlace
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    File,
    PlacesService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
