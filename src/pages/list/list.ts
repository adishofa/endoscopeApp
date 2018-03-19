import { Component, ViewEncapsulation } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { UsersItemProvider } from '../../providers/usersservice/usersitem';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  encapsulation: ViewEncapsulation.None,
  providers: [UsersItemProvider]
})

export class ListPage {
  selectedItem: any;
  items: Observable<any[]>;

  userId: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public usersItemProvider : UsersItemProvider,
    public afDatabase: AngularFireDatabase
  ) {    
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  ionViewDidEnter(){
    this.userId = firebase.auth().currentUser.uid;
    this.fillItems();
  }
  ionViewDidLoad(){
    this.userId = firebase.auth().currentUser.uid;
    this.fillItems();
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
  fillItems() {
    this.items = this.afDatabase.list('/items/'+this.userId).valueChanges();
  }

  createNew() {
    this.navCtrl.push('CreateComponent');
  }

  doLogout() {
    this.navCtrl.setRoot('LogoutComponent');
  }
}
