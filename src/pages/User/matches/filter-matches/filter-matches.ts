import { Component, OnInit } from "@angular/core";
import { NavController, ViewController, NavParams } from "ionic-angular/";

import { Match } from "../../../../_models/match";
import { UsersService } from "../../../../_services/users";

@Component({
    selector: 'filter-matches',
    templateUrl: 'filter-matches.html'
})
export class FilterMatchesModal implements OnInit{
    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, private userService: UsersService) {
    }
    
    leagues: string[] = [];
    selectedLeagues: string[] = [];

    teams: string[] = [];
    selectedTeams: string[] = [];

    favorites:any = false;
    
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
        this.viewCtrl.dismiss();
    }

    applyFilters() {
        let filters = {
            'leagues': this.selectedLeagues,
            'teams': this.selectedTeams,
            'favorites': this.favorites
        }

        if(this.favorites) {
            let userId = JSON.parse(localStorage.getItem('authUser')).userId;
            this.userService.getOne(userId).subscribe(
                async user => {
                    filters.favorites = await user.favTeams.map(team => team.name);
                }
            );
        } else {
            filters.favorites = this.favorites;
        }

        this.viewCtrl.dismiss(filters);
    }

    clearFilters() {
        let filter = {};
        this.viewCtrl.dismiss(filter);
    }

}