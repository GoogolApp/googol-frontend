import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { User } from '../../../_models/user';
import { SearchedProfilePage } from '../searched-profile/searched-profile';
import { UsersService } from '../../../_services/users';

@Component({
  selector: 'page-followers',
  templateUrl: 'followers.html',
})
export class FollowersPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private userService: UsersService, 
    private loadingController: LoadingController,
    private events: Events) {

    this.getFollowersUserFirst();
    this.events.subscribe('reloadDetails',() => {
      this.getFollowersUser();
     });
  }

  user = new User();
  private followers:User[] = [];

  async getFollowersUserFirst(){
    let loading = this.loading();
    await loading;
    this.userService.getAllFollowers().subscribe(
      user=> {
        this.user = user;
        this.followers = user.followers;
        loading.dismiss();
      },
      err =>{
        console.log(err);
        loading.dismiss();
      }
    ) 
  }

  getFollowersUser(){
    this.userService.getAllFollowers().subscribe(
      user=> {
        this.user = user;
        this.followers = user.followers;
      },
      err =>{
        console.log(err);
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
