import { Component } from '@angular/core';
import { ModalController, Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataBudgetProvider } from '../../providers/data-budget/data-budget';
import { CustomPipe } from '../../pipes/custom/custom';
import { ShowArchiveBudgetPage } from '../show-archive-budget/show-archive-budget';

@IonicPage()
@Component({
  selector: 'page-budget-reports',
  templateUrl: 'budget-reports.html',
})
export class BudgetReportsPage {
  previousMonths: any = [];
  noSaved: boolean = true;

  constructor(public modalCtrl: ModalController, public budgetService: DataBudgetProvider , public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      let savedBudget: any;
      this.budgetService.getData().then((budget) => {
        if (typeof(budget) != "undefined") {
          savedBudget = JSON.parse(budget)
        }
    
        if (savedBudget) {
          this.noSaved = false;
          this.previousMonths = savedBudget.previousMonths;
          console.log('type is ' + typeof(this.previousMonths[0].date));
          console.log('value is ' + this.previousMonths[0].date);
        }
      });
    });
  }

  viewArchiveBudget(budget) {
    //let prompt = this.modalCtrl.create(ShowArchiveBudgetPage, { budget: budget });
    //prompt.present();
    this.navCtrl.push(ShowArchiveBudgetPage, { budget: budget });
  }

}
