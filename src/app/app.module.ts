import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {Place} from "../pages/place/place";
import {SetLocation} from "../pages/set-location/set-location";
import {AddPlace} from "../pages/add-place/add-place";
import {AgmCoreModule} from "angular2-google-maps/core";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Place,
    SetLocation,
    AddPlace
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAw194hTA6eddcQY29JXrrWSlPwsg6qWHY"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Place,
    SetLocation,
    AddPlace
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
