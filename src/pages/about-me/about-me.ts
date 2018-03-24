import { Component } from '@angular/core';
import { IonicPage, NavController,PopoverController, MenuController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile';
import { ChangePassPage } from '../change-pass/change-pass';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-about-me',
  templateUrl: 'about-me.html',
})
export class AboutMePage {
 public logu : any =[] ;
public logkey :any = [] ;
 public prof:any  =[];
 public profile :any = [];
 private baseURI :string = "http://jipange.co.tz/website/api" ;

  constructor(public menu:MenuController,public pop:PopoverController,public http:Http, public storage:Storage, public navCtrl: NavController) {
  }

ionViewDidEnter() {
        this.menu.enable(true, 'user');
      }
  ionViewWillEnter(){

    this.storage.get('user_data').then((val) => {
        this.logkey = val.key ;
        this.logu  = val.user_details;

      let headers      : any   = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}),
         key           : any   = this.logkey,
         profile_api     : any   = {"api":"108","code":"107","type":"300","device_id":"1234568","key":key},
         options       : any   = new RequestOptions({ headers: headers }),
         url           : any   = this.baseURI ;

       this.http.post(url,profile_api, options).map(res => res.json())
         .subscribe(
           data => {
               this.profile = data;
               this.prof= this.profile.profile;
               console.log(this.profile);
              console.log(this.prof);

         });

    });
  }
changePro(){
  this.navCtrl.push(ProfilePage);
}


    logout(){
    this.storage.get('user_data').then((val) => {
        this.logkey = val.key ;
        this.logu  = val.user_details;

      let headers      : any   = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}),
         key           : any   = this.logkey,
         profile_api     : any   = {"api":"105","code":"101","type":"300","device_id":"12345678","key":key},
         options       : any   = new RequestOptions({ headers: headers }),
         url           : any   = this.baseURI ;

       this.http.post(url,profile_api, options).map(res => res.json())
         .subscribe(
           data => {
               this.navCtrl.setRoot(TabsPage);
         });
    });
  }

  pass(){
  this.navCtrl.push(ChangePassPage);
}

}
