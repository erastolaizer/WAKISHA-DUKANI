import { Component } from '@angular/core';
import {IonicPage, NavController,LoadingController,MenuController,ToastController,ModalController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { BussinessDataPage } from '../bussiness-data/bussiness-data';
import { ChangePassPage } from '../change-pass/change-pass';
import { TabsPage } from '../tabs/tabs';




@IonicPage()
@Component({
  selector: 'page-expand-buss',
  templateUrl: 'expand-buss.html',
})
export class ExpandBussPage {
  private expand : FormGroup;
  private baseURI :string = "http://jipange.co.tz/website/api" ;
  public expa : any = [];
  public buss : any = [];
  public loguser : any = [];
  public logkey : any = [];
  public loading: any;
  public logu: any = [];

  constructor(public menu:MenuController,public popover:ModalController,public storage:Storage, public http:Http, public loadingCtrl:LoadingController, public toastCtrl:ToastController, public navCtrl:NavController, private formBuilder: FormBuilder ) {
    this.expand = this.formBuilder.group({
      name: ['', Validators.required],
      start_date: ['', Validators.required],
      employee_number: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*')])],
      current_capital: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*')])],
      required_capital: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*')])],
      success_description: ['', Validators.required],
    });
  }
ionViewDidEnter() {
        this.menu.enable(true, 'user');
  }
  ionViewWillEnter(){

    this.storage.get('user_data').then((val) => {
      this.loguser = val.user_details ;
      this.logkey = val.key ;
      let headers   : any      = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}),
         key        : any   = this.logkey,
         expa_api   : any     = {"api":"114","code":"101","type":"300","device_id":"1234568","key":key},
         options   : any     = new RequestOptions({ headers: headers }),
         url       : any      = this.baseURI ;

       this.http.post(url,expa_api, options).map(res => res.json())
         .subscribe(
           data => {
               this.expa = data;
               this.buss = this.expa.business;
               console.log(this.buss);
         });
    });
  }

    expandForm(){
         let
         name                  : string   = this.expand.controls["name"].value,
         start_date           : string    = this.expand.controls["start_date"].value,
         employee_number      : string    = this.expand.controls["employee_number"].value,
         current_capital      : string    = this.expand.controls["current_capital"].value,
         required_capital     : string    = this.expand.controls["required_capital"].value,
         success_description  : string    = this.expand.controls["success_description"].value;

         this.showLoader();
         this.saveBussiness(name,start_date,employee_number,current_capital,required_capital,success_description);
         this.loading.dismiss();
        }

        saveBussiness(name,start_date,employee_number,current_capital,required_capital,success_description)
         {
        let     headers  : any      = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}),
                options  : any      = new RequestOptions({ headers: headers }),
                exp     :any   = {"name":name,"start_date":start_date,"employee_number":employee_number,"current_capital":current_capital,"required_capital":required_capital,"success_description":success_description,},
                key      : any    = this.logkey,
                url      : any      = this.baseURI ,
                expa_api : any  =  {"api":"114","code":"100","type":"300", "device_id":"1234568","key":key,"data":exp};

          this.http.post(url,expa_api, options).map(res => res.json())
            .subscribe((results) =>
            {
               // If the request was sun ccessful notify the user
               if(results.code === 200)
               {

               this.expa = results ;
               console.log(this.expa);
               this.sendNotification(`Hongera: Umefanikiwa kuongeza biashara yako unayotaka kukuza`);
                this.navCtrl.push(BussinessDataPage);
                this.expand.reset();
               }
               else
               {
                 this.expa =results ;
                 console.log(this.expa);

                 this.sendNotification('Tafadhali,Jaza taarifa zako kwa usahihi!');
               }
            });

     }

     showLoader(){
       this.loading = this.loadingCtrl.create({
           content: 'kuza biashara..'
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
ViewBus(){
  let pop = this.popover.create(BussinessDataPage);
    pop.present();
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
