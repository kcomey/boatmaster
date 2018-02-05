import { Component } from '@angular/core';
import { ToastController, Platform, AlertController, Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataCategoryProvider } from '../../providers/data-category/data-category';
import { CategoryModel } from '../../models/category-model';
import { Keyboard } from '@ionic-native/keyboard';
import { DataBudgetProvider } from '../../providers/data-budget/data-budget';

@IonicPage()
@Component({
  selector: 'page-set-categories',
  templateUrl: 'set-categories.html',
})
export class SetCategoriesPage {
  selectCategories: any = [];
  budget: any;

  constructor(public toastCtrl: ToastController, public budgetService: DataBudgetProvider, public platform: Platform, public alertCtrl: AlertController, public events: Events, public keyboard: Keyboard, public dataService: DataCategoryProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.selectCategories = [];
    this.platform.ready().then(() => {
      this.budgetService.getData().then((budget) => {
        if (typeof(budget) != "undefined") {
          this.budget = JSON.parse(budget);
          console.log('budget is ' + this.budget.monthlyBudget);
        }
      }).then(() => {
        this.dataService.getData().then((categories) => {
          let savedCategories: any = false;

          if (typeof(categories) != "undefined") {
            savedCategories = JSON.parse(categories);
          }

          if (savedCategories) {
            savedCategories.forEach(savedCategory => {
              let loadCategory = new CategoryModel(savedCategory.title, savedCategory.amtAllocated, savedCategory.amtSpent, savedCategory.items, savedCategory.checked);

              this.selectCategories.push(loadCategory);

              loadCategory.categoryUpdates().subscribe(update => {
                this.save();
              });
            });
          }
        });
      });
    });
  }

  save(): void {
    this.keyboard.close();
    this.dataService.save(this.selectCategories);
  }

  toggleCategory(category) {
    let checked = !category.checked;

    if (checked == true) {
      this.selectCategory(category);
    }
    else {
      this.deselectCategory(category);
    }
  }

  deselectCategory(category) {
    let promptCannotRemove = this.alertCtrl.create({
      title: 'Problem Removing ' + category.title,
      subTitle: 'Since entries have been made, proceed to budget page to remove.',
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.navCtrl.pop();
          }
        } 
      ]
    });

    let promptRemove = this.alertCtrl.create({
      title: 'Remove ' + category.title,
      subTitle: 'Clicking OK will remove this category from your budget page',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.navCtrl.pop();
          }
        },
        {
          text: 'OK',
          handler: data => {  
            this.budget.amtBudgetAllocated -= Number(category.amtAllocated);
            this.budgetService.save(this.budget);
            this.events.publish('budget', this.budget);

            let index = this.selectCategories.indexOf(category);
            this.selectCategories[index].toggleCategory(false);
            this.events.publish('newCategories', this.selectCategories);
          }
        }
      ]
    });

    if (category.items.length > 0) {
      promptCannotRemove.present();
    }
    else {
      promptRemove.present();
    }
  }

  selectCategory(category) {
    let prompt = this.alertCtrl.create({
      title: 'Monthly Budget for ' + category.title,
      inputs: [
        {
          name: 'categoryBudget',
          type: 'number',
          value: category.amtAllocated
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            this.navCtrl.pop();
          }
        },
        {
          text: 'Save',
          handler: data => {  
            if (data.categoryBudget > 0) {
              let remainingToAllocate = this.budget.amtBudgetAllocated + Number(data.categoryBudget);
              let overError: boolean = false;
              let categoryAllocated = data.categoryBudget;

              if (remainingToAllocate > this.budget.monthlyBudget) {
                categoryAllocated = this.budget.monthlyBudget - this.budget.amtBudgetAllocated;
                overError = true;
              }
             
              this.budget.amtBudgetAllocated += Number(categoryAllocated);
              this.budgetService.save(this.budget);
              this.events.publish('budget', this.budget);

              if (overError) {
                let toast = this.toastCtrl.create({
                  message: 'Cannot allocate more than monthly total monthly budget, $' + categoryAllocated + ' was applied.',
                  duration: 5000,
                  position: 'middle',
                  cssClass: 'toastClass'
                });
                toast.present();
              }

              let checked = !category.checked;
              let index = this.selectCategories.indexOf(category);
              this.selectCategories[index].toggleCategory(checked);
              this.selectCategories[index].setAmountAllocated(categoryAllocated);
              this.events.publish('newCategories', this.selectCategories);
          }
        }
      }
      ]
    });

    prompt.present();
  }
}
