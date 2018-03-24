import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  constructor(public navCtrl: NavController) {
  }

  Sign(){
    this.navCtrl.push(SignUpPage);
  }
}
