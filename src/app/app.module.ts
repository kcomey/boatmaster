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
import { RemindersPage } from '../pages/reminders/reminders';
import { AddReminderPage } from '../pages/add-reminder/add-reminder';
import { BoatDetailsPage } from '../pages/boat-details/boat-details';
import { BoatMathPage } from '../pages/boat-math/boat-math';
import { CategoryDetailPage } from '../pages/category-detail/category-detail';
import { ArchiveCategoryDetailPage } from '../pages/archive-category-detail/archive-category-detail';
import { MooringDetailsPage } from '../pages/mooring-details/mooring-details';
import { TravelLogPage } from '../pages/travel-log/travel-log';
import { SetCategoriesPage } from '../pages/set-categories/set-categories';
import { BudgetEntryPage } from '../pages/budget-entry/budget-entry';
import { BudgetReportsPage } from '../pages/budget-reports/budget-reports';
import { ShowArchiveBudgetPage } from '../pages/show-archive-budget/show-archive-budget';
import { RunningBudgetTotalPage } from '../pages/running-budget-total/running-budget-total';
import { RunningBudgetDetailPage } from '../pages/running-budget-detail/running-budget-detail';
import { RunningBudgetEntryPage } from '../pages/running-budget-entry/running-budget-entry';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { DataChecklistProvider } from '../providers/data-checklist/data-checklist';
import { DataLocationProvider } from '../providers/data-location/data-location';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { DataCategoryProvider } from '../providers/data-category/data-category';
import { DecimalPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { DataBudgetProvider } from '../providers/data-budget/data-budget';
import { CustomPipe } from '../pipes/custom/custom';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DataReminderProvider } from '../providers/data-reminder/data-reminder';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BudgetPage,
    ChecklistPage,
    ChecklistDetailPage,
    LocationPage,
    TravelLogPage,
    BoatDetailsPage,
    MooringDetailsPage,
    BudgetEntryPage,
    CategoryDetailPage,
    SettingsPage,
    BudgetReportsPage,
    RunningBudgetTotalPage,
    CustomPipe,
    ShowArchiveBudgetPage,
    ArchiveCategoryDetailPage,
    RunningBudgetDetailPage,
    RunningBudgetEntryPage,
    BoatMathPage,
    RemindersPage,
    AddReminderPage,
    SetCategoriesPage
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
    TravelLogPage,
    BoatDetailsPage,
    MooringDetailsPage,
    BudgetEntryPage,
    CategoryDetailPage,
    SettingsPage,
    BudgetReportsPage,
    RunningBudgetTotalPage,
    ShowArchiveBudgetPage,
    ArchiveCategoryDetailPage,
    RunningBudgetDetailPage,
    RunningBudgetEntryPage,
    BoatMathPage,
    RemindersPage,
    AddReminderPage,
    SetCategoriesPage
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
    DataBudgetProvider,
    LocalNotifications,
    DataReminderProvider
  ]
})
export class AppModule {}
