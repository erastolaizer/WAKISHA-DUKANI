import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OurServicePage } from './our-service';

@NgModule({
  declarations: [
    OurServicePage,
  ],
  imports: [
    IonicPageModule.forChild(OurServicePage),
  ],
})
export class OurServicePageModule {}
