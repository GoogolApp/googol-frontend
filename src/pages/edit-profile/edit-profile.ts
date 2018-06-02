import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../_models/user';
import { UsersService } from '../../_services/users';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  user = new User();

  email: string = "";
  username: string = "";

  constructor(public navCtrl: NavController, private userService : UsersService, public alert:AlertController) {
    let id = JSON.parse(localStorage.getItem('authUser')).userId;
    this.fetchUser(id);
  }

  fetchUser(id : string){
    this.userService.getOne(id).subscribe(
      data=> {
        this.user = data;
      },
      err =>{
        console.log(err);
      }
    ) 
  }

  save(){
    if(this.username === ""){
      this.userService.saveEditions(this.user.username, this.email).subscribe(
        data=> {
          this.editedUserAlert("Edicoes realizadas com sucesso!");
          this.user = data;
          this.goProfile();
        },
        err =>{
          console.log(err);
        })}
    else{
      this.userService.saveEditions(this.username, this.email).subscribe(
        data=> {
          this.editedUserAlert("Ediçoes realizadas com sucesso!");
          this.user = data;
          this.goProfile();
        },
        err =>{
          console.log(err);
        });
    } 
  }

  goProfile(){
    this.navCtrl.getPrevious();
  }

  editedUserAlert(message) {
    let alert = this.alert.create({
      title: 'Sucesso!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
