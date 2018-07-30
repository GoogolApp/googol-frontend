import { Component} from '@angular/core';
import { NavParams } from 'ionic-angular/';


import { Event } from '../../../../_models/event';

@Component({
    selector: 'tab-all-events',
    templateUrl: 'all-events.html'
})

export class AllEventsTab {

    private events: Event[] = [];
    private updateAllEvents: Function;
    constructor(private navParams: NavParams){
        this.events = navParams.data.allEvents;
        this.updateAllEvents = navParams.data.fetchAllEventsCb;
    }

}
