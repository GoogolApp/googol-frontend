import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsersService } from '../../../_services/users';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage{
  
  feed = [];

  constructor(
    public navCtrl: NavController,
    private userService: UsersService
  ) {
    this.fetchFeed();
  }

  fetchFeed(){
    let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
    this.userService.getFeed(authUserId).then( feed => this.feed = this.fisherYatesShuffle([...feed]));
  }

  fisherYatesShuffle(arr) {
    let currentI = arr.length, randomI;
    while (currentI !== 0) {
      randomI = Math.floor(Math.random() * currentI--);
      [arr[currentI], arr[randomI]] = [arr[randomI], arr[currentI]]
    }
    return arr;
  }

}
