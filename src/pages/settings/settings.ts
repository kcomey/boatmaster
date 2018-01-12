import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DataBudgetProvider } from '../../providers/data-budget/data-budget';
import { Keyboard } from '@ionic-native/keyboard';
import { CurrencyPipe } from '@angular/common/src/pipes';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  budget: any = false;

  constructor(public keyboard: Keyboard, public alertCtrl: AlertController, public dataService: DataBudgetProvider, public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.dataService.getData().then((budget) => {
        let currentBudget: number = 0;

        if (typeof(budget) != "undefined") {
          this.budget = JSON.parse(budget);
          currentBudget = Number(this.budget.monthlyBudget);
        }

        if (this.budget == null) {
          this.budget = { monthlyBudget: 0, monthlyBudgetSpent: 0, previousMonths: []}
        }

        this.openModal(currentBudget);
      });
    });
  }

  openModal(currentBudget) {
      let prompt = this.alertCtrl.create({
        title: 'Set Monthly Budget',
        inputs: [
          {
            name: 'budget',
            type: 'number',
            value: currentBudget
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              this.navCtrl.pop();
            }
          },
          {
            text: 'Save',
            handler: data => {  
              if (data.budget > 0) {
              this.budget.monthlyBudget = data.budget;
              this.saveBudget(this.budget);
              this.navCtrl.pop();
            }
          }
        }
        ]
      });
  
      prompt.present();
    }

  saveBudget(budget): void {
    this.keyboard.close();
    this.dataService.save(budget);
  }
}
