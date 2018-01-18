import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BoatMathPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boat-math',
  templateUrl: 'boat-math.html',
})
export class BoatMathPage {
  tripCost: boolean = false;
  boatRange: boolean = false;
  tripHeader: boolean = true;
  rangeHeader: boolean = true;
  miles: number;
  gph: number;
  speed: number;
  cost: number;
  tank: number;
  gph2: number;
  speed2: number;
  tripCostResult: number;
  boatRangeResult: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoatMathPage');
  }

  viewTripCost() {
    this.tripCost = !this.tripCost;
    this.rangeHeader = !this.rangeHeader;
  }

  viewBoatRange() {
    this.boatRange = !this.boatRange;
    this.tripHeader = ! this.tripHeader;
  }

  calcTrip() {
    let gpm = this.gph / this.speed;
    let gallonsNeeded = this.miles * gpm;
    this.tripCostResult = gallonsNeeded * this.cost;
  }

  calcRange() {
    let mpg = this.speed2 / this.gph2;
    this.boatRangeResult = mpg * (this.tank * .75);
  }

}
