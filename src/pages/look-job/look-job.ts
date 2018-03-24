import { Component } from '@angular/core';
import {IonicPage, NavController,LoadingController,ModalController,NavParams,ToastController,MenuController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { JobDataPage } from '../job-data/job-data';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ChangePassPage } from '../change-pass/change-pass';
import { TabsPage } from '../tabs/tabs';
import 'rxjs/add/observable/forkJoin' ;


@IonicPage()
@Component({
  selector: 'page-look-job',
  templateUrl: 'look-job.html',
})
export class LookJobPage {
  public loguser : any =  [];
  private job : FormGroup;
  public reg: any = [];
  public jobd :any [];
  public jobs :any [];
  public thekey :any [];
  public logkey :any = [];
  public loading: any = [];
  public count : any = [];
  public joblist: any = [];
  private baseURI :string = "http://jipange.co.tz/website/api" ;

  constructor(public menu:MenuController,public popover: ModalController,private storage: Storage,public http:Http, public navCtrl: NavController,public loadingCtrl:LoadingController, public toastCtrl:ToastController, public navParams: NavParams,private formBuilder: FormBuilder) {
    this.job = this.formBuilder.group({
      sector:       ['', Validators.required],
      name:         ['', Validators.required],
      salary_level: ['', Validators.compose([Validators.required,Validators.pattern('[0-9]*')])],
      region_id:    ['', Validators.required],
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
      key       : any    = this.logkey,
      reg_api   : any     = {"api":"116","code":"103","device_id":"1234568","type":"300"},
      job_list  : any     = {"api":"117","code":"101","type":"300","device_id":"1234568","key":key},
      options   : any     = new RequestOptions({ headers: headers }),
      url       : any      = this.baseURI ;

      Observable.forkJoin(
      this.http.post(url,reg_api,options).map(res => res.json()),
      this.http.post(url,job_list,options).map(res => res.json())
        ).subscribe(
          data => {
              this.reg = data[0]
              this.joblist = data[1]
              this.count = this.joblist.count;
              this.jobs = this.joblist.job;

                 console.log(this.reg);
                 console.log(this.jobs);
            },
          );
        });
    }

    jobForm()  {
      let
          sector      : string   = this.job.controls["sector"].value,
          name    : string    = this.job.controls["name"].value,
          salary_level  : string    = this.job.controls["salary_level"].value,
          region_id          : string    = this.job.controls["region_id"].value,
          success_description       : any   = this.job.controls["success_description"].value;

    this.showLoader();
    this.saveJob(sector,name,salary_level,region_id,success_description);
    this.loading.dismiss();
   }

  saveJob(sector,name,salary_level,region_id,success_description)
    {
  let     headers  : any      = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}),
           options  : any    = new RequestOptions({ headers: headers }),
           key      : any    = this.logkey,
           job_data     :any   = {"sector":sector,"name":name,"salary_level":salary_level,"region_id":region_id,"success_description":success_description},
           url      : any      = this.baseURI ,
           job_api : any  =  {"api":"117","code":"100","type":"300", "device_id":"1234568","key":key,"data":job_data};

     this.http.post(url,job_api, options).map(res => res.json())
       .subscribe((results) =>
       {
          // If the request was successful notify the user
          if(results.code === 200)
          {

          this.jobd = results ;
          console.log(this.jobd);
            this.sendNotification(`Hongera: Umefanikiwa kuongeza kazi unayo itafautaa`);

          this.navCtrl.push(JobDataPage);
          this.job.reset();
          }
          else
          {
            this.jobd =results ;
            console.log(this.jobd);
            this.sendNotification('Tafadhali,Jaza taarifa zako kwa usahihi!');
          }
       });
    }

    showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'tafuta kazi...'
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
     ViewJob(){
         let popoup = this.popover.create(JobDataPage);
    popoup.present();
       }
       logout(){
       this.storage.get('user_data').then((val) => {
           this.logkey = val.key ;
           this.loguser  = val.user_details;

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
