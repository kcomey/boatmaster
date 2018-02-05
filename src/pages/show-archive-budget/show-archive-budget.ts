import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataCategoryProvider } from '../../providers/data-category/data-category';
import { CategoryModel } from '../../models/category-model';
import { ArchiveCategoryDetailPage } from '../archive-category-detail/archive-category-detail';

@IonicPage()
@Component({
  selector: 'page-show-archive-budget',
  templateUrl: 'show-archive-budget.html',
})
export class ShowArchiveBudgetPage {
  categories: CategoryModel[] = [];
  budget: any;

  constructor(public dataService: DataCategoryProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.budget = this.navParams.get('budget');
  }

  ionViewDidLoad() {
    this.dataService.getDataForDate(this.budget.date).then((categories) => {
      let savedCategories: any = false;

      if (typeof(categories) != "undefined") {
        savedCategories = JSON.parse(categories);
      }

      if (savedCategories) {
        savedCategories.forEach(savedCategory => {
          let loadCategory = new CategoryModel(savedCategory.title, savedCategory.amtAllocated, savedCategory.amtSpent, savedCategory.items, savedCategory.checked);

          this.categories.push(loadCategory);
        });
      }
    });
  }

  viewCategoryEntries(category): void {
    let index = this.categories.indexOf(category);

    this.navCtrl.push(ArchiveCategoryDetailPage, {
      category: category,
      index: index
    });
  }

}






