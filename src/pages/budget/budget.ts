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

//remove storage above

@IonicPage()
@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html'
})
export class BudgetPage {
  categories: CategoryModel[] = [];
  //Need this format to save to storage
  today: any = new Date('09/15/2017').toISOString();
  formData: any;
  budget: any = false;
  archiveCategories: boolean = false;

  constructor(public toastCtrl: ToastController, public events: Events, public menu: MenuController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController, public currency: CurrencyPipe, public storage: Storage,public navCtrl: NavController, public alertCtrl: AlertController, public platform: Platform, 
    public keyboard: Keyboard, public dataService: DataCategoryProvider, public budgetService: DataBudgetProvider) {
      this.menu.enable(true);
      events.subscribe('monthlyBudget', (monthlyBudget)=> {
        this.budget = { date: this.today.substring(0, 7), monthlyBudget: monthlyBudget, monthlyBudgetSpent: 0, amtBudgetAllocated: 0, previousMonths: []};
      });
      events.subscribe('budget', (budget)=> {
        this.budget = budget;
      });
  }

  ionViewDidLoad() {
    this.storage.clear();

    console.log('today is ' + this.today.substring(0, 7));
    this.platform.ready().then(() => {
      this.budgetService.getData().then((budget) => {
        if (typeof(budget) != "undefined") {
          this.budget = JSON.parse(budget)
        }
        //If there is not a monthly budget yet, send to the settings page
        if (!this.budget) {
          this.navCtrl.push(SettingsPage);
        }
        else {
          console.log('dates in storage ' + this.budget.date);
        //If month has changed, archive data
          if (this.today.substring(0, 7) != this.budget.date) {
            console.log('dates do not match - go to archive');
            this.archiveData(this.budget.date);
          }
        }
      }).then(() => {
        this.categories = [];
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
      });
    });
  }

  archiveData(saveDate) {
    this.dataService.getData().then((categories) => {
      this.dataService.archiveCategories(saveDate, categories);
      this.categories = [];
      console.log('step 1 is ' + categories);
    }).then(() => {
      this.budgetService.archiveBudget(this.today.substring(0, 7), this.budget)
      console.log('step 2 is ');
    }).then(() => {
      this.ionViewDidLoad();
      console.log('step 3 is ');
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

              this.budget.amtBudgetAllocated += Number(categoryAllocated);
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
      this.budget.amtBudgetAllocated -= Number(amtAllocated);
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
            this.budget.amtBudgetAllocated -= Number(this.categories[index].amtAllocated);
            let remainingToAllocate = this.budget.amtBudgetAllocated + Number(data.amtAllocated);
            let overError: boolean = false;
            let categoryAllocated = data.amtAllocated;

            if (remainingToAllocate > this.budget.monthlyBudget) {
              categoryAllocated = this.budget.monthlyBudget - this.budget.amtBudgetAllocated;
              overError = true;
            }

            if (index > -1) {
              this.categories[index].setTitle(data.title);
              this.categories[index].setAmountAllocated(categoryAllocated);
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
