import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../_services/auth';
import { HomePage } from '../home/home';
import { SignUpPage } from '../signup/signup';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SignInPage {

  user: string = "";
  pass: string = "";

  constructor(public navCtrl: NavController, public auth: AuthService, public alert:AlertController) {
    if(this.auth.isAuthenticated()){
      this.navigateHome();
    }
  }

  signIn(){
    this.auth.signIn(this.user, this.pass).subscribe(
      user => {
        if(user){
          this.resetFields();
          this.navigateHome();
        }else{
          this.presentAlert("Por alguma razão o SignIn não pode ser realizado!");
        }
      },
      err => {
        this.presentAlert("Usuário ou senha incorretos!");
      } 
    )
  }

  presentAlert(message) {
    let alert = this.alert.create({
      title: 'Erro',
      subTitle: message,
      buttons: ['Entendido']
    });
    alert.present();
  }

  resetFields(){
    this.user = "";
    this.pass = "";
  }

  goSignUp(){
    this.navCtrl.push(SignUpPage, {}, {animate: false});
  }

  navigateHome(){
    this.navCtrl.push(HomePage, {}, {animate: false});
  }
}
