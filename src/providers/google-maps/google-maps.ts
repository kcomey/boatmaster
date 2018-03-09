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
  apiKey: string = "AIzaSyAAI4mkeLGp_r70UQIuYK_9o4s4tMg8BS8";

  constructor(public dataService: DataLocationProvider, public connectivityService: ConnectivityProvider, public geolocation: Geolocation) {
 
  }

  init(mapElement: any, pleaseConnect: any, travelView: boolean, marker: any): Promise<any> {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps(travelView, marker);
  }

  loadGoogleMaps(travelView, marker): Promise<any> {
    return new Promise((resolve) => {
    if(typeof google == "undefined" || typeof google.maps == "undefined"){
      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if(this.connectivityService.isOnline()){
          window['mapInit'] = () => {
          this.initMap(travelView, marker).then(() => {
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
          this.initMap(travelView, marker);
          this.enableMap();
        }
        else {
          this.disableMap();
        }
    }
      this.addConnectivityListeners();
    });
  }

  initMap(travelView, marker): Promise<any> {
    return new Promise((resolve) => {
      if (travelView) {
        let latLng = new google.maps.LatLng(marker.lat, marker.lng);

        let mapOptions = {
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.TERRAIN,
          center: latLng
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);

        this.mapInitialised = true;

        let markerToAdd = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          draggable: true,
          position: latLng,
          icon: marker.icon,
          category: marker.category,
          id: marker.id
        });
  
        google.maps.event.addListener(markerToAdd, 'dragend', (e) => {
          let position = markerToAdd.getPosition();
          this.updateMarker(position, markerToAdd);
        });

        google.maps.event.addListener(markerToAdd, 'click', () => {
          let infoWindow = new google.maps.InfoWindow({
            content: marker.name
          });
          infoWindow.open(this.map, markerToAdd);
        });
        resolve(true);
      }
      else {
        this.geolocation.getCurrentPosition().then((position) => {
          let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          let mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            center: latLng
          }

          this.map = new google.maps.Map(this.mapElement, mapOptions);

          this.mapInitialised = true;
          resolve(true);
        }).then(() => {
            this.dataService.getLocationStopDetails().then((locations) => {
                if (locations != null) {
                  this.addStoredMarkers(locations);
                }
              })
          });
        }
      });
  }

  addStoredMarkers(markers) {
    //Need to add this function
    //no need to get id or anything, just put on map
    markers.forEach(marker => {
      console.log('adding marker ' + marker.id + ' and ' + marker.icon);
      if (marker.lat && marker.lng) {
        let latLng = new google.maps.LatLng(marker.lat, marker.lng);

        let markerToAdd = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          draggable: true,
          position: latLng,
          icon: marker.icon,
          category: marker.category,
          id: marker.id
        });
  
        google.maps.event.addListener(markerToAdd, 'dragend', (e) => {
          let position = markerToAdd.getPosition();
          this.updateMarker(position, markerToAdd);
        });

        google.maps.event.addListener(markerToAdd, 'click', () => {
          let infoWindow = new google.maps.InfoWindow({
            content: marker.name
          });
          infoWindow.open(this.map, markerToAdd);
        });

      }
    });
  }

  addMarkerManually(data) {
    var markerToAdd;

    this.dataService.getLocationID().then((id) => {
      if (id == null) {
        id = 1;
      }

      if (data.id == undefined) {
        data.id = id;
        id++;
        this.dataService.setLocationID(id);
      }

      markerToAdd = {
        name: data.name,
        lat: data.lat,
        lng: data.lng,
        type: data.type,
        cost: data.cost,
        depth: data.depth,
        arrive: data.arrive,
        depart: data.depart,
        hours: data.hours,
        miles: data.miles,
        cameFrom: data.cameFrom,
        notes: data.notes,
        today: data.today,
        typeDive: data.typeDive,
        icon: data.image,
        category: data.category,
        id: data.id,
      };

      return this.dataService.getLocationStopDetails();
    }).then(function (locations) {
        if (locations != null) {
          locations.unshift(markerToAdd);
        }
        else {
          locations = [ markerToAdd ];
        }

        return locations;
    }).then((locations) => {
      this.saveLocation(locations);
    });
  }

  addMarker(data) {
    var markerToAdd;
    let latLng = new google.maps.LatLng(data.lat, data.lng);

    this.dataService.getLocationID().then((id) => {
      if (id == null) {
        id = 1;
      }

      if (data.id == undefined) {
        data.id = id;
        id++;
        this.dataService.setLocationID(id);
      }

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        draggable: true,
        position: latLng,
        icon: data.image,
        category: data.category,
        id: data.id
      });

      google.maps.event.addListener(marker, 'dragend', (e) => {
        let position = marker.getPosition();
        this.updateMarker(position, marker);
      });

      google.maps.event.addListener(markerToAdd, 'click', () => {
        let infoWindow = new google.maps.InfoWindow({
          content: marker.name
        });
        infoWindow.open(this.map, markerToAdd);
      });

      //Cannot have position, need to put in lat, lng seperate
      markerToAdd = {
        name: data.name,
        lat: data.lat,
        lng: data.lng,
        type: data.type,
        cost: data.cost,
        depth: data.depth,
        arrive: data.arrive,
        depart: data.depart,
        hours: data.hours,
        miles: data.miles,
        cameFrom: data.cameFrom,
        notes: data.notes,
        today: data.today,
        typeDive: data.typeDive,
        icon: data.image,
        category: data.category,
        id: data.id,
      };

      return this.dataService.getLocationStopDetails();
    }).then(function (locations) {
        if (locations != null) {
          locations.unshift(markerToAdd);
        }
        else {
          locations = [ markerToAdd ];
        }

        return locations;
    }).then((locations) => {
      this.saveLocation(locations);
    });
  }

  saveLocation(locations) {
    this.dataService.setLocationStopDetails(locations);
  }

  saveUpdatedMarker(locations, index, position) {
    console.log('array, position, id ' + locations + ' ' +  position + '  ' + index);

    let positionArray = position.split(',');
    console.log('lat is ' + positionArray[0]);
    console.log('lng is ' + positionArray[1]);
  }

  updateMarker(position, marker) { 
    // Promise.resolve(this.dataService.getLocationStopDetails()).then(function () {
    //   return Promise.resolve('bar');
    // }).then(function (result) {
    //   console.log(result);
    // });

    return new Promise((resolve) => {   
      this.dataService.getLocationStopDetails().then((locations) => {
        for (var i = 0; i < locations.length; i++) { 
          if (locations[i].id == marker.id) {
            let arrayID = i;
            return this.saveUpdatedMarker(locations, position, arrayID);
          }
        }
      });
      resolve(true);
    });

// let positionArray = position.split(',');
// console.log('lat is ' + positionArray[0]);
// console.log('lng is ' + positionArray[1]);
    // return new Promise((resolve) => {
    //   if(typeof google == "undefined" || typeof google.maps == "undefined"){
    //     console.log("Google maps JavaScript needs to be loaded.");
    //     this.disableMap();
  
    //     if(this.connectivityService.isOnline()){
    //         window['mapInit'] = () => {
    //         this.initMap().then(() => {
    //         resolve(true);
    //     });
  
    //     this.enableMap();
    //   }
    

        // let index = locations.length - 1;
        // locations[index].lat = position.lat();
        // locations[index].lng = position.lng();
        // this.dataService.setLocationStopDetails(locations);
      
   
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
          this.loadGoogleMaps(false, null);
        }
        else {
          if (!this.mapInitialised) {
            this.initMap(false, null);
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

  // // Removes the markers from the map, but keeps them in the array.
  // function clearMarkers() {
  //   setMapOnAll(null);
  // }

  // // Shows any markers currently in the array.
  // function showMarkers() {
  //   setMapOnAll(map);
  // }

  // // Deletes all markers in the array by removing references to them.
  // function deleteMarkers() {
  //   clearMarkers();
  //   markers = [];
  // }


  // changeMarker(lat: number, lng: number, image): void {
  //   let latLng = new google.maps.LatLng(lat, lng);

  //   let marker = new google.maps.Marker({
  //     map: this.map,
  //     animation: 'DROP',
  //     position: latLng,
  //     icon: image
  //   });

  //   this.currentMarker = marker;
  //   this.map.setCenter(marker.getPosition());
  //   marker.setMap(this.map);
  // }



}


