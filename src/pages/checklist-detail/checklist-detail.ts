import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-checklist-detail',
  templateUrl: 'checklist-detail.html',
})
export class ChecklistDetailPage {
  checklist: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.checklist = this.navParams.get('checklist');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChecklistDetailPage');
  }

  addItem(): void {
    let prompt = this.alertCtrl.create({
      title: 'Add Item',
      message: 'Enter the name of the task for this checklist below:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.checklist.addItem(data.name);
          }
        }
      ]
    });

    prompt.present();
  }

  toggleItem(item): void {
    this.checklist.toggleItem(item);
  }

  removeItem(item, slidingItem: ItemSliding): void {
    this.checklist.removeItem(item);
    slidingItem.close();
  }

  renameItem(item, slidingItem: ItemSliding): void {
    let prompt = this.alertCtrl.create({
      title: 'Rename Item',
      message: 'Enter the new name of the task for this checklist below:',
      inputs: [
        {
          name: 'name',
          value: item.title
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
            this.checklist.renameItem(item, data.name);
            slidingItem.close();
          }
        }
      ]
    });

    prompt.present();
  }

  uncheckItems(): void {
    this.checklist.items.forEach(item => {
      if(item.checked) {
        this.checklist.toggleItem(item);
      }
    });
  }
}
