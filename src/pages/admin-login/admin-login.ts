import { Component } from '@angular/core';
import {IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DashboardPage } from '../dashboard/dashboard';
import { PasswordPage } from '../password/password';
import { Storage } from '@ionic/storage';
import { Http,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-admin-login',
  templateUrl: 'admin-login.html',
})
export class AdminLoginPage {

  public login : FormGroup;
  public loading: any;
  private baseURI :string = "http://jipange.co.tz/website/api" ;
  public reg : any = [];
  public admin : any = [];

  constructor(private storage: Storage,public http : Http, private formBuilder: FormBuilder, public navCtrl: NavController, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  logForm() {

       let   username : string    = this.login.controls["username"].value,
             password : string   = this.login.controls["password"].value;
            this.showLoader();
            this.authUser(username,password);
            this.loading.dismiss();
}
authUser(username,password){
             let headers   : any      = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}),
                 log_api   : any     = {"api":"105","code":"103","username":username,"password":password,"type":"301","device_id":"12345678"},
                 options   : any     = new RequestOptions({ headers: headers }),
                 url       : any      = this.baseURI ;

               this.http.post(url,log_api, options).map(res => res.json())
                 .subscribe(
                   results => {
                     if (results.code === 200) {
                       this.admin = results;
                        console.log(this.admin);
                        this.storage.set('user_data',this.admin);
                        this.loading.dismiss();
                        this.sendNotification('login successfully');
                     this.navCtrl.setRoot(DashboardPage);

                     }
                      else{
                        this.admin = results;
                        this.sendNotification('wrong details! Page for Admin ONLY');
                         console.log(this.admin);
                      }

                   });
           }
forgetPass(){
  this.navCtrl.push(PasswordPage);
}
     showLoader(){
       this.loading = this.loadingCtrl.create({
           content: 'Authenticating...'
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
