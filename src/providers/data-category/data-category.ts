import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataCategoryProvider {

  constructor(public storage: Storage) {

  }

  getData(): Promise<any> {
    return this.storage.get('categories');
  }

  getDataForDate(fileName): Promise<any> {
    return this.storage.get(fileName);
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

  archiveCategories(saveDate, categories): void {
      //Data is ready to go
      this.storage.set(saveDate, categories);

      let saveData = [];
      categories = JSON.parse(categories);
      //Remove observables
      if (categories) {
        categories.forEach(category => {
          saveData.push({
            title: category.title,
            amtAllocated: category.amtAllocated,
            amtSpent: 0,
            items: []
          });
        });
      }
    
      let newData = JSON.stringify(saveData);
      this.storage.set('categories', newData);
  }

}