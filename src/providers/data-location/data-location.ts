import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataLocationProvider {

  constructor(public storage: Storage) {

  }

  //For both mooring and diving entries
  getLocationStopDetails(): Promise<any> {
    return this.storage.get('locationDetails');
  }

  setLocationStopDetails(data): void {
      //let newData = JSON.stringify(data);
      this.storage.set('locationDetails', data);
  }

  getBoatDetails(): Promise<any> {
    return this.storage.get('boatdetails');
  }

  setBoatDetails(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('boatdetails', newData);
  }

}
