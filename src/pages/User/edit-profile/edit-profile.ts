import { Component } from '@angular/core';
import { NavController, AlertController, Events, LoadingCmp, LoadingController } from 'ionic-angular';
import { User } from '../../../_models/user';
import { UsersService } from '../../../_services/users';
import { EditTeamsPage } from '../edit-teams/edit-teams';
import { ProfilePage } from '../profile/profile';

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

  constructor(
    public navCtrl: NavController, 
    private userService: UsersService, 
    public alert: AlertController,
    private loadingController: LoadingController,
    private events:Events) {

    let id = JSON.parse(localStorage.getItem('authUser')).userId;
    this.fetchUser(id);
  }

  async fetchUser(id: string) {
    let loading = this.loading();
    await loading;
    this.userService.getOne(id).subscribe(
      data => {
        this.user = data;
        loading.dismiss();

      },
      err => {
        console.log(err);
        loading.dismiss();

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
            this.saveEditions();
            this.clearFields();
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
            this.saveEditions();
            this.clearFields();
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
            this.saveEditions();
          },
          err => {
            //this.loading.dismiss();
            this.clearFields();
            this.presentAlert(err.error.message);

          });
      }
    }
  }

  loading() {
    let loading = this.loadingController.create({
      content: 'Por favor, aguarde...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }

  saveEditions() {
    this.events.publish('reloadDetails'); 
  }

  goToEditTeams() {
    this.navCtrl.push(EditTeamsPage, { "parentPage": ProfilePage });
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
    this.username = "";
    this.password = "";
    this.password_confirm = "";

  }

}
