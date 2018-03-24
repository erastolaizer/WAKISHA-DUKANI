import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdeaDataPage } from './idea-data';

@NgModule({
  declarations: [
    IdeaDataPage,
  ],
  imports: [
    IonicPageModule.forChild(IdeaDataPage),
  ],
})
export class IdeaDataPageModule {}
