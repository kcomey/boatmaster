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

  setLocationStopDetails(data): Promise<any> {
    console.log('get here?' + data);
    //let newData = JSON.stringify(data);
    return this.storage.set('locationDetails', data);
  }

  getBoatDetails(): Promise<any> {
    return this.storage.get('boatdetails');
  }

  setBoatDetails(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('boatdetails', newData);
  }

  getLocationID(): Promise<any> {
    return this.storage.get('locationID');
  }

  setLocationID(id): void {
    console.log('getting to set?' + id)
      this.storage.set('locationID', id);
  }

}
