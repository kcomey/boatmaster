import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { BudgetPage } from '../budget/budget';
import { ChecklistPage } from '../checklist/checklist';
import { LocationHomePage } from '../location-home/location-home';

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

  showLocationHomePage() {
    this.navCtrl.push(LocationHomePage);
  }

}
