import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationHomePage } from './location-home';

@NgModule({
  declarations: [
    LocationHomePage,
  ],
  imports: [
    IonicPageModule.forChild(LocationHomePage),
  ],
})
export class LocationHomePageModule {}
