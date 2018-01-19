import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { BudgetPage } from '../budget/budget';
import { ChecklistPage } from '../checklist/checklist';
import { LocationPage } from '../location/location';
import { BoatDetailsPage } from '../boat-details/boat-details';
import { BoatMathPage } from '../boat-math/boat-math';
import { TravelLogPage } from '../travel-log/travel-log';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {
    this.menu.enable(false);
  }

  showBudgetPage() {
    this.menu.enable(true);
    this.navCtrl.push(BudgetPage);
  }

  showChecklistPage() {
    this.navCtrl.push(ChecklistPage);
  }

  showLocationPage() {
    this.navCtrl.push(LocationPage);
  }

  showBoatPage() {
    this.navCtrl.push(BoatDetailsPage);
  }

  showCalculationsPage() {
    this.navCtrl.push(BoatMathPage);
  }

  showTravelLogPage() {
    this.navCtrl.push(TravelLogPage);
  }

}
