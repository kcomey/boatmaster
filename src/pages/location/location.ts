import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalController, App, IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { DataLocationProvider } from '../../providers/data-location/data-location';
import { HomePage } from '../home/home';
import { MooringDetailsPage } from '../mooring-details/mooring-details';


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

  constructor(public modalCtrl: ModalController, public app: App, public navCtrl: NavController, public maps: GoogleMapsProvider, public platform: Platform, 
    public dataService: DataLocationProvider, public alertCtrl: AlertController, public geolocation: Geolocation, public navParams: NavParams) {
  }

  ionViewDidLoad(): void {
    this.platform.ready().then(() => {
      this.dataService.getLocationStopDetails().then((location) => {
        let savedLocation: any;

        console.log('saved ' + typeof(location));
        if (typeof(location) != "undefined") {
          savedLocation = JSON.parse(location);
          console.log('saved 2 ' + typeof(savedLocation));
        }

        let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {
          if (savedLocation) {
            console.log('saved ' + typeof(savedLocation));
            console.log(savedLocation);
            let index = savedLocation.length - 1;

            this.latitude = savedLocation[index].latitude;
            this.longitude = savedLocation[index].longitude;
            this.image = savedLocation[index].image;
            console.log('are we going to change?');
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

      //this.dataService.setLocation(data);

      let prompt = this.modalCtrl.create(MooringDetailsPage, { data: data });
      prompt.onDidDismiss(data => {
        data.image = this.image;
        data.category = 'mooring';

        this.dataService.setLocationStopDetails(data);
      });
      prompt.present();
    });
  }

  setDivingLocation(): void {
    console.log('set for diving');
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

      //this.dataService.setLocation(data);

      let prompt = this.modalCtrl.create(MooringDetailsPage, { data: data });
      prompt.onDidDismiss(data => {
        data.image = this.image;
        data.category = 'mooring';

        this.dataService.setLocationStopDetails(data);
      });
      prompt.present();
    });
  }
}
