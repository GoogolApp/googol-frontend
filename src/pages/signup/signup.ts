import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignInPage } from '../signin/signin';

import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignUpPage {

  mail: string = "";
  user: string = "";
  pass: string = "";
  pass_confirm: string = ""; 

  constructor(public navCtrl: NavController, public alert:AlertController) {
  }

  fakeUser(){
    if(this.pass !== this.pass_confirm){
      this.presentAlert("As senhas não combinam!")
    }else{
      this.navCtrl.push(HomePage, {}, {animate: false});
    }
  }

  presentAlert(message) {
    let alert = this.alert.create({
      title: 'Erro',
      subTitle: message,
      buttons: ['Entendido']
    });
    alert.present();
  }

  goSignIn(){
    this.navCtrl.push(SignInPage, {}, {animate: false});
  }

}
