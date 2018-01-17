import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RunningBudgetEntryPage } from './running-budget-entry';

@NgModule({
  declarations: [
    RunningBudgetEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(RunningBudgetEntryPage),
  ],
})
export class RunningBudgetEntryPageModule {}
