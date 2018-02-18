import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { DataLocationProvider } from '../../providers/data-location/data-location';
import { MooringDetailsPage } from '../mooring-details/mooring-details';
import { JsonPipe } from '@angular/common/src/pipes/json_pipe';
import { HashLocationStrategy } from '@angular/common';
import { ItemSliding } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-travel-log',
  templateUrl: 'travel-log.html',
})
export class TravelLogPage {
  locations: any;

  constructor(public modalCtrl: ModalController, public platform: Platform, public dataService: DataLocationProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.dataService.getLocationStopDetails().then((locations) => {
        if (locations != null) {
          this.locations = locations;
        }
      });
    });
  }

  removeLocation(data, slidingItem: ItemSliding) {
    let index = this.locations.indexOf(data);
    if (index > -1) {
      this.locations.splice(index, 1);
      console.log(this.locations);
      this.dataService.setLocationStopDetails(this.locations);
      this.ionViewDidLoad();
    }
    slidingItem.close();
  }

  showOnMap(data) {
    console.log('show the map page with this marker');
  }

  showLocation(data) {
    //Also allows for editing
    data.index = this.locations.indexOf(data);
    let prompt = this.modalCtrl.create(MooringDetailsPage, { data: data });
    prompt.onDidDismiss(data => {
      if (data) {
        this.dataService.getLocationStopDetails().then((locations) => {
          return locations;
        }).then((locations) => {
          if (locations != null) {
     
              if (data.index > -1) {
                //Replace with new data
                locations[data.index] = data;
                return this.dataService.setLocationStopDetails(locations);
              }
          }
        }).then(() => {
          this.ionViewDidLoad();
        }); 
      }
      else {
        console.log('data is cancelled');
      }
    });
    prompt.present();
  }
   
}
