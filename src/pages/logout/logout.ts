import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
  encapsulation: ViewEncapsulation.None
})
export class LogoutComponent implements OnInit {

  @ViewChild(Nav) nav: Nav;

  activePage = new Subject();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    
  }

  ngOnInit() {
    // this.unregisterFCM();
    this.clearAuth();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutComponent');
  }

  clearAuth() {
    var that = this;
    firebase.auth().signOut().then(function() {
      setTimeout (() => {
        // this.nav.setRoot('LoginPage');
    		that.navCtrl.setRoot('LoginPage');
      }, 1000);
    }).catch(function(error) {
      // An error happened.
    });
  }  

}
