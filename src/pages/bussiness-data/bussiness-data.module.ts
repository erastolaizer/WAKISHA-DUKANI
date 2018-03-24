import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BussinessDataPage } from './bussiness-data';

@NgModule({
  declarations: [
    BussinessDataPage,
  ],
  imports: [
    IonicPageModule.forChild(BussinessDataPage),
  ],
})
export class BussinessDataPageModule {}
