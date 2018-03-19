import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { Diagnostic } from '@ionic-native/diagnostic';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { UsersserviceProvider } from '../providers/usersservice/usersservice';
import { UsersItemProvider } from '../providers/usersservice/usersitem';


// Initialize Firebase
export const config = {
  apiKey: "AIzaSyBeIGM8IhAJSnPCwpZyWdzfN60fpDap7oM",
  authDomain: "endoscope-apps.firebaseapp.com",
  databaseURL: "https://endoscope-apps.firebaseio.com",
  projectId: "endoscope-apps",
  storageBucket: "endoscope-apps.appspot.com",
  messagingSenderId: "7236449113"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    UsersserviceProvider,
    UsersItemProvider,
    Diagnostic,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
