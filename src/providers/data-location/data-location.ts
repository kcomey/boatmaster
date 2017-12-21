import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataLocationProvider {

  constructor(public storage: Storage) {

  }

  setBoatDetails(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('boatdetails', newData);
  }

  setMooringDetails(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('mooringdetails', newData);
  }

  setLocation(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('location', newData);
  }

  getBoatDetails(): Promise<any> {
    return this.storage.get('boatdetails');
  }

  getMooringDetails(): Promise<any> {
    return this.storage.get('mooringdetails');
  }

  getLocation(): Promise<any> {
    return this.storage.get('location');
  }

}
