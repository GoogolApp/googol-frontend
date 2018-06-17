import { Component, EventEmitter } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { User } from '../../_models/user';
import { UsersService } from '../../_services/users';
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
  
  constructor(public navCtrl: NavController, private userService: UsersService, private loadingController: LoadingController) {
  }


  private users:User[] = [];
  showList: boolean = false;
  currentSearch: string;

  loading = this.loadingController.create({
    content: 'Buscando usuário...',
    spinner: 'bubbles'
  });

  showPageUser(id: string) {
    localStorage.setItem('searchedUser', JSON.stringify(id));
    this.navCtrl.push(SearchedProfilePage);
  }

  async searchUser(username:string) {
    this.searchEmitter.emit(this.inputSearch);
    if(username != undefined && this.currentSearch !== username.trim()) {
      this.currentSearch = username;
      if(username !== undefined && username.trim() != "") {
        await this.fetchUsers(username);
      } else {
        this.showList = false;
      }
    }
  }
  
  fetchUsers(input:string) {
    this.loading.present();

    this.userService.getByUsername(input).subscribe(
      users => {
        this.users = [];
        this.users = users;
        this.showList = this.users.length !== 0;
        this.loading.dismiss();
      },
      error => {
        this.loading.dismiss();
      }
    );
  }

}
