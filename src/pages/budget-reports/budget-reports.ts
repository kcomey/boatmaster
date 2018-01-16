import { Component } from '@angular/core';
import { ModalController, Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataBudgetProvider } from '../../providers/data-budget/data-budget';
import { CustomPipe } from '../../pipes/custom/custom';
import { ShowArchiveBudgetPage } from '../show-archive-budget/show-archive-budget';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';

@IonicPage()
@Component({
  selector: 'page-budget-reports',
  templateUrl: 'budget-reports.html',
})
export class BudgetReportsPage {
  previousMonths: any = [];
  areSaved: boolean = false;
  headerTitle = "No Budgets Saved";

  constructor(public modalCtrl: ModalController, public budgetService: DataBudgetProvider , public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      let savedBudget: any;
      this.budgetService.getData().then((budget) => {
        if (typeof(budget) != "undefined") {
          savedBudget = JSON.parse(budget)
        }
    
        if (savedBudget) {
          if (savedBudget.previousMonths.length > 0) {
            this.headerTitle = "Saved Budgets";
          }
          this.previousMonths = savedBudget.previousMonths;
        }
      });
    });
  }

  viewArchiveBudget(budget) {
    this.navCtrl.push(ShowArchiveBudgetPage, { budget: budget });
  }

}
