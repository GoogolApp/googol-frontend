import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ModalController} from 'ionic-angular';
import { SignInPage } from '../signin/signin';
import { User } from '../../_models/user';
import { UsersService } from '../../_services/users';
import  { LocationModal } from './location-modal/location-modal';

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

  selectedLocation = {
    name: "",
    place_id: "",
    latitude: 0,
    longitude: 0
  }

  loading = this.loadingController.create({
    content: 'Por favor, aguarde...',
    spinner: 'bubbles'
  });

  constructor(public navCtrl: NavController, public alert:AlertController, public usersService:UsersService, public loadingController: LoadingController, public modalController: ModalController) {
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

  async createUser(){
    if(this.validateFields()){

      this.loading.present();

      if(this.type === 'user'){
        await this.createNormalUser();
      }
      
      if (this.type === 'manager'){

      }
    }
  }

  async createNormalUser(){
    let user = new User(this.username, this.email, this.password);
      
      await this.usersService.create(user).subscribe(
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

  openLocationModal(){
    let modal = this.modalController.create(LocationModal);
    modal.onDidDismiss(data => {
        console.log(data);
        this.selectedLocation.place_id = data.place_id;
        this.selectedLocation.name = data.name;
        this.selectedLocation.latitude = data.geometry.location.lat();
        this.selectedLocation.longitude = data.geometry.location.lng();
    })
    modal.present();
  }

}
