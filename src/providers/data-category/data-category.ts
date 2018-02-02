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
        items: category.items,
        checked: category.checked
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

  addDefaultCategories(): void {
    let categories = [
      {
        title: 'Boat Insurance',
        amtAllocated: 135,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Boat Repairs',
        amtAllocated: 400,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Clothing',
        amtAllocated: 150,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Customs/Licensing',
        amtAllocated: 100,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Diesel',
        amtAllocated: 350,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Electric',
        amtAllocated: 50,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Entertainment',
        amtAllocated: 200,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Food',
        amtAllocated: 500,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Gas',
        amtAllocated: 50,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Health Insurance',
        amtAllocated: 3,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Mail Service',
        amtAllocated: 25,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Misc',
        amtAllocated: 150,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Mooring',
        amtAllocated: 100,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Phone/Internet',
        amtAllocated: 125,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Restaurants',
        amtAllocated: 200,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Storage',
        amtAllocated: 95,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Travel (off boat)',
        amtAllocated: 300,
        amtSpent: 0,
        items: [],
        checked: false
      },
      {
        title: 'Water',
        amtAllocated: 50,
        amtSpent: 0,
        items: [],
        checked: false
      }
    ];
    this.save(categories);
    //let newData = JSON.stringify(categories);
    //this.storage.set('categoryLists', newData);
  }

}