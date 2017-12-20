import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MooringDetailsPage } from './mooring-details';

@NgModule({
  declarations: [
    MooringDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MooringDetailsPage),
  ],
})
export class MooringDetailsPageModule {}
