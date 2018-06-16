import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamService } from '../../../../_services/team';
import { Team } from '../../../../_models/team';

@Component({
  selector: 'page-all-teams',
  templateUrl: 'all-teams.html',
})
export class AllTeamsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private teamService: TeamService,private loadingController: LoadingController) {
    this.fetchTeams();
  }

  private teams: Team[] = [];
  public anyResult: boolean;
  showList: boolean = false;
  currentSearch: string;

  async fetchTeams() {
    let loading = this.loading();
    await loading;
    this.teamService.getAllTeams().subscribe(
      teams => {
        this.teams = [];
        this.teams = teams;
        teams.sort((team1, team2) => {
          if (team1.name < team2.name) {
            return -1;
          }else if (team1.name > team2.name) {
            return 1;
          }return 0;
        }
        );
        loading.dismiss();                
      },
      error => {
        console.log(error);
        loading.dismiss(); 
      }
    );
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
