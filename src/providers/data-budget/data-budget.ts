import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';


@Injectable()
export class DataBudgetProvider {

  constructor(public storage: Storage) {

  }

  getData(): Promise<any> {
    return this.storage.get('budget');
  }

  save(budget): void {
    let newBudget = JSON.stringify(budget);
    this.storage.set('budget', newBudget);
  }

}


