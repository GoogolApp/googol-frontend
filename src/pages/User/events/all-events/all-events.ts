import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../../_services/events';
import { Event } from '../../../../_models/event';
import { LoadingController } from 'ionic-angular';

@Component({
    selector: 'tab-all-events',
    templateUrl: 'all-events.html'
})

export class AllEventsTab implements OnInit {

    private events: Event[] = [];

    constructor(
        public eventsService: EventsService,
        private loadingController: LoadingController) { }

    ngOnInit() {
        this.fetchEvents();
    }

    async fetchEvents() {
        let loading = this.loading();
        await loading;
        this.eventsService.getAll().subscribe(
            data => {
                this.events = data;
                loading.dismiss();
                console.log(this.events);
            },
            err => {
                console.log(err);
                loading.dismiss();

            }
        )
    }

    loading() {
        let loading = this.loadingController.create({
            content: 'Por favor, aguarde...',
            spinner: 'bubbles'
        });

        loading.present();

        return loading;
    }
}