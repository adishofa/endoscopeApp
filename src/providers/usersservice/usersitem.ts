import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()

export class UsersItemProvider {

  public data: any;
  public fireAuth: any;
  public userProfile: any;
  public userItem: any;
  public currentUsers: any;

  constructor(
    public http: Http
  ) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('users');
    this.userItem = firebase.database().ref('items');
    this.currentUsers = this.fireAuth.currentUser;
  }

  getCurrentUsers() {
    return this.currentUsers.uid;
  }

  getItemList() {
    return this.userItem.child(this.currentUsers.uid);
  }

  addUserItem(item: {}) {
    return this.userItem.child(this.currentUsers.uid).push(item);
  }

}
