import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../../_services/events';
import { Event } from '../../../../_models/event';

@Component({
    selector: 'tab-all-events',
    templateUrl: 'all-events.html'
})

export class AllEventsTab implements OnInit{
    
    events: Array<Event> = [];

    constructor(private eventsService: EventsService, private loadingController: LoadingController){}
    
    loading = this.loadingController.create({
        content: 'Buscando eventos...',
        spinner: 'bubbles'
    });

    async ngOnInit(){
        await this.fetchEvents();
      }
    
    fetchEvents(){
        this.loading.present();

        this.eventsService.getAll().subscribe(
            events => {
                this.events = [];
                this.events = events;
                console.log(events);
                this.loading.dismiss();
            },
            error => {
                this.loading.dismiss();
            }
        );
    }
}
