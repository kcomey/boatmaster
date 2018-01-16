import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataBudgetProvider } from '../../providers/data-budget/data-budget';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';

@IonicPage()
@Component({
  selector: 'page-running-budget-total',
  templateUrl: 'running-budget-total.html',
})
export class RunningBudgetTotalPage {
  isDisabled: boolean = false;
  runningTotal: number = 0;

  constructor(public budgetService: DataBudgetProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.budgetService.getRunningTotal().then((totals) => {
      let nullObject = totals;
      if (nullObject != null) {
        //Returns an object so it will be defined even if empty
        console.log('totals ARE defined');
        this.runningTotal = totals.total;
        console.log('totals ' + totals.total);
      }
      else {
        this.isDisabled = true;
        console.log('totals ARE NOT defined');
      }
    });
  }

  makeEntry() {
    console.log('make an entry');

  }

  showEntries() {
    console.log('show entries');
    
  }

}
