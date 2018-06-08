import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersService } from '../../../_services/users';
import { TeamService } from '../../../_services/team';
import { Team } from '../../../_models/team';

/**
 * Generated class for the AllTeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-teams',
  templateUrl: 'all-teams.html',
})
export class AllTeamsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private teamService: TeamService) {
    this.fetchTeams();
  }

  private teams:Team[] = [];
  public anyResult:boolean;
  showList: boolean = false;
  currentSearch: string;

  fetchTeams() {
    this.teamService.getAllTeams().subscribe(
      teams => {
        this.teams = [];
        this.teams = teams;
        console.log(teams);
      },
      error => {
        console.log(error);
      }
    );
  }

}
