import { Component, OnInit } from '@angular/core';
import { LoadingController, NavParams } from 'ionic-angular/';
import { EventsService } from '../../../../_services/events';
import { Event } from '../../../../_models/event';

@Component({
    selector: 'tab-my-events',
    templateUrl: 'my-events.html'
})

export class MyEventsTab {
    
    private events: Event[] = [];

    constructor(private navParams: NavParams){
        this.events = navParams.data;
    }
    

}