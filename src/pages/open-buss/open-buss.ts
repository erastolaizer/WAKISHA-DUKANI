import { Component } from '@angular/core';
import {IonicPage, NavController,LoadingController,ToastController,ModalController,MenuController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { IdeaDataPage } from '../idea-data/idea-data';
import { ChangePassPage } from '../change-pass/change-pass';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-open-buss',
  templateUrl: 'open-buss.html',
})
export class OpenBussPage {
  private open : FormGroup;
  private baseURI :string = "http://jipange.co.tz/website/api" ;
  public idea : any = [];
  public ideas : any = [];
  public view_idea : any = [];
  public loguser : any = [];
  public logkey : any = [];
  public logu: any = [];
  public loading: any;
  constructor(public menu:MenuController,public popover:ModalController,public storage:Storage, public http:Http, public loadingCtrl:LoadingController, public toastCtrl:ToastController, public navCtrl:NavController, private formBuilder: FormBuilder ) {
    this.open = this.formBuilder.group({
      name: ['', Validators.required],
      start_date: ['', Validators.required],
      expected_employee_number: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*')])],
      expected_profit: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*')])],
      required_capital:['', Validators.compose([Validators.required,Validators.pattern('[0-9]*')])],
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
         view_idea_api   : any     = {"api":"115","code":"101","type":"300","device_id":"1234568","key":key},
         options   : any     = new RequestOptions({ headers: headers }),
         url       : any      = this.baseURI ;

       this.http.post(url,view_idea_api, options).map(res => res.json())
         .subscribe(
           data => {
               this.view_idea = data;
               this.ideas = this.view_idea.idea ;
               console.log(this.view_idea);
         });
      });
  }

    openForm(){
         let
         name : string   = this.open.controls["name"].value,
         start_date    : string    = this.open.controls["start_date"].value,
         expected_employee_number     : string    = this.open.controls["expected_employee_number"].value,
         expected_profit     : string    = this.open.controls["expected_profit"].value,
         required_capital      : string    = this.open.controls["required_capital"].value,
         success_description    : string    = this.open.controls["success_description"].value;

         this.showLoader();
         this.saveIdea(name,start_date,expected_employee_number,expected_profit,required_capital,success_description);
         this.loading.dismiss();
        }

        saveIdea(name,start_date,expected_employee_number,expected_profit,required_capital,success_description)
         {
        let     headers  : any      = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}),
                options  : any      = new RequestOptions({ headers: headers }),
                ope     :any   = {"name":name,"start_date":start_date,"expected_employee_number":expected_employee_number,"expected_profit":expected_profit,"required_capital":required_capital,"success_description":success_description,},
                key      : any    = this.logkey,
                url      : any      = this.baseURI ,
                idea_api : any  =  {"api":"115","code":"100","type":"300", "device_id":"1234568","key":key,"data":ope};

          this.http.post(url,idea_api, options).map(res => res.json())
            .subscribe((results) =>
            {
               // If the request was successful notify the user
               if(results.code === 200)
               {

               this.idea = results ;
               console.log(this.idea);
                 this.sendNotification(`Hongera: Umefanikiwa kuongeza biashara unayotaka kufungua`);
                 this.navCtrl.push(IdeaDataPage);
                 this.open.reset();
               }
               else
               {
                 this.idea =results ;
                 console.log(this.idea);
                 this.sendNotification('Tafadhali,Jaza taarifa zako kwa usahihi!');
               }
            });

     }

     showLoader(){
       this.loading = this.loadingCtrl.create({
           content: 'Fungua biashara...'
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

ViewIdea(){
  let pop = this.popover.create(IdeaDataPage);
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
