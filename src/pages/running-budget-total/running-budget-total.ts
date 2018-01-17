import { Component } from '@angular/core';
import { Events, ViewController, ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataBudgetProvider } from '../../providers/data-budget/data-budget';
import { BudgetEntryPage } from '../budget-entry/budget-entry';
import { RunningBudgetDetailPage } from '../running-budget-detail/running-budget-detail';


@IonicPage()
@Component({
  selector: 'page-running-budget-total',
  templateUrl: 'running-budget-total.html',
})
export class RunningBudgetTotalPage {
  isDisabled: boolean = false;
  runningTotal: number = 0;
  savedTotals: any;

  constructor(public events: Events, public viewCtrl: ViewController, public modalCtrl: ModalController, public budgetService: DataBudgetProvider, public navCtrl: NavController, public navParams: NavParams) {
    events.subscribe('totals', (totals)=> {
      this.savedTotals = totals;
      this.runningTotal = totals.total;
    });
  }

  ionViewDidLoad() {
    this.budgetService.getRunningTotal().then((totals) => {
      let nullObject = totals;
      if (nullObject != null) {
        //Returns an object so it will be defined even if empty
        this.runningTotal = totals.total;
        this.savedTotals = totals;
      }
      else {
        this.isDisabled = true;
      }
    });
  }

  makeEntry(): void {
    let category = { title: "Surplus Budget Entry"};
    let prompt = this.modalCtrl.create(BudgetEntryPage, { category: category });
    prompt.onDidDismiss(data => {
      if (typeof(data) != "undefined") {
        this.savedTotals.total -= Number(data.amount);
        this.runningTotal -= Number(data.amount);
        this.savedTotals.entries.push(
          {
            date: data.date,
            amount: data.amount,
            details: data.details
          }
        )
        this.budgetService.saveRunningTotal(this.savedTotals);
      }
    });
    prompt.present();
  }

  showEntries(): void {
    let category = { title: "Surplus Budget Entry", items: this.savedTotals.entries};
    this.navCtrl.push(RunningBudgetDetailPage);
  }

}


