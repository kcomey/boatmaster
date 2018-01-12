import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewController } from 'ionic-angular/navigation/view-controller';


@IonicPage()
@Component({
  selector: 'page-budget-entry',
  templateUrl: 'budget-entry.html',
})
export class BudgetEntryPage {
  budgetEntryForm: FormGroup;
  category: any;
  entry: any;
  today: any = new Date().toISOString().slice(0,16)

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.category = navParams.get('category');
    this.entry = navParams.get('entry');
   
    this.budgetEntryForm = formBuilder.group({
      date: [this.today],
      amount: ['$'],
      details: ['']
    });
  }

  ionViewDidLoad() {
    if (typeof(this.entry) != 'undefined') {
      let index = this.category.items.indexOf(this.entry);

        if (this.category.items[index].date != "undefined") {
          this.budgetEntryForm.controls['date'].setValue(this.category.items[index].date);
        }

        if (this.category.items[index].amount != "undefined") {
          this.budgetEntryForm.controls['amount'].setValue(this.category.items[index].amount);
        }

        if (this.category.items[index].details != "undefined") {
          this.budgetEntryForm.controls['details'].setValue(this.category.items[index].details);
        }
    }
  }

  saveEntry(item, edit) {
    let data = this.budgetEntryForm.value;
    data.item = item;
    data.edit = edit;
    this.viewCtrl.dismiss(data);    
  }

  cancelForm() {
    this.viewCtrl.dismiss(); 
  }

}
