import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';

import { AllEventsTab } from './all-events/all-events';
import { MyEventsTab } from './my-events/my-events';

import { FilterEventsModal } from './filter-events/filter-events'

import { Event } from '../../../_models/event';
import { EventsService } from '../../../_services/events';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage implements OnInit{
 
private filter: any = {};
private events: Event[] = [];

tab1 = AllEventsTab;
tab2 = MyEventsTab;

allEvents = [];
myEvents = [];

constructor(public navCtrl: NavController, private modalCtrl: ModalController,
    private loadingController: LoadingController, 
    private eventsService: EventsService) {
}

ngOnInit() {
  this.fetchAllEvents();
  this.fetchMyEvents();
}

openFilterModal() {
  let modal = this.modalCtrl.create(FilterEventsModal, {'events': this.events});
  modal.present();

  modal.onDidDismiss(data => {
    if(data !== undefined || data !== {}) {
      this.filter = data;
    }
    console.log(this.filter)
  });
}

loading = this.loadingController.create({
  content: 'Buscando eventos...',
  spinner: 'bubbles'
});

  fetchAllEvents(){
    this.loading.present();

    this.eventsService.getAll().subscribe(
        events => {
            this.allEvents.splice(0, this.allEvents.length);
            this.allEvents.push(...events);
            this.loading.dismiss();
        },
        error => {
            this.loading.dismiss();
        }
    );
  }

  fetchMyEvents(){
    this.loading.present();

    const auth = localStorage.getItem('authUser');
    const userId = JSON.parse(auth).userId;
    
    this.eventsService.getById(userId).subscribe(
        events => {
            this.myEvents.splice(0, this.myEvents.length);
            this.myEvents.push(...events);
            this.loading.dismiss();
        },
        error => {
            this.loading.dismiss();
        }
    );
  }
}
