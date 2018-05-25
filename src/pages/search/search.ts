import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../_models/user';
import { UsersService } from '../../_services/users';
import { EventsService } from '../../_services/events';
import { ProfilePage } from '../profile/profile';
import { SearchedProfilePage } from '../searched-profile/searched-profile';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  constructor(public navCtrl: NavController, private userService: UsersService) {
  }

  searchUser(id: string) {
    localStorage.setItem('searchedUser', JSON.stringify(id));
    this.navCtrl.push(SearchedProfilePage);
  }

}
