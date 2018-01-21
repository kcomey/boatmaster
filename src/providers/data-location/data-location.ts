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
      console.log('step 3 ' + data.details[0].lat);
      this.storage.set('locationDetails', data);
  }

  //Location is for the most recently added stop
  // getLocation(): Promise<any> {
  //   return this.storage.get('location');
  // }

  // setLocation(data: Object): void {
  //   let newData = JSON.stringify(data);
  //   this.storage.set('location', newData);
  // }

  getBoatDetails(): Promise<any> {
    return this.storage.get('boatdetails');
  }

  setBoatDetails(data: Object): void {
    let newData = JSON.stringify(data);
    this.storage.set('boatdetails', newData);
  }

}
