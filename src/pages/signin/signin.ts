import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../_services/auth';
import { HomePage } from '../home/home';
import { SignUpPage } from '../signup/signup';
import { OwnerHomePage } from '../home-owner/owner-home';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SignInPage {

  type: string = "user";
  email: string = "";
  password: string = "";

  constructor(
    public navCtrl: NavController,
    public auth: AuthService,
    public alert:AlertController,
    private loadingController: LoadingController) {
      if(this.auth.isAuthenticated()){
      this.navCtrl.push(HomePage, {}, {animate: false});
    }
  }

  async signIn(){

    let loading = this.loading();

    if(this.type === 'user'){
      await this.userSignIn(loading);
    }
    
    if(this.type === 'owner'){
      await this.ownerSignIn(loading);
    }
    
  }

  userSignIn(loading){
    this.auth.userSignIn(this.email, this.password).subscribe(
      user => {
        loading.dismiss();
        if(user){
          this.resetFields();
          this.navCtrl.push(HomePage, {}, {animate: false});
        }else{
          this.presentAlert("Por alguma razão o SignIn não pode ser realizado!");
        }
      },
      err => {
        loading.dismiss();
        this.presentAlert("Usuário ou senha incorretos!");
      } 
    )
  }

  ownerSignIn(loading){
    this.auth.ownerSignIn(this.email, this.password).subscribe(
      user => {
        loading.dismiss();
        if(user){
          this.resetFields();
          this.navCtrl.push(OwnerHomePage, {}, {animate: false});
        }else{
          this.presentAlert("Por alguma razão o SignIn não pode ser realizado!");
        }
      },
      err => {
        loading.dismiss();
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

  loading(){
    let loading = this.loadingController.create({
      content: 'Por favor, aguarde...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }

  goSignUp(){
    this.navCtrl.push(SignUpPage, {}, {animate: false});
  }

}
