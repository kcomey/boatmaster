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

  setLocationStopDetails(data: Object): void {
    this.getLocationStopDetails().then((details) => {
      let saveData = [];

      if (typeof(details) != "undefined") {
        saveData = JSON.parse(details);
      }
      
      saveData.push(data);

      let newData = JSON.stringify(saveData);
      this.storage.set('locationDetails', newData);
    });
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
