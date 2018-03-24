import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController,IonicPage } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Http,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-change-pass',
  templateUrl: 'change-pass.html',
})
export class ChangePassPage {

  public change : FormGroup;
  public loading: any;
  private baseURI :string = "http://jipange.co.tz/website/api" ;
  public changeUser : any = [];
public logkey : any = [];
  constructor(private storage: Storage,public http : Http, private formBuilder: FormBuilder, public navCtrl: NavController, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.change = this.formBuilder.group({
      current_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
  }

  ionViewWillEnter(){

    this.storage.get('user_data').then((val) => {
      this.logkey = val.key ;
    });
  }

  password() {

       let   current_password : string    = this.change.controls["current_password"].value,
             new_password     : string   = this.change.controls["new_password"].value,
             confirm_password : string   = this.change.controls["confirm_password"].value;

            this.showLoader();

            if(new_password === confirm_password){
                  this.changePass(current_password,new_password);
            }
            else{
              this.sendNotification('Nywila mpya hazijafanana, rudia kwa usahihi');
            }

            this.loading.dismiss();
     }

   changePass(current_password,new_password){
             let headers     : any      = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}),
                 key         : any     = this.logkey,
                 pass        : any     = {"current_password":current_password,"new_password":new_password},
                 change_api  : any     = {"api":"105","code":"107", "type":"300","device_id":"12345678","data":pass,"key":key},
                 options    : any      = new RequestOptions({ headers: headers }),
                 url        : any      = this.baseURI ;

               this.http.post(url,change_api, options).map(res => res.json())
                 .subscribe(
                   results => {

                     if (results.code === 200) {
                       this.changeUser = results;
                        console.log(this.changeUser);
                        this.sendNotification("Umefanikiwa kubadlisha nywila");

                        //logging out the user after successfull change the password
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

         }
             //if the current pass is not correct
              else{
              this.changeUser = results;
                this.sendNotification('Nywila ya sasa sio sahihi!');
                 console.log(this.changeUser);
               }
                 });
           }

     showLoader(){
       this.loading = this.loadingCtrl.create({
           content: 'Badilisha...'
       });

       this.loading.present();
     }

     sendNotification(message)  : void
        {
           let notification = this.toastCtrl.create({
               message       : message,
               duration      : 5000
           });
           notification.present();
        }

}
