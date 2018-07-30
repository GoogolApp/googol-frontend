import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular/';
import { Event } from '../../../../_models/event';

@Component({
    selector: 'tab-my-events',
    templateUrl: 'my-events.html'
})

export class MyEventsTab {

    private events: Event[] = [];
    reload: Function;

    constructor(private navParams: NavParams, private navCtrl: NavController){
        this.events = navParams.data.myEvents;
        this.reload = navParams.data.fetchMyEventsCb;
    }

}
