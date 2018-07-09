import { Component, OnInit } from "@angular/core";
import { NavParams, NavController, ViewController } from "ionic-angular/";
import { Event } from "../../../../_models/event";

@Component({
    selector: 'filter-events',
    templateUrl: 'filter-events.html'
})

export class FilterEventsModal implements OnInit {
    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    }

    private events: Event[] = [];
    private teams: string[] = [];

    data = {'teste': 'hello world'}

    ngOnInit(): void {
        this.events = this.navParams.get('events');
        console.log(this.events);

        this.teams = this.getTeams(this.events);
    }

    dismiss(data?:any) {
        this.viewCtrl.dismiss(this.data);
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
}