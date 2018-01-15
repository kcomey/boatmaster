import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArchiveCategoryDetailPage } from './archive-category-detail';

@NgModule({
  declarations: [
    ArchiveCategoryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ArchiveCategoryDetailPage),
  ],
})
export class ArchiveCategoryDetailPageModule {}
