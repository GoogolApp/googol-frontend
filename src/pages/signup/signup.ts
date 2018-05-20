import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public alert:AlertController, public usersService:UsersService) {
  }

  createUser(){
    if(this.password !== this.password_confirm){
      this.presentAlert("As senhas não combinam!")
    }else{
      let user = new User(this.username, this.email, this.password);
      
      this.usersService.create(user).subscribe(
        data => {
          this.presentAlert("Usuário criado com sucesso!");
          this.clearFields();
          this.goSignIn();
        },
        err => {
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
