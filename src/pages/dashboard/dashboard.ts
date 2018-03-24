import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';

/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController,public menu:MenuController) {
  }

  ionViewDidEnter() {
          this.menu.enable(true, 'admin');
    }

}
