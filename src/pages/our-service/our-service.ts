import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';

@IonicPage()
@Component({
  selector: 'page-our-service',
  templateUrl: 'our-service.html',
})
export class OurServicePage {

  constructor(public navCtrl: NavController, public view: ViewController) {
  }
Sign(){
  this.navCtrl.push(SignUpPage);
}
  closeService(){
    this.view.dismiss();
  }

}
