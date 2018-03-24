import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { SMS } from '@ionic-native/sms';
import { ChangePassPage } from '../change-pass/change-pass';
import { TabsPage } from '../tabs/tabs';
import 'rxjs/add/operator/map';




@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
public mess:FormGroup;
public logu : any =[] ;
public loguser : any =[] ;
public logkey :any = [] ;
private baseURI :string = "http://jipange.co.tz/website/api" ;

  constructor(public http:Http, public storage:Storage, public fb:FormBuilder,public sms:SMS, private toastCtrl: ToastController, public navCtrl: NavController) {
this.mess= this.fb.group({
        name: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*')])],
        txt: ['', Validators.required],
    });
  }
  ionViewWillEnter(){

    this.storage.get('user_data').then((val) => {
      this.loguser = val.user_details ;
      this.logkey = val.key ;
    });
  }


  sendTextMessage() {
    let   name  : string   = this.mess.controls["name"].value,
          txt  : string   = this.mess.controls["txt"].value;

         this.sms.send(name,txt).then((result) => {
        let successToast = this.toastCtrl.create({

          message: "Umefanikiwa kutuma ujumbe!",
          duration: 3000
        })
        successToast.present();
        this.mess.reset();
      }, (error) => {
        let errorToast = this.toastCtrl.create({

          message: "Ujumbe haujatumwa",
          duration: 3000
        })
        errorToast.present();
      });
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
