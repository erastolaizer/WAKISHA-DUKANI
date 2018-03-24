import { Component } from '@angular/core';
import {IonicPage, NavController,LoadingController, MenuController,ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AboutMePage } from '../about-me/about-me';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'
import { ChangePassPage } from '../change-pass/change-pass';
import { TabsPage } from '../tabs/tabs';
import { DatePipe } from '@angular/common';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
public logu : any =  [];
public prof : any = [];
private profile : FormGroup;
public reg: any = [];
public distr: any = [];
public region_id :any [];
public comp: any = [];
public logkey :any = [];
public era: any = [];
public CValue :string = "";
public loading: any = [];
private baseURI :string = "http://jipange.co.tz/website/api" ;

  constructor(public datepipe: DatePipe, private storage: Storage,public http:Http, public navCtrl: NavController,public loadingCtrl:LoadingController, public toastCtrl:ToastController, public menu: MenuController,private formBuilder: FormBuilder) {
    this.profile = this.formBuilder.group({
      school_name: ['', Validators.required],
      school_region_id: ['', Validators.required],
      school_district_id: ['', Validators.required],
      course: ['', Validators.required],
      pass_level: ['', Validators.required],
      education_level: ['', Validators.required],
      talent: ['', Validators.required],
      school_start_date: ['', Validators.required],
      school_end_date: ['', Validators.required],
    });
  }
ionViewDidEnter() {
        this.menu.enable(true, 'user');
  }

  ionViewWillEnter(){

    this.storage.get('user_data').then((val) => {
    //this.logu = val.user_details ;
      this.logkey = val.key ;
      console.log(this.logkey);

   let headers   : any      = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}),
      reg_api   : any     = {"api":"116","code":"103","device_id":"1234568"},
      key       : any     =  this.logkey ,
      profile_api     : any   = {"api":"108","code":"107","type":"300","device_id":"1234568","key":key},
      options   : any     = new RequestOptions({ headers: headers }),
      url       : any      = this.baseURI ;


    Observable.forkJoin(
        this.http.post(url,reg_api, options).map(res => res.json()),
        this.http.post(url,profile_api, options).map(res => res.json())
        ).subscribe(
       data => {
         this.reg = data[0]
         this.prof= data[1]
    this.logu = this.prof.profile;

    this.region_id = this.logu.school_region_id ;
    let get_distr   : any     = {"api":"116","code":"106","region_id":this.region_id,"device_id":"1234568"};
    this.http.post(url,get_distr, options).map(res => res.json())
      .subscribe(
        data => {
            this.distr = data;
            console.log(this.distr);
      });

    this.profile.setValue({
      school_name: this.logu.school_name,
      school_region_id: this.logu.school_region_id,
      school_district_id: this.logu.school_district_id,
      course: this.logu.course,
      pass_level: this.logu.pass_level,
      education_level: this.logu.education_level,
      talent: this.logu.talent,
      school_start_date:this.logu.school_start_date,
      school_end_date: this.logu.school_end_date
    });

       },
       err => console.error(err)
     );
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
         });
    }

  compForm()  {
    let
        name      : string   = this.profile.controls["school_name"].value,
        school_region_id    : string    = this.profile.controls["school_region_id"].value,
        school_district_id  : string    = this.profile.controls["school_district_id"].value,
        course           : string    = this.profile.controls["course"].value,
        school_start_date : any   = this.profile.controls["school_start_date"].value,
        school_end_date   : any    = this.profile.controls["school_end_date"].value,
        pass_level       : string    = this.profile.controls["pass_level"].value,
        education_level  : string    = this.profile.controls["education_level"].value,
        talent           : string    = this.profile.controls["talent"].value;

  let school_name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
     console.log(school_name);

  this.showLoader();
  this.saveEntry(school_name,school_region_id,school_district_id,course,school_start_date,school_end_date,pass_level,education_level,talent);
  this.loading.dismiss();
 }

saveEntry(school_name,school_region_id,school_district_id,course,school_start_date,school_end_date,pass_level,education_level,talent)
  {
let     headers  : any      = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}),
         options  : any    = new RequestOptions({ headers: headers }),
         key      : any    = this.logkey,
         profile_data     :any   = {"school_name":school_name,"school_region_id":school_region_id,"school_district_id":school_district_id,"course":course,"school_start_date":school_start_date,"school_end_date":school_end_date,"pass_level":pass_level,"education_level":education_level,"talent":talent},
         url      : any      = this.baseURI ,
         completesign_api : any  =  {"api":"108","code":"106","type":"300", "device_id":"1234568","key":key,"data":profile_data};

   this.http.post(url,completesign_api, options).map(res => res.json())
     .subscribe((results) =>
     {
        // If the request was successful notify the user
        if(results.code === 200)
        {

        this.comp = results ;
        console.log(this.comp);
          this.sendNotification(`Hongera: Umefanikiwa kuboresha taarifa zako`);
          this.navCtrl.push(AboutMePage);
        }
        else
        {
          this.era =results ;
          console.log(this.era);

          this.sendNotification('Tafadhali,Jaza taarifa zako kwa usahihi!');
        }
     });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Boresha taarifa...'
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
