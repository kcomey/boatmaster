import { Component } from '@angular/core';
import { ViewController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLocationProvider } from '../../providers/data-location/data-location';


@IonicPage()
@Component({
  selector: 'page-mooring-details',
  templateUrl: 'mooring-details.html',
})
export class MooringDetailsPage {
  mooringDetailsForm: FormGroup;
  today: any = new Date().toISOString().slice(0,16);
  data: any;
  mooring: boolean = false;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, 
    public dataService: DataLocationProvider, public platform: Platform) {
      this.data = navParams.get('data');

      this.mooringDetailsForm = formBuilder.group({
        name: [''],
        lat: [this.data.latitude],
        lng: [this.data.longitude],
        type: [''],
        cost: [''],
        depth: [''],
        arrive: [this.today],
        depart: [''],
        hours: [''],
        cameFrom: [''],
        notes: [''],
        today: [this.today],
        typeDive: ['']
      });
  }

  ionViewDidLoad() {
    if(this.data.category == "mooring") {
      this.mooring = true;
    }
  }

  closeModal() {
    let data = this.mooringDetailsForm.value;
    this.viewCtrl.dismiss(data); 
  }


}
