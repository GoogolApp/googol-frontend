import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { BarService } from '../../../_services/bar';
import { Bar } from '../../../_models/bar';
import { User } from '../../../_models/user';
import { UsersService } from '../../../_services/users';

@Component({
  selector: 'page-searched-bar',
  templateUrl: 'searched-bar.html',
})

export class SearchedBarPage {

  currentBar = new Bar();
  userSearch = new User();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private barService: BarService,
    private userService: UsersService,
    private loadingController : LoadingController) {
    
    let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
    let id = JSON.parse(localStorage.getItem('searchedBar'));
    this.fetchUser(authUserId);
    this.fetchBar(id);

  }

  getPromoContent () {
    const promo = this.currentBar.promo;
    return promo ?  promo.content : "";
  }

  fetchBar(id:string) {
    this.barService.getOne(id).subscribe(
      res => {
        this.currentBar = res;
      },
      err => {
        console.log(err);
      }
    );
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

  async followBar() {
    this.userService.followBar('add', this.currentBar._id).subscribe(
      data =>{
        console.log('seguiu');
        this.userSearch = data;
        this.fetchBar(this.currentBar._id);
      },
      err => {
        console.log(err);
      }
    );
  }

  async unfollowBar(){
    this.userService.followBar('remove', this.currentBar._id).subscribe(
      data =>{
        console.log('deseguiu');
        this.userSearch = data;
        this.fetchBar(this.currentBar._id);
      },
      err => {
        console.log(err);
      }
    );
  }


  followTrue(){
    if(this.userSearch.followingBars.indexOf(this.currentBar._id) === -1){
      return false;
    }else{
      return true;
    }

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
