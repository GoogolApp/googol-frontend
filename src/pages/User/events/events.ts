import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController, Tab } from 'ionic-angular';

import { AllEventsTab } from './all-events/all-events';
import { MyEventsTab } from './my-events/my-events';

import { FilterEventsModal } from './filter-events/filter-events'

import { Event } from '../../../_models/event';
import { EventsService } from '../../../_services/events';

import _ from 'lodash';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage implements OnInit{
  
  tab1 = AllEventsTab;
  tab2 = MyEventsTab;

  private allEvents = [];
  private myEvents = [];
  currentTab = 0;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController,
      private loadingController: LoadingController, 
      private eventsService: EventsService) {
  }

  ngOnInit() {
    this.fetchAllEvents();
    this.fetchMyEvents();
  }

  tabSelected(tab: Tab) {
    this.currentTab = tab.index;
  }

  async openFilterModal() {
    let modal;
    let eventsToPass = [];

    if(this.currentTab === 0) {
      await this.fetchAllEvents();
      eventsToPass = this.allEvents;
    } else {
      await this.fetchMyEvents();
      eventsToPass = this.myEvents;
    }
    modal = this.modalCtrl.create(FilterEventsModal, {'events': eventsToPass});
    modal.present();

    modal.onDidDismiss(data => {
      if(this.currentTab === 0) {
        this.filterAllEvents(data.bars, data.teams);
      } else {
        this.filterMyEvents(data.bars, data.teams);
      }
    });
  }

  loading = this.loadingController.create({
    content: 'Buscando eventos...',
    spinner: 'bubbles'
  });

  filterAllEvents(bars, teams) {
    bars = bars.map((bar) => bar._id);
    const aux = this.allEvents.filter((event:Event) => {
      return _.includes(bars, event.bar._id) || _.includes(teams, event.match.homeTeam) || _.includes(teams, event.match.awayTeam);
    });
    this.allEvents.splice(0, this.allEvents.length);
    this.allEvents.push(...aux);
  }

  filterMyEvents(bars, teams) {
    bars = bars.map((bar) => bar._id);
    const aux = this.myEvents.filter((event:Event) => {
      return _.includes(bars, event.bar._id) || _.includes(teams, event.match.homeTeam) || _.includes(teams, event.match.awayTeam);
    });
    this.myEvents.splice(0, this.myEvents.length);
    this.myEvents.push(...aux);
  }

  async fetchAllEvents(){
    this.loading.present();

    const events = await this.eventsService.getAll().toPromise();
    events.sort((e1, e2) => {
      return (+new Date(e1.match.matchDate)) - (+new Date(e2.match.matchDate));
    });
    this.allEvents.splice(0, this.allEvents.length);
    this.allEvents.push(...events);
    console.log('terminou fetch all events')
    this.loading.dismiss();

  }

  async fetchMyEvents(){
    this.loading.present();

    const auth = localStorage.getItem('authUser');
    const userId = JSON.parse(auth).userId;
    
    const events = await this.eventsService.getById(userId).toPromise();
    events.sort((e1, e2) => {
      return (+new Date(e1.match.matchDate)) - (+new Date(e2.match.matchDate));
    });
    this.myEvents.splice(0, this.myEvents.length);
    this.myEvents.push(...events);
    this.loading.dismiss();
  }

}
