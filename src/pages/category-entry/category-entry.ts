import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { BudgetPage } from '../budget/budget';
import { DataBudgetProvider } from '../../providers/data-budget/data-budget';
import { DataCategoryProvider } from '../../providers/data-category/data-category';


@IonicPage()
@Component({
  selector: 'page-category-entry',
  templateUrl: 'category-entry.html',
})
export class CategoryEntryPage {
  budgetEntryForm: FormGroup;
  category: any;
  categories: any = [];
  entry: any;
  budget: any;
  today: any = new Date().toISOString().slice(0,16)

  constructor(public dataService: DataCategoryProvider, public budgetService: DataBudgetProvider, public viewCtrl: ViewController, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.category = navParams.get('category');
    this.entry = navParams.get('entry');
    this.categories = navParams.get('categories');
    this.budget = navParams.get('budget');
   
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

  saveEntry(category, edit) {
    let data = this.budgetEntryForm.value;
    data.item = category;
    data.edit = edit;
    category.addEntry(data);
    category.setAmountSpent(data.amount);
    this.budget.monthlyBudgetSpent += Number(data.amount);
    this.budgetService.save(this.budget);
    this.save();
    this.navCtrl.push(BudgetPage);    
  }

  save(): void {
    this.dataService.save(this.categories);
  }

  cancelForm() {
    this.viewCtrl.dismiss(); 
  }

}


