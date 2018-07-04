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
    
    async ngOnInit(){
        await this.fetchEvents();
    }
    
    fetchEvents(){
        const auth = localStorage.getItem('authUser');
        const userId = JSON.parse(auth).userId;
        this.eventsService.getById(userId).subscribe(
            events => {
                this.events = events;
            }
        );
    }
}