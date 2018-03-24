import { Component } from '@angular/core';
import {AlertController, NavController,LoadingController,ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoginPage } from '../login/login';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';



@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  private register : FormGroup;
  private baseURI :string = "http://jipange.co.tz/website/api" ;
  public URI : string = "http://localhost/jipange/log.php" ;
  public reg : any = [];
  public distr : any = [];
  public sign : any = [];
  public region_id :any = [];
  public era : any = [];
  public loading: any;
   regData = { name:'', gender:'',phone_number:'', email:'',type:'', region_id:'' , district_id:'',ward:'', street:''};

  constructor(public alertCtrl: AlertController, public http:Http, public loadingCtrl:LoadingController, public toastCtrl:ToastController, public navCtrl:NavController, private formBuilder: FormBuilder )
   {
    this.register = this.formBuilder.group({
      name: ['', Validators.required],
      phone_number: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*')])],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      region_id: ['', Validators.required],
      district_id: ['', Validators.required],
      type: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  ionViewWillEnter(){

   let headers   : any      = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}),
      reg_api   : any     = {"api":"116","code":"103","device_id":"1234568"},
      options   : any     = new RequestOptions({ headers: headers }),
      url       : any      = this.baseURI ;

    this.http.post(url,reg_api, options).map(res => res.json())
      .subscribe(
        data => {
            this.reg = data;
            console.log(this.reg);
      });
    }

    onChange(CValue){
      console.log(CValue);
      this.region_id = CValue;

      let headers   : any      = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}),
         get_distr   : any     = {"api":"116","code":"106","region_id":this.region_id,"device_id":"1234568"},
         options   : any     = new RequestOptions({ headers: headers }),
         url       : any      = this.baseURI ;

       this.http.post(url,get_distr, options).map(res => res.json())
         .subscribe(
           data => {
               this.distr = data;
               console.log(this.distr);
          //     console.log(this.logu);
         });
    }

  regForm()
    {
       let
           nam  : string   = this.register.controls["name"].value,
           gender    : string    = this.register.controls["gender"].value,
           phone_number     : string    = this.register.controls["phone_number"].value,
           email     : string    = this.register.controls["email"].value,
           type      : string    = this.register.controls["type"].value,
           region_id    : string    = this.register.controls["region_id"].value,
           district_id  : string    = this.register.controls["district_id"].value,
           street    : string    = this.register.controls["street"].value,
           username : string    = this.register.controls["phone_number"].value;

           let name = nam.charAt(0).toUpperCase() + nam.slice(1).toLowerCase();
     console.log(name);
     this.showLoader();
     this.saveEntry(name,gender,phone_number,email,type,region_id,district_id,street,username);
    }

  saveEntry(name,gender,phone_number,email,type,region_id,district_id,street,username)
     {
   let     headers  : any      = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}),
            options  : any      = new RequestOptions({ headers: headers }),
            home     :any   = {"name":name,"gender":gender,"phone_number":phone_number,"email":email,"type":type,"region_id":region_id,"district_id":district_id,"street":street,"username":username},
            url      : any      = this.baseURI ,
            sign_api : any  =  {"api":"105","code":"104","type":"300", "device_id":"1234568","data":home};

        this.http.post(url,sign_api, options).map(res => res.json())
        .subscribe((results) =>
        {
           // If the request was successful notify the user
           if(results.code === 200)
           {

           this.sign = results ;
           console.log(this.sign);
             this.sendNotification(`Hongera: ${name} umefanikiwa kujisajili WAKISHA`);
             this.loading.dismiss();
             this.navCtrl.push(LoginPage);
             this.register.reset();
           }
           else if(results.code === 300) {
             this.sendNotification(`Namba ${phone_number} imekwisha tumika, tafadhali tumia namba nyingine `);
             this.loading.dismiss();
           }
           else
           {
             this.era =results ;
             console.log(this.era);
              this.sendNotification('Tafadhali jaza taarifa zako kwa usahihi!');
              this.loading.dismiss();
           }
        });
     }

     showLoader(){
       this.loading = this.loadingCtrl.create({
           content: 'Jisajili...'
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
