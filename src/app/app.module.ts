import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { Network } from '@ionic-native/network';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { LoginPage } from '../pages/login/login';
import { BussinessDataPage } from '../pages/bussiness-data/bussiness-data';
import { IdeaDataPage } from '../pages/idea-data/idea-data';
import { ProfilePage } from '../pages/profile/profile';
import { MessagePage } from '../pages/message/message';
import { JobDataPage } from '../pages/job-data/job-data';
import { PasswordPage } from '../pages/password/password';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { AdminLoginPage } from '../pages/admin-login/admin-login';
import { LookJobPage } from '../pages/look-job/look-job';
import { ChangePassPage } from '../pages/change-pass/change-pass';
import { OpenBussPage } from '../pages/open-buss/open-buss';
import { ExpandBussPage } from '../pages/expand-buss/expand-buss';
import { StatusBar } from '@ionic-native/status-bar';
import { MorePage } from '../pages/more/more';
import { AboutMePage } from '../pages/about-me/about-me';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OurServicePage } from '../pages/our-service/our-service';
import { OurDirectionPage } from '../pages/our-direction/our-direction';
import { AuthService } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { SMS } from '@ionic-native/sms';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PasswordPage,
    LoginPage,
    OurServicePage,
    ExpandBussPage,
    OpenBussPage,
    OurDirectionPage,
    LookJobPage,
    AdminLoginPage,
    MessagePage,
    DashboardPage,
    ProfilePage,
    ChangePassPage,
    IdeaDataPage,
    BussinessDataPage,
    SignUpPage,
    MorePage,
    JobDataPage,
    AboutMePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
    name: '__mydb',
       driverOrder: ['indexeddb', 'sqlite', 'websql']
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    MorePage,
    HomePage,
    MessagePage,
    IdeaDataPage,
    AdminLoginPage,
    BussinessDataPage,
    OurServicePage,
    LoginPage,
    DashboardPage,
    ChangePassPage,
    JobDataPage,
    OurDirectionPage,
    AboutMePage,
    SignUpPage,
    ExpandBussPage,
    OpenBussPage,
    LookJobPage,
    ProfilePage,
    PasswordPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    DatePipe,
    SMS,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
