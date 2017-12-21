import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLocationProvider } from '../../providers/data-location/data-location';


@IonicPage()
@Component({
  selector: 'page-mooring-details',
  templateUrl: 'mooring-details.html',
})
export class MooringDetailsPage {
  mooringDetailsForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, 
    public dataService: DataLocationProvider, public platform: Platform) {
      this.mooringDetailsForm = formBuilder.group({
        name: [''],
        lat: [''],
        lng: [''],
        type: [''],
        cost: [''],
        depth: [''],
        arrive: [''],
        depart: [''],
        hours: [''],
        cameFrom: [''],
        notes: ['']
      });
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.dataService.getMooringDetails().then((details) => {
        let savedDetails: any = false;

        if(details && typeof(details) != "undefined") {
          savedDetails = JSON.parse(details);
        }

        let formControls: any = this.mooringDetailsForm.controls;

        if(savedDetails) {
          formControls.name.setValue(savedDetails.name);
          formControls.lat.setValue(savedDetails.lat);
          formControls.lng.setValue(savedDetails.lng);
          formControls.type.setValue(savedDetails.type);
          formControls.cost.setValue(savedDetails.cost);
          formControls.depth.setValue(savedDetails.depth);
          formControls.arrive.setValue(savedDetails.arrive);
          formControls.depart.setValue(savedDetails.depart);
          formControls.hours.setValue(savedDetails.hours);
          formControls.cameFrom.setValue(savedDetails.cameFrom);
          formControls.notes.setValue(savedDetails.notes);
        }
      });
    });
  }

  saveForm(): void {
    let data = this.mooringDetailsForm.value;
    this.dataService.setMooringDetails(data);
  }

}
