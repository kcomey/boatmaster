import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RunningBudgetDetailPage } from './running-budget-detail';

@NgModule({
  declarations: [
    RunningBudgetDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RunningBudgetDetailPage),
  ],
})
export class RunningBudgetDetailPageModule {}
