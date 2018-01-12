import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataCategoryProvider {

  constructor(public storage: Storage) {

  }

  getData(): Promise<any> {
    return this.storage.get('categories');
  }

  save(data): void {
    let saveData = [];

    //Remove observables
    data.forEach(category => {
      saveData.push({
        title: category.title,
        amtAllocated: category.amtAllocated,
        amtSpent: category.amtSpent,
        items: category.items
      });
    });

    let newData = JSON.stringify(saveData);
    this.storage.set('categories', newData);
  }

  archive(data, fileName): void {
    //filename also needs to be added to data-budget
    let saveData = [];

    //Remove observables
    data.forEach(category => {
      saveData.push({
        title: category.title,
        amtAllocated: category.amtAllocated,
        amtSpent: category.amtSpent,
        items: category.items
      });
    });

    let newData = JSON.stringify(saveData);
    this.storage.set(fileName, newData);
  }

}