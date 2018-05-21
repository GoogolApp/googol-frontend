import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsersService } from '../../_services/users';
import { User } from '../../_models/user';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage{

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
