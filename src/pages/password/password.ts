import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController,ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
  public form : FormGroup;
  public loading: any;
  private baseURI :string = "http://jipange.co.tz/website/api";
  public change : any = [];

  constructor( public http : Http, private formBuilder: FormBuilder, public navCtrl: NavController,  public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.form = this.formBuilder.group({
        username: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*')])],
    });
  }


changePass(){
  let
      username  : string   = this.form.controls["username"].value;
      this.showLoader();
     this.chPass(username);
    this.loading.dismiss();
}
     chPass(username){
  let  user         : any = {"username":username,"type":"300"},
       headers      : any      = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}),
       change_api   : any     = {"api":"105","code":"112","device_id":"1234568","data":user},
       options      : any     = new RequestOptions({ headers: headers }),
       url          : any      = this.baseURI ;

       this.http.post(url,change_api,options).map(res => res.json())
         .subscribe(
           results => {
             if (results.code === 200) {
               this.change = results;
                console.log(this.change);
            this.sendNotification('Nywila mpya imetumwa kwenye namba yako ya simu!');
           this.navCtrl.setRoot(TabsPage);
             }
              else{
                this.change = results;
                 console.log(this.change);
              this.sendNotification('Namba ya simu sio sahihi!!');
              }
            });
     }
     sendNotification(message)  : void
        {
           let notification = this.toastCtrl.create({
               message       : message,
               duration      : 5000
           });
           notification.present();
        }
         showLoader(){
       this.loading = this.loadingCtrl.create({
           content: 'Hakikisha...'
       });

       this.loading.present();
     }
}
