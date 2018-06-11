import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { User } from '../../_models/user';
import { UsersService } from '../../_services/users';
import { EditTeamsPage } from '../edit-teams/edit-teams';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  user = new User();

  email: string = "";
  username: string = "";
  password: string = "";
  password_confirm: string = "";

  constructor(public navCtrl: NavController, private userService: UsersService, public alert: AlertController) {
    let id = JSON.parse(localStorage.getItem('authUser')).userId;
    this.fetchUser(id);
  }

  fetchUser(id: string) {
    this.userService.getOne(id).subscribe(
      data => {
        this.user = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  validateFields(): boolean {
    if (this.password === "" && this.username === "") {
      this.presentAlert("Você não realizou alterações!");
      return false;
    }
    if(this.password !== this.password_confirm) {
      this.presentAlert("As senhas não combinam!");
      return false;
    }
    return true;
  }
  save() {
    if (this.validateFields()) {
      if (this.username === "" && this.password !== "") {
        this.userService.saveEditions(this.user.username, this.password).subscribe(
          data => {
            this.editedUserAlert("Edicoes realizadas com sucesso!");
            this.user = data;
            this.goProfile();
          },
          err => {
            this.clearFields();
            this.presentAlert(err.error.message);
          })
      }
      else if (this.username !== "" && this.password === "") {
        this.userService.saveEditions(this.username, this.user.password).subscribe(
          data => {
            this.editedUserAlert("Edicoes realizadas com sucesso!");
            this.user = data;
            this.goProfile();
          },
          err => {
            this.clearFields();
            this.presentAlert(err.error.message);
          })
      }
      else {
        this.userService.saveEditions(this.username, this.password).subscribe(
          data => {
            this.editedUserAlert("Ediçoes realizadas com sucesso!");
            this.user = data;
            this.clearFields();
            this.goProfile();
          },
          err => {
            //this.loading.dismiss();
            this.clearFields();
            this.presentAlert(err.error.message);

          });
      }
    }
  }

  goProfile() {
    this.navCtrl.getPrevious();
  }

  goToEditTeams() {
    this.navCtrl.push(EditTeamsPage);
  }

  editedUserAlert(message) {
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

  clearFields() {
    this.email = "";
    this.password = "";
    this.password_confirm = "";

  }

}
