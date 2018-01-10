import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform, ModalController, ViewController, AlertController } from 'ionic-angular';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { CategoryModel } from '../../models/category-model';
import { DataCategoryProvider } from '../../providers/data-category/data-category';
import { BudgetEntryPage } from '../budget-entry/budget-entry';
import { Keyboard } from '@ionic-native/keyboard';
import { ItemSliding } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage {
  category: any;
  categories: CategoryModel[] = [];
  index: any;

  constructor(public alertCtrl: AlertController, public platform: Platform, public keyboard: Keyboard, public modalCtrl: ModalController, public currency: CurrencyPipe, public date: DatePipe, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams,
    public dataService: DataCategoryProvider) {
    this.category = this.navParams.get('category');
    this.index = this.navParams.get('index');
  }

  ionViewDidLoad() {

  }

  closeModal() {
    this.viewCtrl.dismiss(); 
  }

  editEntryItem(entry, slidingItem: ItemSliding): void {
    let prompt = this.modalCtrl.create(BudgetEntryPage, { category: this.category, entry: entry });
    prompt.onDidDismiss(data => {
      if (typeof(data) != "undefined") {
        this.category.editEntry(data, entry);
      }
      slidingItem.close();
    });
    prompt.present();
  }

  removeEntryItem(entry, slidingItem: ItemSliding) {
    this.category.removeEntry(entry);
    slidingItem.close();
  }

}




