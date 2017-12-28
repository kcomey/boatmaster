import { Component, ElementRef, ViewChild } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { DataLocationProvider } from '../../providers/data-location/data-location';
import { HomePage } from '../home/home';


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

  constructor(public app: App, public navCtrl: NavController, public maps: GoogleMapsProvider, public platform: Platform, 
    public dataService: DataLocationProvider, public alertCtrl: AlertController, public geolocation: Geolocation, public navParams: NavParams) {
  }

  ionViewDidLoad(): void {
    this.platform.ready().then(() => {
      this.dataService.getLocation().then((location) => {
        let savedLocation: any = false;

        if (location && typeof(location) != "undefined") {
          savedLocation = JSON.parse(location);
        }

        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
          if (savedLocation) {
            this.latitude = savedLocation.latitude;
            this.longitude = savedLocation.longitude;

            this.maps.changeMarker(this.latitude, this.longitude);
          }
        });
      });
    });
  }

  goHome(): void {
    this.app.getRootNav().setRoot(HomePage);
  }


  setLocation(): void {
    this.geolocation.getCurrentPosition().then((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      this.maps.changeMarker(position.coords.latitude, position.coords.longitude);

      let data = {
        latitude: this.latitude,
        longitude: this.longitude
      };

      this.dataService.setLocation(data);

      let alert = this.alertCtrl.create({
        title: 'Location set!',
        buttons: [{text: 'OK'}]
      });

      alert.present();
    });
  }

}
