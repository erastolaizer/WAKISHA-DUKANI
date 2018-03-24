import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobDataPage } from './job-data';

@NgModule({
  declarations: [
    JobDataPage,
  ],
  imports: [
    IonicPageModule.forChild(JobDataPage),
  ],
})
export class JobDataPageModule {}
