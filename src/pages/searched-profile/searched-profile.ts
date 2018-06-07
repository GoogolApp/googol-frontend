import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private userService : UsersService, private eventsService : EventsService,private loadingController: LoadingController) {
    let id = JSON.parse(localStorage.getItem('searchedUser'));
    this.fetchUser(id);
    this.fetchEvents();
  }

  loading = this.loadingController.create({
    content: 'Capturando usuário...',
    spinner: 'bubbles'
  });

  fetchEvents(){
    this.eventos = this.eventsService.getAll();
  }

  fetchUser(id : string){
    this.loading.present();
    this.userService.getOne(id).subscribe(
      data=> {
        this.userSearch = data;
        this.loading.dismiss();
      },
      err =>{
        console.log(err);
        this.loading.dismiss();
      }
    ) 
  }

  followTrue(){
    if(this.userSearch.followers.indexOf(JSON.parse(localStorage.getItem('authUser')).userId) === -1){
      return false;
    }else{
      return true;
    }

  }

  followUser() {
    this.userService.follow('add', this.userSearch._id).subscribe(
      data =>{
        this.fetchUser(this.userSearch._id);
      },
      err => {
        console.log(err);
      }
    );
  }

  unfollowUser(){
    this.userService.follow('remove', this.userSearch._id).subscribe(
      data =>{
        this.fetchUser(this.userSearch._id);
      },
      err => {
        console.log(err);
      }
    );
  }

}
