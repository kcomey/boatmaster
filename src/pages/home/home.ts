import { Component } from '@angular/core';
import { Platform, AlertController, MenuController, NavController } from 'ionic-angular';
import { BudgetPage } from '../budget/budget';
import { RemindersPage } from '../reminders/reminders';
import { ChecklistPage } from '../checklist/checklist';
import { LocationPage } from '../location/location';
import { BoatDetailsPage } from '../boat-details/boat-details';
import { BoatMathPage } from '../boat-math/boat-math';
import { TravelLogPage } from '../travel-log/travel-log';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  waterDays: any;
  wasteDays: any;
  momentTodayDate: any = moment(); 
  todayDate: any = Date();

  constructor(public platform: Platform, public storage: Storage, public alertCtrl: AlertController, public navCtrl: NavController, public menu: MenuController) {
    this.menu.enable(false);
  }

  ionViewDidLoad() {
    // console.log('today is ' + this.todayDate);
    // let oldDate = moment('02/11/2018');
    // let diff = this.todayDate.diff(oldDate, 'days');
    // console.log('diff is ' + diff);
    this.platform.ready().then(() => {
      this.getWater().then((days) => {
        console.log('days is ' + days)
        if (days != null) {
         this.waterDays = this.momentTodayDate.diff(days, 'days');
        }
      }).then(() => {
        this.getWaste().then((days) => {
          if (days != null) {
           this.wasteDays = this.momentTodayDate.diff(days, 'days');
          }
        });
      });
    });
  }

  showBudgetPage() {
    this.menu.enable(true);
    this.navCtrl.push(BudgetPage);
  }

  showChecklistPage() {
    this.navCtrl.push(ChecklistPage);
  }

  showLocationPage() {
    this.navCtrl.push(LocationPage);
  }

  showBoatPage() {
    this.navCtrl.push(BoatDetailsPage);
  }

  showCalculationsPage() {
    this.navCtrl.push(BoatMathPage);
  }

  showTravelLogPage() {
    this.navCtrl.push(TravelLogPage);
  }

  showRemindersPage() {
    this.navCtrl.push(RemindersPage);
  }

  resetWaste() {
    let prompt = this.alertCtrl.create({
      title: 'Reset Waste Dump',
      message: 'Set days since last dumped to today',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'OK',
          handler: data => {
            this.saveWaste(this.todayDate);
            this.wasteDays = 0;
          }
        }
      ]
    });
    prompt.present();
  }

  resetWater() {
    let prompt = this.alertCtrl.create({
      title: 'Reset Water Filled',
      message: 'Set days since last filled water to today',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'OK',
          handler: data => {
            console.log('today is ' + this.todayDate);
            this.saveWater(this.todayDate);
            this.waterDays = 0;
          }
        }
      ]
    });
    prompt.present();
  }

  getWater(): Promise<any> {
    return this.storage.get('water');
  }

  saveWater(date): void {
    this.storage.set('water', date);
  }

  getWaste(): Promise<any> {
    return this.storage.get('waste');
  }

  saveWaste(date): void {
    this.storage.set('waste', date);
  }

}
