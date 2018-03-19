import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';

import { Component, ViewChild, ElementRef, NgZone, ViewEncapsulation, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, ToastController, LoadingController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular/components/app/app';

import { UsersItemProvider } from '../../../providers/usersservice/usersitem';
// import { PictureUtils } from '../../../providers/services/pictureUtils.service';
import * as firebase from 'firebase';
import { ListPage } from '../../list/list';

@IonicPage()
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html',
  encapsulation: ViewEncapsulation.None,
  providers: [UsersItemProvider]
})
export class PhotoComponent implements OnInit {
  // Our local settings object
  options: any;
  profile: any;

  userData = {
    month: null,
    noRekam: null,
    nama: null,
    alamat: null,
    kelamin: null,
    keluhan: null,
    telinga_ki: null,
    telinga_ka: null,
    hidung_ki: null,
    hidung_ka: null,
    mulut: null,
    kesimpulan: null
  }

  // @ViewChild('fileInput') fileInput;
  @ViewChild('fileInput') fileInput;
  // @ViewChild('fileInput') fileInput;
  // @ViewChild('fileInput') fileInput;
  // @ViewChild('fileInput') fileInput;
  
  // userTelingaKi: any;
  
  user: any;
  success = false;
  error = false;
  errorMessage;

  form: FormGroup;

  isReadyToSave: boolean;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public zone: NgZone,
    public platform: Platform,
    public localStorage: Storage,
    public viewCtrl: ViewController,
    public usersItemProvider : UsersItemProvider, 
    public app:App,
    public camera: Camera,
    public toastCtrl: ToastController, 
    public loadingCtrl: LoadingController
  ) {

    this.form = formBuilder.group({
      telinga_ki: [''],
      telinga_ka: [''],
      hidung_ki: [''],
      hidung_ka: [''],
      mulut: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

  }

  ngOnInit() {
    this.user = Object.assign({}, this.userData);
    this.getCurrentRegistration();
  }

  getCurrentRegistration() {
    const storage = localStorage.getItem('diagnose_first');
    let dt;
    if (storage != null) {
      dt = JSON.parse(storage);
      this.user.noRekam = dt.noRekam;
      this.user.nama = dt.nama;
      this.user.alamat = dt.alamat;
      this.user.month = dt.month;
      this.user.kelamin = dt.kelamin;
      this.user.keluhan = dt.keluhan;
    } else {
      this.navCtrl.push('CreateComponent');
    }
  }

  ionViewDidLoad() { 
  }

  submitDiagnosa() {
    const item = {
      month: this.user.month,
      noRekam: this.user.noRekam,
      nama: this.user.nama,
      alamat: this.user.alamat,
      kelamin: this.user.kelamin,
      keluhan: this.user.keluhan,
      telinga_ki: this.user.telinga_ki,
      telinga_ka: this.user.telinga_ka,
      hidung_ki: this.user.hidung_ki,
      hidung_ka: this.user.hidung_ka,
      mulut: this.user.mulut,
      kesimpulan: this.user.kesimpulan
    };
    localStorage.removeItem('diagnose_first');
    
    // this.navCtrl.push('PhotoComponent');
    var that = this;

    var loader = this.loadingCtrl.create({
      content: "Please wait...",      
    });
    loader.present();


  	this.usersItemProvider.addUserItem(item).then(authData => {
  		//successful
  		loader.dismiss();
  		that.navCtrl.setRoot(ListPage);

  	}, error => {
      loader.dismiss();
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: error,
        duration: 3000,
        position: 'top'
      });
      toast.present();
  	}); 
  }

  getPictureTelingaKi() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 600,
        targetHeight: 600
      }).then((data) => {
        this.form.patchValue({ 'telinga_ki': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }
  getPictureTelingaKa() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 600,
        targetHeight: 600
      }).then((data) => {
        this.form.patchValue({ 'telinga_ka': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImageTelingaKi(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'telinga_ki': imageData });
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  processWebImageTelingaKa(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'telinga_ka': imageData });
    };
    reader.readAsDataURL(event.target.files[1]);
  }

  getTelingaKiStyle() {
    return 'url(' + this.form.controls['telinga_ki'].value + ')'
  }
  getTelingaKaStyle() {
    return 'url(' + this.form.controls['telinga_ka'].value + ')'
  }
  getHidungKiStyle() {
    return 'url(' + this.form.controls['hidung_ki'].value + ')'
  }
  getHidungKaStyle() {
    return 'url(' + this.form.controls['hidung_ka'].value + ')'
  }
  getMulutStyle() {
    return 'url(' + this.form.controls['mulut'].value + ')'
  }

}
