import { Component } from '@angular/core';
import { NavController, ModalController,PopoverController} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { OurServicePage } from '../our-service/our-service';
import { OurDirectionPage } from '../our-direction/our-direction';
import { SignUpPage } from '../sign-up/sign-up';
import { AdminLoginPage } from '../admin-login/admin-login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public pop:PopoverController, public modal: ModalController,public navCtrl: NavController) {

  }

manage(){
  this.navCtrl.push(AdminLoginPage);
}
login(){
  this.navCtrl.push(LoginPage);
}

signUp(){
  this.navCtrl.push(SignUpPage);
}

Direction(){
    let popup = this.pop.create(OurDirectionPage);
     popup.present();
      }

  Service(){
      let popup = this.pop.create(OurServicePage);
     popup.present();
      }
}
