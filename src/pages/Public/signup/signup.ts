import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController} from 'ionic-angular';
import { SignInPage } from '../signin/signin';

import { User } from '../../../_models/user';
import { UsersService } from '../../../_services/users';
import { Owner } from '../../../_models/owner';
import { OwnerService } from '../../../_services/owner';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignUpPage {

  type: string = "user";

  email: string = "";
  username: string = "";
  password: string = "";
  password_confirm: string = "";

  constructor(
    public navCtrl: NavController,
    public alert:AlertController,
    public usersService:UsersService,
    public ownerService:OwnerService,
    public loadingController: LoadingController) {
  }

  validateFields() : boolean {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.type === "user"){
      if(this.email === "" || this.username === "" || this.password === "" || this.password === "") {
        this.presentAlert("Preencha todos os campos!");
        return false;
      }
    }

    if (this.type === "owner"){
      if(this.email === "" || this.password === "" || this.password === "") {
        this.presentAlert("Preencha todos os campos!");
        return false;
      }
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

  async createUser(){
    if(this.validateFields()){

      let loading = this.loading();

      if(this.type === 'user'){
        await this.createNormalUser(loading);
      }
      
      if (this.type === 'owner'){
        await this.createOwner(loading);
      }
    }
  }

  async createNormalUser(loading){
    let user = new User(this.username, this.email, this.password);
      
      await this.usersService.create(user).subscribe(
        data => { 
          loading.dismiss();
          this.createdUserAlert("Usuário criado com sucesso!");
          this.clearFields();
          this.goSignIn();
        },
        err => {
          loading.dismiss();
          this.presentAlert(err.error.message);
        }
    )
  }

  async createOwner(loading){
    
    let owner  = new Owner(this.email, this.password);

    await this.ownerService.create(owner).subscribe(
      data => {
        loading.dismiss();
        this.createdUserAlert("Empresário criado com sucesso!");
        this.clearFields();
        this.goSignIn();
      },
      error => {
        loading.dismiss();
        this.presentAlert(error.error.message);
      }
    )
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

  loading(){
    let loading = this.loadingController.create({
      content: 'Por favor, aguarde...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }

  goSignIn(){
    this.navCtrl.push(SignInPage, {}, {animate: false});
  }

}
