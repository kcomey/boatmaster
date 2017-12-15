import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BudgetPage } from '../pages/budget/budget';
import { ChecklistPage } from '../pages/checklist/checklist';
import { DataChecklistProvider } from '../providers/data-checklist/data-checklist';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BudgetPage,
    ChecklistPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BudgetPage,
    ChecklistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataChecklistProvider
  ]
})
export class AppModule {}
