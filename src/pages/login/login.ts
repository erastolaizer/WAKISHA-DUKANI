import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AboutMePage } from '../about-me/about-me';
import { PasswordPage } from '../password/password';
import { Storage } from '@ionic/storage';
import { Http,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public login : FormGroup;
  public loading: any;
  private baseURI :string = "http://jipange.co.tz/website/api" ;
  public reg : any = [];
  public loginUser : any = [];

  constructor(private storage: Storage,public http : Http, private formBuilder: FormBuilder, public navCtrl: NavController, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.login = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*')])],
      password: ['', Validators.required],
    });
  }
  ionViewWillEnter(){
  this.login.setValue({
    username : "",
    password: ""
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
                 log_api   : any     = {"api":"105","code":"103","username":username,"password":password,"type":"300","device_id":"1234568"},
                 options   : any     = new RequestOptions({ headers: headers }),
                 url       : any      = this.baseURI ;

               this.http.post(url,log_api, options).map(res => res.json())
                 .subscribe(
                   results => {
                     if (results.code === 200) {
                       this.loginUser = results;
                        console.log(this.loginUser);
                        this.storage.set('user_data',this.loginUser);
                        this.loading.dismiss();
                        this.sendNotification('Umefanikiwa kuingia');
                        this.navCtrl.setRoot(AboutMePage);

                     }
                      else{
                        this.loginUser = results;
                        this.sendNotification('Namba ya simu au nywila sio sahihi!');
                         console.log(this.loginUser);
                      }

                   });
           }
forgetPass(){
  this.navCtrl.push(PasswordPage);
}
     showLoader(){
       this.loading = this.loadingCtrl.create({
           content: 'Hakikisha...'
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
