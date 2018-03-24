import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-job-data',
  templateUrl: 'job-data.html',
})
export class JobDataPage {
  public jobd : any  = [];
  public logkey : any  = [];
  public jobs : any  = [];
  public loguser : any  = [];
  private baseURI :string = "http://jipange.co.tz/website/api" ;


  constructor(public storage:Storage,public http:Http, public view: ViewController, public navParams: NavParams) {
  }

  ionViewWillEnter(){

    this.storage.get('user_data').then((val) => {
      this.loguser = val.user_details ;
      this.logkey = val.key ;
      let headers   : any      = new Headers({ 'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}),
         key        : any   = this.logkey,
         jobd_api   : any     = {"api":"117","code":"101","type":"300","device_id":"1234568","key":key},
         options   : any     = new RequestOptions({ headers: headers }),
         url       : any      = this.baseURI ;

       this.http.post(url,jobd_api, options).map(res => res.json())
         .subscribe(
           data => {
               this.jobd = data;
               this.jobs = this.jobd.job;
               console.log(this.jobs);
         });
    });
  }
  closeJob(){
    this.view.dismiss();
  }

}
