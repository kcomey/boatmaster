
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

//Object looks like { date: date, monthlyBudget: 0, monthlyBudgetSpent: 0, amtBudgetAllocated: 0, previousMonths: []}
//Previous months looks like { date:'', monthlyBudget, monthlyBudgetSpent } -- Date will be file name 
//Archive will just be save categories to a different file

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
    return newDate;
  }

}