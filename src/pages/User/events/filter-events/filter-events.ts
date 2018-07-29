import { Component, OnInit } from "@angular/core";
import { NavParams, NavController, ViewController } from "ionic-angular/";
import { Event } from "../../../../_models/event";
import { Bar } from "../../../../_models/bar";

import _ from 'lodash';

@Component({
    selector: 'filter-events',
    templateUrl: 'filter-events.html'
})

export class FilterEventsModal implements OnInit {
    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    }

    private events: Event[] = [];

    private teams: string[] = [];
    private selectedTeams: string[] = [];

    private bars: any[] = [];
    private selectedBars: any[] = [];


    ngOnInit(): void {
        this.events = this.navParams.get('events');
        console.log(this.events);

        if(this.events.length > 0) {
            this.teams = this.getTeams(this.events);
            this.bars = this.getBars(this.events);
        }
    }

    dismiss(data?:any) {
        this.viewCtrl.dismiss({
            bars : this.bars,
            teams : this.teams
        });
    }

    applyFilters() {
        this.viewCtrl.dismiss({'bars': this.selectedBars, 'teams': this.selectedTeams});
    }

    private getTeams(events: Event[]) {
        let teams: string[] = [];
        events.forEach(
            event => {
                teams.push(event.match.homeTeam);
                teams.push(event.match.awayTeam);
            }
        );
        return Array.from(new Set(teams)).sort();
    }

    private getBars(events: Event[]) {
        let bars: Bar[] = [];
        events.forEach(
            event => {
                bars.push(event.bar);
            }
        );
        return _.uniqBy(bars, '_id');
    }
}