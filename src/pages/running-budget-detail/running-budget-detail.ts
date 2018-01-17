import { Component } from '@angular/core';
import { AlertController, ModalController, Events, ViewController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataBudgetProvider } from '../../providers/data-budget/data-budget';
import { ItemSliding } from 'ionic-angular';
import { RunningBudgetEntryPage } from '../running-budget-entry/running-budget-entry';
import { FormBuilder, FormGroup } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-running-budget-detail',
  templateUrl: 'running-budget-detail.html',
})
export class RunningBudgetDetailPage {
  savedTotals: any;
  entries: any;
  noEntries: boolean = false;

  constructor(public formBuilder: FormBuilder, public modalCtrl: ModalController, public events: Events, public budgetService: DataBudgetProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.budgetService.getRunningTotal().then((totals) => {
      let nullObject = totals;
      if (nullObject != null) {
        //Returns an object so it will be defined even if empty
        this.entries = totals.entries;
        this.savedTotals = totals;
        if (this.entries.length < 1) {
          this.noEntries = true;
        }
      }
    });
  }

  editEntryItem(entry, slidingItem: ItemSliding): void {
    let prompt = this.modalCtrl.create(RunningBudgetEntryPage, { entry: entry });
    prompt.onDidDismiss(data => {
      if (typeof(data) != "undefined") {
        let index = this.savedTotals.entries.indexOf(entry);

        let creditAmount = this.savedTotals.entries[index].amount;
        //Put back in original amount
        this.savedTotals.total += Number(creditAmount);
        //Take out new amount
        this.savedTotals.total -= Number(data.amount);
        //Update entry
        this.savedTotals.entries[index].date = data.date;
        this.savedTotals.entries[index].amount = data.amount;
        this.savedTotals.entries[index].details = data.details;

        this.budgetService.saveRunningTotal(this.savedTotals);
        this.events.publish('totals', this.savedTotals);
      }
      slidingItem.close();
    });
    prompt.present();
  }
  
  removeEntryItem(entry, slidingItem) {
    let index = this.savedTotals.entries.indexOf(entry);

    let amount = this.savedTotals.entries[index].amount;
    this.savedTotals.total += Number(amount);

    if (index > -1) {
      this.savedTotals.entries.splice(index, 1);
    }
    this.budgetService.saveRunningTotal(this.savedTotals);
    this.events.publish('totals', this.savedTotals);
    slidingItem.close();
  }

  closeModal() {
    this.viewCtrl.dismiss(); 
  }

}



