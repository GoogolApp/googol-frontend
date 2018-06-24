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
    
    ngOnInit(): void {
        let matches:Match[] = this.navParams.get('matches');

        this.leagues = matches.map(function(match) {
            return match.league;
        });
        this.leagues = Array.from(new Set(this.leagues)).sort();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.selectedLeagues);
    }

    logIn(mail, password) {
        this.viewCtrl.dismiss({ mail: mail, password: password });
    }
}