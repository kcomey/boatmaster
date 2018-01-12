import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RunningBudgetTotalPage } from './running-budget-total';

@NgModule({
  declarations: [
    RunningBudgetTotalPage,
  ],
  imports: [
    IonicPageModule.forChild(RunningBudgetTotalPage),
  ],
})
export class RunningBudgetTotalPageModule {}
