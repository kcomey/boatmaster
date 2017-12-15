import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BudgetPage } from '../budget/budget';
import { ChecklistPage } from '../checklist/checklist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  showBudgetPage() {
    this.navCtrl.push(BudgetPage);
  }

  showChecklistPage() {
    this.navCtrl.push(ChecklistPage);
  }

}
