import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignInPage } from '../signin/signin';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignUpPage {

  mail: string = "";
  user: string = "";
  pass: string = "";
  pass_confirm: string = ""; 

  constructor(public navCtrl: NavController) {
  }

  fakeUser(){
    this.navCtrl.push(HomePage, {}, {animate: false});
  }

  goSignIn(){
    this.navCtrl.push(SignInPage, {}, {animate: false});
  }

}
