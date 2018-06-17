import { Component, EventEmitter } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { User } from '../../../_models/user';
import { UsersService } from '../../../_services/users';
import { SearchedProfilePage } from '../searched-profile/searched-profile';
import { SearchUserTab } from './search-user/search-user';
import { SearchBarTab } from './search-bar/search-bar';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  public searchEmitter: EventEmitter<string> = new EventEmitter<string>();
  public inputSearch:string;

  tab1:any = SearchUserTab;
  tab2:any = SearchBarTab;
  
  constructor() {
  }

  async search() {
    this.searchEmitter.emit(this.inputSearch);
  }

}
