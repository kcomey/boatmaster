import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationPage } from '../location/location';
import { BoatDetailsPage } from '../boat-details/boat-details';
import { MooringDetailsPage } from '../mooring-details/mooring-details';


@IonicPage()
@Component({
  selector: 'page-location-home',
  templateUrl: 'location-home.html',
})
export class LocationHomePage {
  tab1Root: any = LocationPage;
  tab2Root: any = BoatDetailsPage;
  tab3Root: any = MooringDetailsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationHomePage');
  }

}
