import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalController, App, IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { DataLocationProvider } from '../../providers/data-location/data-location';
import { HomePage } from '../home/home';
import { MooringDetailsPage } from '../mooring-details/mooring-details';
import { detachEmbeddedView } from '@angular/core/src/view/view_attach';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  tab1Root: any = HomePage;

  latitude: number;
  longitude: number;
  image: string;
  index: number;

  constructor(public storage: Storage, public modalCtrl: ModalController, public app: App, public navCtrl: NavController, public maps: GoogleMapsProvider, public platform: Platform, 
    public dataService: DataLocationProvider, public alertCtrl: AlertController, public geolocation: Geolocation, public navParams: NavParams) {
  }

  ionViewDidLoad(): void {
    this.platform.ready().then(() => {
      this.dataService.getLocationStopDetails().then((locations) => {
        if (locations != null) {
          this.index = locations.details.length - 1;
          return locations.details[this.index];
        }
      }).then((recent) => {
        console.log('recent is ' + recent.lat);
        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
          if (recent) {
            this.latitude = recent.lat;
            this.longitude = recent.lng;
            this.image = recent.image;
            this.maps.changeMarker(this.latitude, this.longitude, this.image);
          }
        });
      });
    });
  }

  setMooringLocation(): void {
    this.geolocation.getCurrentPosition().then((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.image = 'assets/imgs/harbor.png';

      this.maps.changeMarker(position.coords.latitude, position.coords.longitude, this.image);

      let data = {
        latitude: this.latitude,
        longitude: this.longitude,
        image: this.image,
        category: 'mooring'
      };

      let prompt = this.modalCtrl.create(MooringDetailsPage, { data: data });
      prompt.onDidDismiss(data => {
        if (data) {
          data.image = this.image;
          data.category = 'mooring';
          this.dataService.getLocationStopDetails().then((locations) => {
            if (locations != null) {
              locations.details.push(data);
              this.dataService.setLocationStopDetails(locations);
            }
            else {
              let saveData = { details: [data] };
              this.dataService.setLocationStopDetails(saveData);
            }
          });
        }
        else {
          console.log('data is cancelled');
        }  
      });
      prompt.present();
    });
  }

  setDivingLocation(): void {
    this.geolocation.getCurrentPosition().then((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.image = 'assets/imgs/scubadiving.png';

      this.maps.changeMarker(position.coords.latitude, position.coords.longitude, this.image);

      let data = {
        latitude: this.latitude,
        longitude: this.longitude,
        image: this.image,
        category: 'diving'
      };

      let prompt = this.modalCtrl.create(MooringDetailsPage, { data: data });
      prompt.onDidDismiss(data => {
        data.image = this.image;
        data.category = 'diving';

        this.dataService.getLocationStopDetails().then((locations) => {
          if (locations != null) {
            locations.details.push(data);
            this.dataService.setLocationStopDetails(locations);
          }
          else {
            let saveData = { details: [data] };
            this.dataService.setLocationStopDetails(saveData);
          }
        });
      });
    prompt.present();
  });
}

}
