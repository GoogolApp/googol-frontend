import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

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

  constructor(public navCtrl: NavController) {
    
  }

}
