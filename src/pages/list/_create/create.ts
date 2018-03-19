import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, ViewChild, ElementRef, NgZone, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { UsersItemProvider } from '../../../providers/usersservice/usersitem';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular/components/app/app';

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
  encapsulation: ViewEncapsulation.None,  
  providers: [UsersItemProvider]

})
export class CreateComponent {
  // Our local settings object
  options: any;
  profile: any;
  currentUsers: any;

  userData = {
    month: null,
    noRekam: null,
    nama: null,
    alamat: null,
    kelamin: null,
    keluhan: null
  }

  diagnoseForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public zone: NgZone,
    public service: UsersItemProvider,
    public platform: Platform,
    public localStorage: Storage,
    public viewCtrl: ViewController,
    public app:App,
  ) {
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     this.currentUsers = user.email;
    //     console.log(this.currentUsers);
    //   } else {
    //     console.log('no users sign');
    //   }
    // });
    let user = firebase.auth().currentUser;
    console.log(user.uid);

    this.diagnoseForm = new FormGroup({
      month: new FormControl(),
      noRekam: new FormControl(),
      nama: new FormControl(),
      alamat: new FormControl(),
      kelamin: new FormControl(),
      keluhan: new FormControl()
    });
    this.diagnoseForm = this.formBuilder.group({
      month: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      noRekam: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      nama: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      alamat: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      kelamin: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      keluhan: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });   
  }

  ionViewDidLoad() {    
  }

  goPhoto() {
    const store = {
      noRekam: this.diagnoseForm.get('noRekam').value,
      nama: this.diagnoseForm.get('nama').value,
      alamat: this.diagnoseForm.get('alamat').value,
      month: this.diagnoseForm.get('month').value,
      kelamin: this.diagnoseForm.get('kelamin').value,
      keluhan: this.diagnoseForm.get('keluhan').value
    };
    localStorage.setItem('diagnose_first', JSON.stringify(store));

    this.navCtrl.push('PhotoComponent');
  }

}
