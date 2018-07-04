import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { User } from '../../../../_models/user';
import { Team } from '../../../../_models/team';
import { UsersService } from '../../../../_services/users';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UsersService,
    private loadingController: LoadingController,
    private events: Events) {
  }

  ionViewDidEnter(){
    let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
    this.fetchUser(authUserId);
  }

  private user = new User();
  private teams: Team[] = [];

  async fetchUser(id: string) {
    let loading = this.loading();
    await loading;
    this.userService.getOne(id).subscribe(
      user => {
        this.user = user;
        this.teams = [];
        this.teams = this.user.favTeams;
        this.teams.sort((team1, team2) => {
          if (team1.name < team2.name) {
            return -1;
          } else if (team1.name > team2.name) {
            return 1;
          } return 0;
        });
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    )
  }

  async removeTeam(teamId: string) {
    let loading = this.loading();
    await loading;
    this.userService.addTeam('remove', teamId).subscribe(
      data => {
        this.teams = this.teams.filter((team) => {
          this.saveTeams();
          return team._id !== teamId;
        });
        loading.dismiss();
      },
      err => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  followTrue(idTeam: string) {
    const teamsId = this.user.favTeams.map((team) => team._id);
    if (teamsId.indexOf(idTeam) === -1) {
      return false;
    } else {
      return true;
    }
  }

  saveTeams() {

    this.events.publish('reloadDetails');

  }

  refresh() {
    let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
    this.fetchUser(authUserId);
  }

  loading() {
    let loading = this.loadingController.create({
      content: 'Por favor, aguarde...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }
}
