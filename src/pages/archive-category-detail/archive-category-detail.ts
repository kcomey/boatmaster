import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ArchiveCategoryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-archive-category-detail',
  templateUrl: 'archive-category-detail.html',
})
export class ArchiveCategoryDetailPage {
  category: any;
  index: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.category = this.navParams.get('category');
    this.index = this.navParams.get('index');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArchiveCategoryDetailPage');
  }

}


