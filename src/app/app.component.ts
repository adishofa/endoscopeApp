import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  user: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  activePage = new Subject();
  pages: Array<{ title: string, component: any, active: boolean }>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public menuCtrl: MenuController
  ) {     
    const user = firebase.auth().currentUser;
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menuCtrl.enable(false, 'left');     
      
      if (user) {
        this.rootPage = 'ListPage';
      } else {
        this.rootPage = 'LoginPage';
      }
    });   
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Endoscope List', component: 'ListPage', active: false },
    ];

    this.activePage.subscribe((selectedPage: any) => {
        this.pages.map(page => {
            page.active = page.title === selectedPage.title;
        });
    });
  }  

  openPage(page) {
    this.nav.setRoot(page.component, page.title);
    this.activePage.next(page);
  }

}
