import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-travel-log',
  templateUrl: 'travel-log.html',
})
export class TravelLogPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelLogPage');
  }

  showMooringDetail(whichmooring) {
    // this.platform.ready().then(() => {
    //   this.dataService.getMooringDetails().then((details) => {
    //     let savedDetails: any = false;

    //     if(details && typeof(details) != "undefined") {
    //       savedDetails = JSON.parse(details);
    //     }

    //     let formControls: any = this.mooringDetailsForm.controls;

    //     if(savedDetails) {
    //       formControls.name.setValue(savedDetails.name);
    //       formControls.lat.setValue(savedDetails.lat);
    //       formControls.lng.setValue(savedDetails.lng);
    //       formControls.type.setValue(savedDetails.type);
    //       formControls.cost.setValue(savedDetails.cost);
    //       formControls.depth.setValue(savedDetails.depth);
    //       formControls.arrive.setValue(savedDetails.arrive);
    //       formControls.depart.setValue(savedDetails.depart);
    //       formControls.hours.setValue(savedDetails.hours);
    //       formControls.cameFrom.setValue(savedDetails.cameFrom);
    //       formControls.notes.setValue(savedDetails.notes);
    //     }
    //   });
    // });
  }

}
