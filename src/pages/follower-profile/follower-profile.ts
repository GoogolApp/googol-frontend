import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { User } from '../../_models/user';
import { UsersService } from '../../_services/users';
import { EventsService } from '../../_services/events';



@Component({
  selector: 'page-follower-profile',
  templateUrl: 'follower-profile.html',
})
export class FollowerProfilePage {

  userSearch = new User();
  eventos = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private userService : UsersService, 
    private eventsService : EventsService,
    private loadingController: LoadingController,
    private events: Events) {

    let id = this.navParams.get("id");
    this.fetchUser(id);
    this.fetchEvents();
  }


  fetchEvents(){
    this.eventos = this.eventsService.getAll();
  }

  async fetchUser(id : string){
    let loading = this.loading();
    await loading;
    this.userService.getOne(id).subscribe(
      data=> {
        this.userSearch = data;
        loading.dismiss();
      },
      err =>{
        console.log(err);
        loading.dismiss();
      }
    ) 
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
