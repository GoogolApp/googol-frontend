import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../_services/auth';
import { HomePage } from '../home/home';
import { SignUpPage } from '../signup/signup';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SignInPage {

  email: string = "";
  password: string = "";
  loading = this.loadingController.create({
    content: 'Por favor, aguarde...',
    spinner: 'bubbles'
  });

  constructor(public navCtrl: NavController, public auth: AuthService, public alert:AlertController, private loadingController: LoadingController) {
    if(this.auth.isAuthenticated()){
      this.navigateHome();
    }
  }

  signIn(){

    this.loading.present();

    this.auth.signIn(this.email, this.password).subscribe(
      user => {
        this.loading.dismiss();
        if(user){
          this.resetFields();
          this.navigateHome();
        }else{
          this.presentAlert("Por alguma razão o SignIn não pode ser realizado!");
        }
      },
      err => {
        this.loading.dismiss();
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
    this.email = "";
    this.password = "";
  }

  goSignUp(){
    this.navCtrl.push(SignUpPage, {}, {animate: false});
  }

  navigateHome(){
    this.navCtrl.push(HomePage, {}, {animate: false});
  }
}
