import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { User } from '../../_models/user';
import { UsersService } from '../../_services/users';
import { EventsService } from '../../_services/events';
import { ProfilePage } from '../profile/profile';
import { SearchedProfilePage } from '../searched-profile/searched-profile';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage implements OnInit{

  async ngOnInit() {
    await this.fetchUsers();
  }
  constructor(public navCtrl: NavController, private userService: UsersService, private loadingController: LoadingController) {
  }

  private users:User[] = [];
  public filteredUsers:User[] = [];
  public anyResult:boolean;

  loading = this.loadingController.create({
    content: 'Buscando usuário...',
    spinner: 'bubbles'
  });

  showPageUser(id: string) {
    localStorage.setItem('searchedUser', JSON.stringify(id));
    this.navCtrl.push(SearchedProfilePage);
  }

  searchUser(input:string){
    this.filteredUsers = [];
    this.anyResult = false;
    
    this.users.forEach(user => {
      if(user.username.toLowerCase().includes(input.toLowerCase())) {
        this.filteredUsers.push(user);
        this.anyResult = true;
      }
    });
  }

  fetchUsers() {
    this.loading.present();

    this.userService.getAll().subscribe(
      users => {
        this.resetFields();
        this.users = users;
        this.loading.dismiss();
      },
      error => {
        this.loading.dismiss();
        console.log(error)
      }
    );
  }

  private resetFields(){
    this.users = [];
  }
}
