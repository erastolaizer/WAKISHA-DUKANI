import { Component,ViewChild } from '@angular/core';
import { Platform , Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProfilePage } from '../pages/profile/profile';
import { MessagePage } from '../pages/message/message';
import { LookJobPage } from '../pages/look-job/look-job';
import { OpenBussPage } from '../pages/open-buss/open-buss';
import { ExpandBussPage } from '../pages/expand-buss/expand-buss';
import { AboutMePage } from '../pages/about-me/about-me';
import { TabsPage } from '../pages/tabs/tabs';
import { DashboardPage } from '../pages/dashboard/dashboard';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
@ViewChild(Nav) nav:Nav;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  profile(Page){
      this.nav.setRoot(ProfilePage);
    }

  message(){
      this.nav.setRoot(MessagePage);
    }

  expand(){
        this.nav.setRoot(ExpandBussPage);
      }

  openbus(){
        this.nav.setRoot(OpenBussPage);
      }

    job(){
        this.nav.setRoot(LookJobPage);
    }

  aboutMe(){
      this.nav.setRoot(AboutMePage);
    }
dashboard(){
      this.nav.setRoot(DashboardPage);
    }
  customer(){
      this.nav.setRoot(DashboardPage);
    }
    employer(){
      this.nav.setRoot(DashboardPage);
    }
    location(){
      this.nav.setRoot(DashboardPage);
    }
  }
