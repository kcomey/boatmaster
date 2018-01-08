import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@IonicPage()
@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.html',
})
export class CategoryDetailPage {
  category: string;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.category = navParams.get('category');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryDetailPage');
  }

  closeModal() {
    this.viewCtrl.dismiss(); 
  }

}
