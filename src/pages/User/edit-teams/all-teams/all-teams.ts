import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { TeamService } from '../../../../_services/team';
import { Team } from '../../../../_models/team';
import { UsersService } from '../../../../_services/users';
import { User } from '../../../../_models/user';

@Component({
  selector: 'page-all-teams',
  templateUrl: 'all-teams.html',
})
export class AllTeamsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private teamService: TeamService,
    private loadingController: LoadingController,
    private userService: UsersService,
    private event:Events
    ) {
  }

  ionViewDidEnter(){
    let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
    this.fetchUser(authUserId);
    //this.fetchTeams();
  }

  private user = new User();
  private teams: Team[] = [];
  
  fetchUser(id : string){
    
    this.userService.getOne(id).subscribe(
      data=> {
        this.user = data;
        this.fetchTeams();
        
      },
      err =>{
        console.log(err);
       
      }
    ) 
  }

  async fetchTeams() {
    let loading = this.loading();
    await loading;

    this.teamService.getAllTeams().subscribe(
      teams => {
        this.teams = [];
          this.teams = teams.filter((team) => {
            return !this.followTrue(team._id);
            
          });
          loading.dismiss();
          this.teams.sort((team1, team2) => {
            if (team1.name < team2.name) {
              return -1;
            }else if (team1.name > team2.name) {
              return 1;
            }return 0;   
        }
        );
                      
      },
      error => {
        console.log(error);
        loading.dismiss();
         
      }
    );
  }

  async addTeam(teamId : string) {
    let loading = this.loading();
    await loading;
    this.userService.addTeam('add', teamId).subscribe(
      data =>{
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

  saveTeams() {

    this.event.publish('reloadDetails');

  }

  refresh(){
    let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
    this.fetchUser(authUserId);
    this.fetchTeams();
  }

  followTrue(idTeam:string){
    const teamsId = this.user.favTeams.map((team) => team._id);
    if(teamsId.indexOf(idTeam) === -1){
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
