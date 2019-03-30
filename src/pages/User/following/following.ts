import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, Events, Tab } from 'ionic-angular';
import { User } from '../../../_models/user';
import { UsersService } from '../../../_services/users';
import { SearchedProfilePage } from '../searched-profile/searched-profile';

import { UsersTab } from "./users-tab/users-tab";
import { BarsTab } from "./bars-tab/bars-tab";

@Component({
  selector: 'page-following',
  templateUrl: 'following.html',
})
export class FollowingPage {

  tab1 = UsersTab;
  tab2 = BarsTab;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private userService: UsersService, 
    private loadingController: LoadingController,
    private events: Events) {
      
    }
    
  ionViewDidEnter(){
    this.getFollowingUserFirst();
    
  }
  
  user = new User();
  private following:User[] = [];
  
  

  async getFollowingUserFirst(){
    let loading = this.loading();
    await loading;
    this.userService.getAllFollowing().subscribe(
      user=> {
        this.user = user;
        this.following = user.following;
        loading.dismiss();
      },
      err =>{
        console.log(err);
        loading.dismiss();
      }
    ) 
  }

  showPageUser(id: string) {
    localStorage.setItem('searchedUser', JSON.stringify(id));
    this.navCtrl.push(SearchedProfilePage, { "parentPage": this });
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
