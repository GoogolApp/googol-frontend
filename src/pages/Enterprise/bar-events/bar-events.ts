import { Component, OnInit } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { OwnerService } from '../../../_services/owner';
import {EventsService} from "../../../_services/events";

@Component({
  selector: 'bar-events',
  templateUrl: 'bar-events.html'
})
export class BarEvents implements OnInit{

  owner: any;
  events: any;

  constructor(
    public navCtrl: NavController,
    private ownerService: OwnerService,
    private loadingController: LoadingController,
    private eventsService: EventsService
  ) {
    this.owner = { bar: {}}
    this.events = [];
  }

  async ngOnInit(){
    const loading = this.loading();
    await this.getOwner();
    await this.fetchEvents();
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
      .sort((ev1, ev2) => new Date(ev1.match.matchDate) -  new Date(ev2.match.matchDate));
  }
}
