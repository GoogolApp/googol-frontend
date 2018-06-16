import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../../_services/events';
import { Event } from '../../../../_models/event';

@Component({
    selector: 'tab-my-events',
    templateUrl: 'my-events.html'
})

export class MyEventsTab implements OnInit{
    
    events: Array<Event> = [];

    constructor(public eventsService: EventsService){}
    
    ngOnInit(){
        this.fetchEvents();
      }
    
    fetchEvents(){
        this.events = this.eventsService.getAll();
    }
}