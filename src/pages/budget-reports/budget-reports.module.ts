import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BudgetReportsPage } from './budget-reports';

@NgModule({
  declarations: [
    BudgetReportsPage,
  ],
  imports: [
    IonicPageModule.forChild(BudgetReportsPage),
  ],
})
export class BudgetReportsPageModule {}
