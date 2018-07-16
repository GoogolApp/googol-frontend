import { Component, OnInit } from '@angular/core';
import { LoadingController } from 'ionic-angular/';
import _ from 'lodash';

import { EventsService } from '../../../../_services/events';
import { SharedServiceEvents } from '../shared-service';

import { Event } from '../../../../_models/event';

@Component({
    selector: 'tab-all-events',
    templateUrl: 'all-events.html'
})

export class AllEventsTab implements OnInit{
    
    private events: Event[] = [];

    constructor(private eventsService: EventsService, private sharedService: SharedServiceEvents, private loadingController: LoadingController){
        sharedService.changeEmitted.subscribe(
            data => {
              console.log(data)
            }
        );
    }
    

    loading = this.loadingController.create({
        content: 'Buscando eventos...',
        spinner: 'bubbles'
    });

    async ngOnInit(){
        await this.fetchEvents();
    }

    ionViewWillEnter() {
        this.sharedService.emit({'events': this.events});
    }
    
    fetchEvents(){
        this.loading.present();

        this.eventsService.getAll().subscribe(
            events => {
                this.events = [];
                this.events = events;
                this.sharedService.emit({'events': this.events});
                this.loading.dismiss();
            },
            error => {
                this.loading.dismiss();
            }
        );
    }
}
