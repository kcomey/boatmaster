import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ConnectivityProvider } from '../connectivity/connectivity';
import { Geolocation } from '@ionic-native/geolocation';
import { DataLocationProvider } from '../../providers/data-location/data-location';

declare var google: any;

@Injectable()
export class GoogleMapsProvider {
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string = "AIzaSyAAI4mkeLGp_r70UQIuYK_9o4s4tMg8BS8";

  constructor(public dataService: DataLocationProvider, public connectivityService: ConnectivityProvider, public geolocation: Geolocation) {
    
  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();
  }

  loadGoogleMaps(): Promise<any> {
    return new Promise((resolve) => {
    if(typeof google == "undefined" || typeof google.maps == "undefined"){
      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if(this.connectivityService.isOnline()){
          window['mapInit'] = () => {
          this.initMap().then(() => {
          resolve(true);
      });

      this.enableMap();
    }
    
      let script = document.createElement("script");
      script.id = "googleMaps";
        if(this.apiKey){
          script.src = 'http://maps.google.com/maps/api/js?key=' +
          this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }
      document.body.appendChild(script);
    }
    } else {
        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }
    }

      this.addConnectivityListeners();
    });
  }

  initMap(): Promise<any> {
    this.mapInitialised = true;

      return new Promise((resolve) => {
        this.dataService.getLocationStopDetails().then((locations) => {
          if (locations != null) {
            let index = locations.length - 1;
            return locations[index];
          }
        }).then((currentMarker) => {
          console.log('current marker is ' + currentMarker)
          this.geolocation.getCurrentPosition().then((position) => {
            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            
            if (currentMarker) {
              latLng = new google.maps.LatLng(currentMarker.lat, currentMarker.lng);
            }

            let mapOptions = {
              center: latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.TERRAIN
            }

            this.map = new google.maps.Map(this.mapElement, mapOptions);
        
            if (currentMarker) {
              let marker = new google.maps.Marker({
                map: this.map,
                animation: 'DROP',
                position: latLng,
                icon: currentMarker.image,
                draggable:true
              });

              google.maps.event.addListener(marker, 'dragend', (e) => {
                let position = marker.getPosition();
                this.updateMarker(position);
              });
            }
            
            resolve(true);
          });
        });
      });
  }

  disableMap(): void {
    if(this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }
  }

  enableMap(): void {
    if(this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }
  }

  addConnectivityListeners(): void {
    this.connectivityService.watchOnline().subscribe(() => {
      console.log("online");

      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        }
        else {
          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap()
        }
      }, 2000);
    });

    this.connectivityService.watchOffline().subscribe(() => {
      console.log("offline");

      this.disableMap();
    });
  }

  changeMarker(lat: number, lng: number, image): void {
    let latLng = new google.maps.LatLng(lat, lng);
    console.log('getting to change marker?')

    let marker = new google.maps.Marker({
      map: this.map,
      animation: 'DROP',
      position: latLng,
      icon: image
    });

    if (this.currentMarker) {
     this.currentMarker.setMap(null);
    }

    this.currentMarker = marker;
  }

  updateMarker(position) {
    this.dataService.getLocationStopDetails().then((locations) => {
      if (locations != null) {
        let index = locations.length - 1;
        locations[index].lat = position.lat();
        locations[index].lng = position.lng();
        this.dataService.setLocationStopDetails(locations);
      }
    })
  }

}


