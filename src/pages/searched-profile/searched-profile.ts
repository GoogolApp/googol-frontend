import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../_models/user';
import { UsersService } from '../../_services/users';
import { EventsService } from '../../_services/events';

/**
 * Generated class for the SearchedProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searched-profile',
  templateUrl: 'searched-profile.html',
})
export class SearchedProfilePage {
  userSearch = new User();
  eventos = {};

  constructor(public navCtrl: NavController, private userService : UsersService, private eventsService : EventsService) {
    let id = JSON.parse(localStorage.getItem('searchedUser'));
    this.fetchUser(id);
    this.fetchEvents();
  }

  fetchEvents(){
    this.eventos = this.eventsService.getAll();
  }

  fetchUser(id : string){
    this.userService.getOne(id).subscribe(
      data=> {
        console.log(data)
        this.userSearch = data;
      },
      err =>{
        console.log(err);
      }
    ) 
  }

  followUser() {
    this.userService.follow('add', this.userSearch._id).subscribe(
      data =>{
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

}
