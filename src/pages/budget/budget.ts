import { Component, ViewChild } from '@angular/core';
import { MenuController, ModalController, ViewController, IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
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
  savedBudget: any = false;
  currentBudget: any = false;

  constructor(public menu: MenuController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public currency: CurrencyPipe, public storage: Storage,public navCtrl: NavController, public alertCtrl: AlertController, public platform: Platform, 
    public keyboard: Keyboard, public dataService: DataCategoryProvider, public budgetService: DataBudgetProvider) {
      this.menu.enable(true);
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
          this.savedBudget = JSON.parse(budget)
        }

        //If there is not a monthly budget yet, send to the settings page
        if (!this.savedBudget) {
          this.navCtrl.push(SettingsPage);
        } 
        else {
          this.currentBudget = this.savedBudget.monthlyBudget;
        }
      });
    });
  }

  addCategory(): void {
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
            let newCategory = new CategoryModel(data.title, data.amtAllocated, 0, []);
            this.categories.push(newCategory);

            newCategory.categoryUpdates().subscribe(update => {
              this.save();
            });

            this.save();
          }
        }
      ]
    });

    prompt.present();
  }

  removeCategory(category, slidingItem: ItemSliding): void {
    let index = this.categories.indexOf(category);

    if (index > -1) {
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

            if (index > -1) {
              this.categories[index].setTitle(data.title);
              this.categories[index].setAmount(data.amtAllocated);
              this.save();
              slidingItem.close();
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
        this.savedBudget.monthlyBudgetSpent += Number(data.amount);
        this.saveBudget();
        this.save();
      }
    });
    prompt.present();
  }

  save(): void {
    this.keyboard.close();
    this.dataService.save(this.categories);
  }

  saveBudget(): void {
    this.budgetService.save(this.savedBudget);
  }

}
