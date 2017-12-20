import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLocationProvider } from '../../providers/data-location/data-location';



@IonicPage()
@Component({
  selector: 'page-boat-details',
  templateUrl: 'boat-details.html',
})
export class BoatDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, 
    public dataService: DataLocationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BoatDetailsPage');
  }

  saveForm(): void {
    
  }

}