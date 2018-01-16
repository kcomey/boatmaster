
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

//Object looks like { date: date, monthlyBudget: 0, monthlyBudgetSpent: 0, amtBudgetAllocated: 0, previousMonths: []}
//Previous months looks like { date:'', monthlyBudget, monthlyBudgetSpent } -- Date will be file name 
//Archive will just be save categories to a different file

//Running totals will only be able to be used for entry when positive. 
//Entry will have [date, amount, detail]
//runningTotal will have { total: 0, entries: [] }

@Injectable()
export class DataBudgetProvider {

  constructor(public storage: Storage) {

  }

  getData(): Promise<any> {
    return this.storage.get('currentBudget');
  }

  save(budget): void {
    let newBudget = JSON.stringify(budget);
    this.storage.set('currentBudget', newBudget);
  }

  archiveBudget(newDate, budget): Promise<any>{
    console.log('archive the budget ' + budget.date);
    console.log('new the budget ' + newDate);

    budget.previousMonths.push(
      {
      date: budget.date,
      monthlyBudget: budget.monthlyBudget,
      monthlyBudgetSpent: budget.monthlyBudgetSpent
      }
    );

    budget.date = newDate;
    budget.monthlyBudgetSpent = 0;

    this.save(budget);

    //Also update running total
    //this.updateRunningTotal(budget.monthlyBudget, budget.monthlyBudgetSpent);

    return newDate;
  }

  updateRunningTotal(remaining, totals) {
    //let remaining = Number(budgetAmount - amtSpent);
    console.log('remaining is ' + remaining);
    console.log('totals is ' + totals);
    console.log('type of totals is ' + typeof(totals));


    if (totals == null) {
      totals = { total: remaining, entries: [] };
      console.log('not totals defined');
    }
    else {
      totals.total += Number(remaining);
    }
    //let totals = { total: remaining, entries: [] };

    //let savedRemaining = await this.getRunningTotalAsync();

    // if (savedRemaining == null) {
    //   //Do nothing, new object was created above
    // }
    // else {
      //Update the current object
      console.log('total is ' + totals.total);
    //}
    this.saveRunningTotal(totals);
  }

  getRunningTotal(): Promise<any> {
    return this.storage.get('runningTotal');
  }

  // getRunningTotalAsync() {
  //   return this.storage.get('runningTotal');
  // }

  saveRunningTotal(totals): void {
    console.log('SAVED RUNNING TOTAL');
    let newRunningTotal = JSON.stringify(totals);
    this.storage.set('runningTotal', totals);
  }

}