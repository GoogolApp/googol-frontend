import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { SignInPage } from '../signin/signin';

import { User } from '../../_models/user';

import { UsersService } from '../../_services/users';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignUpPage {

  email: string = "";
  username: string = "";
  password: string = "";
  password_confirm: string = "";

  loading = this.loadingController.create({
    content: 'Por favor, aguarde...',
    spinner: 'bubbles'
  });

  constructor(public navCtrl: NavController, public alert:AlertController, public usersService:UsersService, public loadingController: LoadingController) {
  }

  validateFields() : boolean {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(this.email === "" || this.username === "" || this.password === "" || this.password === "") {
      this.presentAlert("Preencha todos os campos!");
      return false;
    }
    if(!regex.test(this.email)) {
      this.presentAlert("E-mail inválido!");
      return false;
    }
    if(this.password !== this.password_confirm) {
      this.presentAlert("As senhas não combinam!");
      return false;
    }

    return true;
  }

  createUser(){
    if(this.validateFields()){

      this.loading.present();

      let user = new User(this.username, this.email, this.password);
      
      this.usersService.create(user).subscribe(
        data => {
          this.loading.dismiss();
          this.createdUserAlert("Usuário criado com sucesso!");
          this.clearFields();
          this.goSignIn();
        },
        err => {
          this.loading.dismiss();
          this.presentAlert("Usuário não pode ser criado!")
        }
      )
    }
  }

  clearFields(){
    this.email = "";
    this.username = "";
    this.password =  "";
    this.password_confirm = "";
  }

  createdUserAlert(message) {
    let alert = this.alert.create({
      title: 'Sucesso!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  presentAlert(message) {
    let alert = this.alert.create({
      title: 'Atenção',
      subTitle: message,
      buttons: ['Entendido']
    });
    alert.present();
  }

  goSignIn(){
    this.navCtrl.push(SignInPage, {}, {animate: false});
  }

}
