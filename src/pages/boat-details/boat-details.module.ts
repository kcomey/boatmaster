import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoatDetailsPage } from './boat-details';

@NgModule({
  declarations: [
    BoatDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BoatDetailsPage),
  ],
})
export class BoatDetailsPageModule {}
