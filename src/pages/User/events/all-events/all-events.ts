import { Component, OnInit } from '@angular/core';
import { LoadingController, NavParams } from 'ionic-angular/';
import _ from 'lodash';


import { Event } from '../../../../_models/event';

@Component({
    selector: 'tab-all-events',
    templateUrl: 'all-events.html'
})

export class AllEventsTab {
    
    private events: Event[] = [];

    constructor(private navParams: NavParams){
        this.events = navParams.data;
    }
    
}
