import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
//import { CategoryDetailPage } from '../../pages/checklist-detail/checklist-detail';
import { CategoryModel } from '../../models/category-model';
import { DataCategoryProvider } from '../../providers/data-category/data-category';
import { Keyboard } from '@ionic-native/keyboard';
import { ItemSliding } from 'ionic-angular';

import { Storage } from '@ionic/storage';
//remove above

@IonicPage()
@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
})
export class BudgetPage {
  categories: CategoryModel[] = [];

  constructor(public storage: Storage,public navCtrl: NavController, public alertCtrl: AlertController, public platform: Platform, 
    public keyboard: Keyboard, public dataService: DataCategoryProvider) {
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
            let loadCategory = new CategoryModel(savedCategories.title, savedCategories.amtAllocated, savedCategories.items);

            this.categories.push(loadCategory);

            loadCategory.categoryUpdates().subscribe(update => {
              this.save();
            });
          });
        }
      });
    });
  }

  addCategory(): void {
    let prompt = this.alertCtrl.create({
      title: 'New Category',
      message: 'Enter the name of your new budget category below:',
      inputs: [
        {
          name: 'title'
        },
        {
          name: 'amtAllocated'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            let newCategory = new CategoryModel(data.title, data.amtAllocated, []);
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
          value: category.amtAllocated
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

  // viewCategory(category): void {
  //   this.navCtrl.push(CategoryDetailPage, {
  //     category: category
  //   });
  // }

  save(): void {
    this.keyboard.close();
    this.dataService.save(this.categories);
  }

}
