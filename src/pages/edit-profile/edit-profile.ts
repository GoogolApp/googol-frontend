import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../_models/user';
import { UsersService } from '../../_services/users';

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
  eventos = {};

  constructor(public navCtrl: NavController, private userService : UsersService) {
    let id = JSON.parse(localStorage.getItem('authUser')).userId;
    this.fetchUser(id);
  }

  fetchUser(id : string){
    this.userService.getOne(id).subscribe(
      data=> {
        console.log(data)
        this.user = data;
      },
      err =>{
        console.log(err);
      }
    ) 
  }

}
