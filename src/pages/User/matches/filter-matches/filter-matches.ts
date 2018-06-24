import { Component, OnInit } from "@angular/core";
import { NavController, ViewController, NavParams } from "ionic-angular/";
import { Match } from "../../../../_models/match";

@Component({
    selector: 'filter-matches',
    templateUrl: 'filter-matches.html'
})
export class FilterMatchesModal implements OnInit{
    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    }
    
    leagues: string[] = [];
    selectedLeagues: string[] = [];

    teams: string[] = [];
    selectedTeams: string[] = [];
    
    ngOnInit(): void {
        let matches:Match[] = this.navParams.get('matches');

        this.leagues = this.getLeagues(matches);
        this.teams = this.getTeams(matches);
    }

    private getLeagues(matches: Match[]) {
        let leagues = matches.map(function (match) {
            return match.league;
        });
        return Array.from(new Set(leagues)).sort();
    }

    private getTeams(matches: Match[]) {
        let teams: string[] = [];
        matches.forEach(
            match => {
                teams.push(match.homeTeam);
                teams.push(match.awayTeam);
            }
        );
        return Array.from(new Set(teams)).sort();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.selectedLeagues);
    }

    logIn(mail, password) {
        this.viewCtrl.dismiss({ mail: mail, password: password });
    }
}