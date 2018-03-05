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
      this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement)
    });
  }

  addMooringLocation(): void {
    //For adding manually when offline
    this.image = 'assets/imgs/harbor.png';

    let data = {
      image: this.image,
      category: 'mooring',
    };

    let prompt = this.modalCtrl.create(MooringDetailsPage, { data: data });
    prompt.onDidDismiss(data => {
      if (data) {
        data.image = 'assets/imgs/harbor.png';
        data.category = 'mooring';
        this.maps.addMarkerManually(data);

        let prompt = this.alertCtrl.create({
          title: 'Mooring Location Added',
          buttons: [
            {
              text: 'OK',
            }
          ]
        });
        prompt.present();
      }
      else {
        console.log('data is cancelled 2');
        let prompt = this.alertCtrl.create({
          title: 'Cancelled - Mooring Location NOT Added',
          buttons: [
            {
              text: 'OK',
            }
          ]
        });
        prompt.present();
      }  


    });
    prompt.present();
  }

  setMooringLocation(): void {
    this.geolocation.getCurrentPosition().then((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.image = 'assets/imgs/harbor.png';

      let data = {
        lat: this.latitude,
        lng: this.longitude,
        image: this.image,
        category: 'mooring',
      };

      let prompt = this.modalCtrl.create(MooringDetailsPage, { data: data });
      prompt.onDidDismiss(data => {
        if (data) {
          data.image = this.image;
          data.category = 'mooring';
          
          this.maps.addMarker(data);
        }
        else {
          console.log('data is cancelled 2');
        }  
      });
      prompt.present();
    });
  }

  addDivingLocation(): void {
    //For adding dive location manually when offline
    this.image = 'assets/imgs/scubadiving.png';

    let data = {
      image: this.image,
      category: 'diving',
    };

    let prompt = this.modalCtrl.create(MooringDetailsPage, { data: data });
    prompt.onDidDismiss(data => {
      if (data) {
        data.image = 'assets/imgs/scubadiving.png';
        data.category = 'diving';
        this.maps.addMarkerManually(data);

        let prompt = this.alertCtrl.create({
          title: 'Diving Site Added',
          buttons: [
            {
              text: 'OK',
            }
          ]
        });
        prompt.present();
      }
      else {
        console.log('data is cancelled 2');
        let prompt = this.alertCtrl.create({
          title: 'Cancelled - Diving Site NOT Added',
          buttons: [
            {
              text: 'OK',
            }
          ]
        });
        prompt.present();
      }  


    });
    prompt.present();
  }

  setDivingLocation(): void {
    this.geolocation.getCurrentPosition().then((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.image = 'assets/imgs/scubadiving.png';

      let data = {
        lat: this.latitude,
        lng: this.longitude,
        image: this.image,
        category: 'diving'
      };

      let prompt = this.modalCtrl.create(MooringDetailsPage, { data: data });
      prompt.onDidDismiss(data => {
        data.image = this.image;
        data.category = 'diving';

        this.maps.addMarker(data);
      });
    prompt.present();
  });
}

}
