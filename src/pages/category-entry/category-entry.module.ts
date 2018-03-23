import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryEntryPage } from './category-entry';

@NgModule({
  declarations: [
    CategoryEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryEntryPage),
  ],
})
export class CategoryEntryPageModule {}
