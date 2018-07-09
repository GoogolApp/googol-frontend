import { Component, OnInit } from '@angular/core';
import { LoadingController } from 'ionic-angular/';
import { EventsService } from '../../../../_services/events';
import { Event } from '../../../../_models/event';
import { SharedServiceEvents } from '../shared-service';

@Component({
    selector: 'tab-my-events',
    templateUrl: 'my-events.html'
})

export class MyEventsTab implements OnInit{
    
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

        const auth = localStorage.getItem('authUser');
        const userId = JSON.parse(auth).userId;
        
        this.eventsService.getById(userId).subscribe(
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