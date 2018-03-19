import { Component, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { ListPage } from '../list/list';
import { SignupPage } from '../signup/signup';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  encapsulation: ViewEncapsulation.None,
  providers: [UsersserviceProvider]
})
export class LoginPage {

  public email: string;
  public password: string;

  constructor(
    public usersService : UsersserviceProvider, 
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController,  
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  submitLogin(){

    var that = this;
    
    var loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();   

    this.usersService.loginUserService(this.email, this.password).then(authData => {
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
      that.password = ""//empty the password field    
    });
    
    
  }

  forgotPassword(){

  }

  redirectToSignup(){
    this.navCtrl.push(SignupPage);
  }

}
