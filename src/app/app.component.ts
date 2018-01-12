import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, Platform, MenuController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { BudgetPage } from '../pages/budget/budget';
import { SettingsPage } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  @ViewChild(Nav) nav: Nav;

  settingsPage: any = SettingsPage;
  budgetPage: any = BudgetPage;
  // reportsPage: any = ReportsPage;
  // savingsPage: any = SavingsPage;

  constructor(public menu: MenuController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page): void {
    this.menu.close();
    this.nav.push(page, { setBudget: true });
  }

}

