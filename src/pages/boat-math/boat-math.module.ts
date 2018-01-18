import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoatMathPage } from './boat-math';

@NgModule({
  declarations: [
    BoatMathPage,
  ],
  imports: [
    IonicPageModule.forChild(BoatMathPage),
  ],
})
export class BoatMathPageModule {}
