import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { EventsService } from '../../../_services/events';
import { Event } from '../../../_models/event';
import { User } from '../../../_models/user';
import { FollowerProfilePage } from '../../follower-profile/follower-profile';

@Component({
  selector: 'page-users-events',
  templateUrl: 'users-events.html',
})
export class UsersEventsPage {

  private users:User[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private eventsService: EventsService,
    private viewController: ViewController
    ) {
  }

  ionViewDidEnter() {
    this.fetchUsers();
  }

  fetchUsers(){
    let event_id = this.navParams.get('id');
    this.eventsService.getEventById(event_id).subscribe(
      data=> {
        this.users = data.attendants;
      },
      err =>{
        console.log(err);
      }
    )
  }

  showPageUser(id:string){
    this.navCtrl.push(FollowerProfilePage, {id:id})
  }


  dismiss(){
    this.viewController.dismiss();
  }
}
