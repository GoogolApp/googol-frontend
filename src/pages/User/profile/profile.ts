import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Events } from 'ionic-angular';
import { UsersService } from '../../../_services/users';
import { User } from '../../../_models/user';
import { EventsService } from '../../../_services/events';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { FollowingPage } from '../following/following';
import { FollowersPage } from '../followers/followers';
import { EditTeamsPage } from '../edit-teams/edit-teams';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage{

  user = new User();
  eventos = {};

  constructor(
    public navCtrl: NavController, 
    private userService : UsersService, 
    private eventsService : EventsService, 
    private loadingController: LoadingController,
    private events: Events) {
    
  }

  ionViewDidEnter(){
    let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
    this.fetchUserFirst(authUserId);
    this.fetchEvents();
    
  }


  fetchEvents(){
    this.eventos = this.eventsService.getAll();
  }

  async fetchUserFirst(id : string){
    let loading = this.loading();
    await loading;
    this.userService.getOne(id).subscribe(
      data=> {
        this.user = data;
        loading.dismiss();
      },
      err =>{
        console.log(err);
        loading.dismiss();
      }
    ) 
  }
  
  gotoEdit(){
    this.navCtrl.push(EditProfilePage, { "parentPage": this });
  }

  gotoFollowingPage(){
    this.navCtrl.push(FollowingPage, { "parentPage": this });
  }

  gotoFollowersPage(){
    this.navCtrl.push(FollowersPage, { "parentPage": this });
  }

  gotoTeamsPage(){
    this.navCtrl.push(EditTeamsPage, { "parentPage": this });
  }

  loading(){
    let loading = this.loadingController.create({
      content: 'Por favor, aguarde...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }


}
