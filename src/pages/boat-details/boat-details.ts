import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLocationProvider } from '../../providers/data-location/data-location';


@IonicPage()
@Component({
  selector: 'page-boat-details',
  templateUrl: 'boat-details.html',
})
export class BoatDetailsPage {
  boatDetailsForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, 
    public dataService: DataLocationProvider, public platform: Platform) {
      this.boatDetailsForm = formBuilder.group({
        name: [''],
        draft: [''],
        beam: [''],
        clearance: [''],
        fuelDiesel: [''],
        fuelGas: [''],
        water: [''],
        waste: ['']
      })
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.dataService.getBoatDetails().then((details) => {
        let savedDetails: any = false;

        if(details && typeof(details) != "undefined") {
          savedDetails = JSON.parse(details);
        }

        let formControls: any = this.boatDetailsForm.controls;

        if(savedDetails) {
          formControls.name.setValue(savedDetails.name);
          formControls.draft.setValue(savedDetails.draft);
          formControls.beam.setValue(savedDetails.beam);
          formControls.clearance.setValue(savedDetails.clearance);
          formControls.fuelDiesel.setValue(savedDetails.fuelDiesel);
          formControls.fuelGas.setValue(savedDetails.fuelGas);
          formControls.water.setValue(savedDetails.water);
          formControls.waste.setValue(savedDetails.waste);
        }
      });
    });
  }

  saveForm(): void {
    let data = this.boatDetailsForm.value;
    this.dataService.setBoatDetails(data);
  }

}
