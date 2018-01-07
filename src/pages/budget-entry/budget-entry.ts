import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the BudgetEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-budget-entry',
  templateUrl: 'budget-entry.html',
})
export class BudgetEntryPage {
  budgetEntryForm: FormGroup;
  category: string;
  today: any = new Date().toISOString().slice(0,16)

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.category = navParams.get('category');
    this.budgetEntryForm = formBuilder.group({
      date: [this.today],
      amount: ['$'],
      details: ['']
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetEntryPage');
  }

}
