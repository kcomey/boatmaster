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

  //marker.setMap(null);

  // var mapOptions = {
  //   center: latLng,
  //   zoom: 15,
  //   mapTypeId: google.maps.MapTypeId.ROADMAP
  // };

  // map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // //Wait until the map is loaded
  // google.maps.event.addListenerOnce(map, 'idle', function(){

  //   //Load the markers
  //   loadMarkers();

  // function loadMarkers(){
 
  //   //Get all of the markers from our Markers factory
  //   Markers.getMarkers().then(function(markers){

  //     console.log("Markers: ", markers);

  //     var records = markers.data.result;

  //     for (var i = 0; i < records.length; i++) {

  //       var record = records[i];  
  //       var markerPos = new google.maps.LatLng(record.lat, record.lng);

  //       // Add the markerto the map
  //       var marker = new google.maps.Marker({
  //           map: map,
  //           animation: google.maps.Animation.DROP,
  //           position: markerPos
  //       });

  //       var infoWindowContent = "<h4>" + record.name + "</h4>";         

  //       addInfoWindow(marker, infoWindowContent, record);

  //     }


       

       

//   // addInfoWindow(marker, content){
 
//   //   let infoWindow = new google.maps.InfoWindow({
//   //     content: content
//   //   });
   
//   //   google.maps.event.addListener(marker, 'click', () => {
//   //     infoWindow.open(this.map, marker);
//   //   });
   
//   // }

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
          //data.image = this.image;
          //data.category = 'mooring';

          this.dataService.getLocationStopDetails().then((locations) => {
            if (locations != null) {
              data.id = locations.length + 1;
              locations.unshift(data);
              this.dataService.setLocationStopDetails(locations);
            }
            else {
              data.id = 1;
              let saveData = [ data ];
              this.dataService.setLocationStopDetails(saveData);
            }

            this.maps.addMarker(data);
          });
        }
        else {
          console.log('data is cancelled 2');
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

      //this.maps.changeMarker(position.coords.latitude, position.coords.longitude, this.image);

      let data = {
        latitude: this.latitude,
        longitude: this.longitude,
        image: this.image,
        category: 'diving',
        animation: 'DROP',
        draggable:true
      };

      let prompt = this.modalCtrl.create(MooringDetailsPage, { data: data });
      prompt.onDidDismiss(data => {
        //data.image = this.image;
        //data.category = 'diving';

        this.dataService.getLocationStopDetails().then((locations) => {
          var remove;
          if (locations != null) {
            //Need to grab the one to remove from map
            remove = locations.pop();
            //then put it back in array
            locations.unshift(remove);
            locations.unshift(data);
            this.dataService.setLocationStopDetails(locations);
          }
          else {
            let saveData = [ data ];
            this.dataService.setLocationStopDetails(saveData);
          }

          this.maps.changeMarker(data.lat, data.lng, data.image);
        });
      });
    prompt.present();
  });
}

}
