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
        date: category.date,
        title: category.title,
        amtAllocated: category.amtAllocated,
        items: category.items
      });
    });

    let newData = JSON.stringify(saveData);
    this.storage.set('categories', newData);
  }

}