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
import { SettingsPage } from '../pages/settings/settings';
import { BoatDetailsPage } from '../pages/boat-details/boat-details';
import { CategoryDetailPage } from '../pages/category-detail/category-detail';
import { MooringDetailsPage } from '../pages/mooring-details/mooring-details';
import { LocationHomePage } from '../pages/location-home/location-home';
import { BudgetEntryPage } from '../pages/budget-entry/budget-entry';
import { BudgetReportsPage } from '../pages/budget-reports/budget-reports';
import { RunningBudgetTotalPage } from '../pages/running-budget-total/running-budget-total';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { DataChecklistProvider } from '../providers/data-checklist/data-checklist';
import { DataLocationProvider } from '../providers/data-location/data-location';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { DataCategoryProvider } from '../providers/data-category/data-category';
import { DecimalPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { DataBudgetProvider } from '../providers/data-budget/data-budget';

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
    MooringDetailsPage,
    BudgetEntryPage,
    CategoryDetailPage,
    SettingsPage,
    BudgetReportsPage,
    RunningBudgetTotalPage
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
    MooringDetailsPage,
    BudgetEntryPage,
    CategoryDetailPage,
    SettingsPage,
    BudgetReportsPage,
    RunningBudgetTotalPage
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
    Geolocation,
    Network,
    DataCategoryProvider,
    DecimalPipe,
    CurrencyPipe,
    DatePipe,
    DataBudgetProvider
  ]
})
export class AppModule {}
