import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { UsersService } from '../../_services/users';
import { User } from '../../_models/user';
import { EventsService } from '../../_services/events';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { FollowingPage } from '../following/following';
import { FollowersPage } from '../followers/followers';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit{

  mockUser = {
    name: "Rick Sanchez",
    username: "@ricksanchez", 
    following: "87",
    followers: "854",
    reputation: "32",
    favoriteTeams:[""],
    lastMatch:{
      league: "UEFA Champions League",
      home: {
        img: "",
        name: "Bayern München",
        score: 1
      },
      away: {
        img: "",
        name: "RealMadrid",
        score: 2
      },
      location: "Bar do Agostini, Campina Grande"
    }
  };

  user = new User();
  private following:User[] = [];
  eventos = {};

  constructor(public navCtrl: NavController, private userService : UsersService, private eventsService : EventsService, private loadingController: LoadingController) {
    let id = JSON.parse(localStorage.getItem('authUser')).userId;
    this.fetchUser(id);
    this.fetchEvents();
  }

  ngOnInit(){
    this.fetchUser(JSON.parse(localStorage.getItem('authUser')).userId);
  }

  fetchEvents(){
    this.eventos = this.eventsService.getAll();
  }

  async fetchUser(id : string){
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
    this.navCtrl.push(EditProfilePage);
  }

  gotoFollowingPage(){
    this.navCtrl.push(FollowingPage);
  }

  gotoFollowersPage(){
    this.navCtrl.push(FollowersPage);
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
