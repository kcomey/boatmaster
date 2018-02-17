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
  index: number;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, 
    public dataService: DataLocationProvider, public platform: Platform) {
      this.data = navParams.get('data');

      this.mooringDetailsForm = formBuilder.group({
        name: [this.data.name],
        lat: [this.data.lat],
        lng: [this.data.lng],
        type: [this.data.type],
        cost: [this.data.cost],
        depth: [this.data.depth],
        arrive: [this.data.arrive || this.today],
        depart: [this.data.depart],
        hours: [this.data.hours],
        miles: [this.data.miles],
        cameFrom: [this.data.cameFrom],
        notes: [this.data.notes],
        today: [this.data.today || this.today],
        typeDive: [this.data.typeDive],
        image: [this.data.image],
        category: [this.data.category],
        index: [this.data.index]
      });
  }

  ionViewDidLoad() {
    if(this.data.category == "mooring") {
      this.mooring = true;
    }
  }

  cancelModal() {
    this.viewCtrl.dismiss(); 
  }

  saveModal() {
    let data = this.mooringDetailsForm.value;
    this.viewCtrl.dismiss(data); 
  }


}
