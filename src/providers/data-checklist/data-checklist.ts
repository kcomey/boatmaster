//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataChecklistProvider {

  constructor(public storage: Storage) {

  }

  getData(): Promise<any> {
    return this.storage.get('checklists');
  }

  save(data): void {
    let saveData = [];

    //Remove observables
    data.forEach(checklist => {
      saveData.push({
        title: checklist.title,
        items: checklist.items
      });
    });

    let newData = JSON.stringify(saveData);
    this.storage.set('checklists', newData);
  }

}
