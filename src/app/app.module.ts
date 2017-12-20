import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BudgetPage } from '../pages/budget/budget';
import { ChecklistPage } from '../pages/checklist/checklist';
import { ChecklistDetailPage } from '../pages/checklist-detail/checklist-detail';
import { LocationPage } from '../pages/location/location';
import { BoatDetailsPage } from '../pages/boat-details/boat-details';
import { MooringDetailsPage } from '../pages/mooring-details/mooring-details';
import { LocationHomePage } from '../pages/location-home/location-home';
import { Geolocation } from '@ionic-native/geolocation';
import { DataChecklistProvider } from '../providers/data-checklist/data-checklist';
import { DataLocationProvider } from '../providers/data-location/data-location';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BudgetPage,
    ChecklistPage,
    ChecklistDetailPage,
    LocationPage,
    LocationHomePage,
    BoatDetailsPage,
    MooringDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BudgetPage,
    ChecklistPage,
    ChecklistDetailPage,
    LocationPage,
    LocationHomePage,
    BoatDetailsPage,
    MooringDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataChecklistProvider,
    Keyboard,
    DataLocationProvider,
    GoogleMapsProvider,
    ConnectivityProvider,
    Geolocation
  ]
})
export class AppModule {}
