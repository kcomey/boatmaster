import { Component, ViewChild } from '@angular/core';
import { Toast, Events, MenuController, ModalController, ViewController, IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { CategoryDetailPage } from '../category-detail/category-detail';
import { CategoryModel } from '../../models/category-model';
import { DataCategoryProvider } from '../../providers/data-category/data-category';
import { DataBudgetProvider } from '../../providers/data-budget/data-budget';
import { Keyboard } from '@ionic-native/keyboard';
import { ItemSliding } from 'ionic-angular';
import { CurrencyPipe } from '@angular/common';
import { BudgetEntryPage } from '../budget-entry/budget-entry';
import { SettingsPage } from '../../pages/settings/settings';

import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { collectExternalReferences } from '@angular/compiler/src/output/output_ast';
//remove above

@IonicPage()
@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html'
})
export class BudgetPage {
  categories: CategoryModel[] = [];
  today: any = Date();
  formData: any;
  budget: any = false;

  constructor(public toastCtrl: ToastController, public events: Events, public menu: MenuController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public currency: CurrencyPipe, public storage: Storage,public navCtrl: NavController, public alertCtrl: AlertController, public platform: Platform, 
    public keyboard: Keyboard, public dataService: DataCategoryProvider, public budgetService: DataBudgetProvider) {
      this.menu.enable(true);
      events.subscribe('budget', (monthlyBudget)=> {
        this.budget = { date: this.today, monthlyBudget: 0, monthlyBudgetSpent: 0, amtBudgetAllocated: 0, previousMonths: []};
        this.budget.monthlyBudget = monthlyBudget;
      });
  }

  ionViewDidLoad() {
    //this.storage.clear();
    this.platform.ready().then(() => {
      this.dataService.getData().then((categories) => {
        let savedCategories: any = false;

        if (typeof(categories) != "undefined") {
          savedCategories = JSON.parse(categories);
        }

        if (savedCategories) {
          savedCategories.forEach(savedCategory => {
            let loadCategory = new CategoryModel(savedCategory.title, savedCategory.amtAllocated, savedCategory.amtSpent, savedCategory.items);

            this.categories.push(loadCategory);

            loadCategory.categoryUpdates().subscribe(update => {
              this.save();
            });
          });
        }
      });

      this.budgetService.getData().then((budget) => {
        if (typeof(budget) != "undefined") {
          this.budget = JSON.parse(budget)
        }

        //If there is not a monthly budget yet, send to the settings page
        if (!this.budget) {
          this.navCtrl.push(SettingsPage);
        } 
      });
    });
  }

  addCategory(): void {
    console.log('start allocated ' + this.budget.amtBudgetAllocated);
    if (!this.budget) {
      this.navCtrl.push(SettingsPage);
    } 
    else if (this.budget.monthlyBudget <= this.budget.amtBudgetAllocated) {
      console.log(this.budget.monthlyBudget + ' and ' + this.budget.amtBudgetAllocated);
      let toast = this.toastCtrl.create({
        message: 'There is no more money in your budget to allocate!',
        duration: 5000,
        position: 'middle',
        cssClass: 'toastClass'
      });
      toast.present();
    }
    else {
      let prompt = this.alertCtrl.create({
        title: 'New Category',
        message: 'Enter the name and allocation for your new budget category below:',
        inputs: [
          {
            name: 'title',
            placeholder: 'Title'
          },
          {
            name: 'amtAllocated',
            placeholder: 'Monthly Amount'
          }
        ],
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Save',
            handler: data => {
              let remainingToAllocate = this.budget.amtBudgetAllocated + Number(data.amtAllocated);
              let overError: boolean = false;
              let categoryAllocated = data.amtAllocated;

              if (remainingToAllocate > this.budget.monthlyBudget) {
                categoryAllocated = this.budget.monthlyBudget - this.budget.amtBudgetAllocated;
                overError = true;
              }
              let newCategory = new CategoryModel(data.title, categoryAllocated, 0, []);
              this.categories.push(newCategory);

              newCategory.categoryUpdates().subscribe(update => {
                this.save();
              });

              this.save();

              console.log('allocated ' + this.budget.amtBudgetAllocated);
              this.budget.amtBudgetAllocated += Number(categoryAllocated);
              console.log('allocated ' + this.budget.amtBudgetAllocated);
              this.budgetService.save(this.budget);


              if (overError) {
                let toast = this.toastCtrl.create({
                  message: 'Cannot allocate more than monthly total monthly budget, $' + categoryAllocated + ' was applied.',
                  duration: 5000,
                  position: 'middle',
                  cssClass: 'toastClass'
                });
                toast.present();
              }
  
            }
          }
        ]
      });
      prompt.present();
    }
  }

  removeCategory(category, slidingItem: ItemSliding): void {
    let index = this.categories.indexOf(category);

    if (index > -1) {
      let amtAllocated = this.categories[index].amtAllocated;
      this.budget.amtBudgetAllocated -= amtAllocated;
      this.budgetService.save(this.budget);
      this.categories.splice(index, 1);
      this.save();
      slidingItem.close();
    }
  }

  renameCategory(category, slidingItem: ItemSliding): void {
    let prompt = this.alertCtrl.create({
      title: 'Rename Category',
      message: 'Enter the new name of this budget category below:',
      inputs: [
        {
          name: 'title',
          value: category.title
        },
        {
          name: 'amtAllocated',
          value: category.amtAllocated,
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            slidingItem.close();
          }
        },
        {
          text: 'Save',
          handler: data => {
            let index = this.categories.indexOf(category);
            this.budget.amtBudgetAllocated -= this.categories[index].amtAllocated;
            let remainingToAllocate = this.budget.amtBudgetAllocated + Number(data.amtAllocated);
            let overError: boolean = false;
            let categoryAllocated = data.amtAllocated;

            if (remainingToAllocate > this.budget.monthlyBudget) {
              categoryAllocated = this.budget.monthlyBudget - this.budget.amtBudgetAllocated;
              overError = true;
            }

            if (index > -1) {
              this.categories[index].setTitle(data.title);
              this.categories[index].setAmount(categoryAllocated);
              this.save();
              this.budget.amtBudgetAllocated += Number(categoryAllocated);
              this.budgetService.save(this.budget);
              slidingItem.close();

              if (overError) {
                let toast = this.toastCtrl.create({
                  message: 'Cannot allocate more than monthly total monthly budget, $' + categoryAllocated + ' was applied.',
                  duration: 5000,
                  position: 'top'
                });
                toast.present();
              }
            }
          }
        }
      ]
    });

    prompt.present();
  }

  viewCategoryEntries(category): void {
    let index = this.categories.indexOf(category);

    this.navCtrl.push(CategoryDetailPage, {
      category: category,
      index: index
    });
  }

  addEntry(category): void {
    let prompt = this.modalCtrl.create(BudgetEntryPage, { category: category });
    prompt.onDidDismiss(data => {
      if (typeof(data) != "undefined") {
        category.addEntry(data);
        category.setAmountSpent(data.amount);
        this.budget.monthlyBudgetSpent += Number(data.amount);
        this.budgetService.save(this.budget);
        this.save();
      }
    });
    prompt.present();
  }

  save(): void {
    this.keyboard.close();
    this.dataService.save(this.categories);
  }

}
