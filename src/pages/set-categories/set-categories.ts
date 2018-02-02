import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataCategoryProvider } from '../../providers/data-category/data-category';
import { CategoryModel } from '../../models/category-model';
import { Keyboard } from '@ionic-native/keyboard';

@IonicPage()
@Component({
  selector: 'page-set-categories',
  templateUrl: 'set-categories.html',
})
export class SetCategoriesPage {
  selectCategories: any = [];

  constructor(public events: Events, public keyboard: Keyboard, public dataService: DataCategoryProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.selectCategories = [];
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
  }

  save(): void {
    this.keyboard.close();
    this.dataService.save(this.selectCategories);
  }

  selectCategory(category) {
    let checked = !category.checked;
    console.log('checked is ' + checked);
    let index = this.selectCategories.indexOf(category);
    this.selectCategories[index].toggleCategory(checked);
    this.events.publish('newCategories', this.selectCategories);
  }



}
