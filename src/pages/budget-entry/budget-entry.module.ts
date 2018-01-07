import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BudgetEntryPage } from './budget-entry';

@NgModule({
  declarations: [
    BudgetEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(BudgetEntryPage),
  ],
})
export class BudgetEntryPageModule {}
