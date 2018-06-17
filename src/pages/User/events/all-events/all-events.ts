import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../../_services/events';
import { Event } from '../../../../_models/event';

@Component({
    selector: 'tab-all-events',
    templateUrl: 'all-events.html'
})

export class AllEventsTab implements OnInit{
    
    events: Array<Event> = [];

    constructor(public eventsService: EventsService){}
    
    ngOnInit(){
        this.fetchEvents();
      }
    
    fetchEvents(){
        this.events = this.eventsService.getAll();
    }
}