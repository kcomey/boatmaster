import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataBudgetProvider } from '../../providers/data-budget/data-budget';

@IonicPage()
@Component({
  selector: 'page-budget-reports',
  templateUrl: 'budget-reports.html',
})
export class BudgetReportsPage {
  previousMonths: any = [];

  constructor(public budgetService: DataBudgetProvider , public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      let savedBudget: any;
      this.budgetService.getData().then((budget) => {
        if (typeof(budget) != "undefined") {
          savedBudget = JSON.parse(budget)
        }
    
        if (savedBudget) {
          this.previousMonths = savedBudget.previousMonths;
        }
      });
    });
  }

}
