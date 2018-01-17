import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewController } from 'ionic-angular/navigation/view-controller';


@IonicPage()
@Component({
  selector: 'page-running-budget-entry',
  templateUrl: 'running-budget-entry.html',
})
export class RunningBudgetEntryPage {
  budgetSurplusEntryForm: FormGroup;
  entry: any;
  today: any = new Date().toISOString().slice(0,16)

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.entry = navParams.get('entry');

    this.budgetSurplusEntryForm = formBuilder.group({
      date: [this.today],
      amount: ['$'],
      details: ['']
    });
  }

  ionViewDidLoad() {
    if (typeof(this.entry) != "undefined") {
      if (this.entry.date != "undefined") {
        this.budgetSurplusEntryForm.controls['date'].setValue(this.entry.date);
      }

      if (this.entry.amount != "undefined") {
        this.budgetSurplusEntryForm.controls['amount'].setValue(this.entry.amount);
      }

      if (this.entry.details != "undefined") {
        this.budgetSurplusEntryForm.controls['details'].setValue(this.entry.details);
      }
    }
  }

  saveEntry(entry) {
    let data = this.budgetSurplusEntryForm.value;
    data.entry = entry;
    this.viewCtrl.dismiss(data);    
  }

  cancelForm() {
    this.viewCtrl.dismiss(); 
  }
}

 

