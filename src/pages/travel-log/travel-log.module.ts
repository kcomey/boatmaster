import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TravelLogPage } from './travel-log';

@NgModule({
  declarations: [
    TravelLogPage,
  ],
  imports: [
    IonicPageModule.forChild(TravelLogPage),
  ],
})
export class TravelLogPageModule {}
