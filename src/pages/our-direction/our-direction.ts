import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-our-direction',
  templateUrl: 'our-direction.html',
})
export class OurDirectionPage {

  constructor(public navCtrl: NavController, public view:ViewController) {
  }

  Sign(){
    this.navCtrl.push(SignUpPage);
  }

  closeDirection()
  {
    this.view.dismiss();
  }
}
