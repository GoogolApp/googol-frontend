import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { User } from '../../_models/user';
import { UsersService } from '../../_services/users';
import { SearchedProfilePage } from '../searched-profile/searched-profile';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  constructor(public navCtrl: NavController, private userService: UsersService, private loadingController: LoadingController) {
  }

  private users:User[] = [];
  public anyResult:boolean;
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
    if(this.currentSearch !== username.trim()) {
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
        console.log(this.users);
        this.showList = this.users.length !== 0;
        console.log(this.showList);
        this.loading.dismiss();
      },
      error => {
        this.loading.dismiss();
        console.log(error);
      }
    );
  }

}
