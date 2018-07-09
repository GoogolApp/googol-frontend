import { Component, OnInit } from '@angular/core';
import { LoadingController, ViewController, NavParams } from 'ionic-angular/';
import { EventsService } from '../../../../_services/events';
import { SharedServiceEvents } from '../shared-service';
import { Event } from '../../../../_models/event';

@Component({
    selector: 'tab-all-events',
    templateUrl: 'all-events.html'
})

export class AllEventsTab implements OnInit{
    
    private events: Event[] = [];

    constructor(private eventsService: EventsService, private sharedService: SharedServiceEvents, private loadingController: LoadingController){}
    

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
                this.sharedService.emit(this.events);
                this.loading.dismiss();
            },
            error => {
                this.loading.dismiss();
            }
        );
    }
}
