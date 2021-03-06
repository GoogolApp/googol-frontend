import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';

import { OwnerService } from '../../../_services/owner';
import { EventsService } from "../../../_services/events";
import { CreateEventModal } from "./create-event-modal/create-event-modal";

import { EventStates } from "../../../_models/eventStates";

import { ListEventsTab } from "./list-events-tab/list-events-tab";

@Component({
  selector: 'bar-events',
  templateUrl: 'bar-events.html'
})
export class BarEvents implements OnInit{

  owner: any;
  events: any;
  tabsInfoLoaded = false;
  confirmEventCb: Function;
  removeEventCb: Function;

  pendingEvents = [];
  confirmedEvents = [];

  pendindEventsTabParams: Object;
  confirmedEventsTabParams: Object;

  confirmedEventsTab = ListEventsTab;
  pendingEventsTab = ListEventsTab;

  constructor(
    public navCtrl: NavController,
    private ownerService: OwnerService,
    private loadingController: LoadingController,
    private eventsService: EventsService,
    private modalController: ModalController
  ) {
    this.owner = { bar: {}}
    this.events = [];
  }

  async ngOnInit(){
    this.confirmEventCb = this.confirmEvent.bind(this);
    this.removeEventCb = this.removeEvent.bind(this);

    const loading = this.loading();
    await this.getOwner();
    await this.fetchEvents();

    this.buildTabsParams();
    this.tabsInfoLoaded = true;
    loading.dismiss();
  }

  async getOwner () {
    let id = JSON.parse(localStorage.getItem('authUser')).ownerId;
    this.owner = await this.ownerService.getOne(id).toPromise();
  }

  loading () {
    let loading = this.loadingController.create({
      content: 'Por favor, aguarde...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }

  async fetchEvents () {
    const events = await this.eventsService.getAll().toPromise();
    this.events = events
      .filter(event => event.bar._id === this.owner.bar._id)
      .sort((ev1, ev2) => (+new Date(ev1.match.matchDate)) -  (+new Date(ev2.match.matchDate)));

    this.pendingEvents.splice(0, this.pendingEvents.length);
    this.confirmedEvents.splice(0, this.confirmedEvents.length);

    this.pendingEvents.push(... this.events
      .filter(event => event.state === EventStates.CREATED_BY_USER));

    this.confirmedEvents.push(... this.events
      .filter(event => event.state === EventStates.CONFIRMED_BY_OWNER || event.state === EventStates.CREATED_BY_OWNER));
  }

  openCreateEventModal () {
    const modal = this.modalController.create(CreateEventModal, {
      'owner': this.owner,
      'barEvents': this.events
    });
    modal.onDidDismiss(obj => {
      this.fetchEvents();
    });
    modal.present();
  }

  async confirmEvent (event) {
    await this.eventsService.confirmEventByOwner(event._id).toPromise();
    this.pendingEvents.splice(this.pendingEvents.indexOf(event), 1);
    this.confirmedEvents.push(event);
  }

  async removeEvent (event) {
    await this.eventsService.removeEventByOwner(event._id).toPromise();
    event.state = EventStates.UNCONFIMED_BY_OWNER;
  }

  private buildTabsParams () {
    this.confirmedEventsTabParams = {
      events: this.confirmedEvents,
      emptyCollectionMessage: "Seu Bar não possui eventos confirmados."
    };

    this.pendindEventsTabParams = {
      events: this.pendingEvents,
      emptyCollectionMessage: "Seu bar não possui eventos a confirmar.",
      confirmEventCb: this.confirmEventCb,
      removeEventCb: this.removeEventCb
    };
  }
}
