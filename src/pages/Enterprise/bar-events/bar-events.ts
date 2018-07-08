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
    await this.getOwner();
    await this.fetchEvents();
  }

  getOwner () {
    const loading = this.loading();
    let id = JSON.parse(localStorage.getItem('authUser')).ownerId;
    this.ownerService.getOne(id).subscribe( owner => {
        loading.dismiss();
        this.owner = owner;
      }
    );
  }

  loading () {
    let loading = this.loadingController.create({
      content: 'Por favor, aguarde...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }

  fetchEvents () {
    const loading = this.loading();

    this.eventsService.getAll().subscribe(
      events => {
        this.events = [];
        this.events = events.filter(event => event.bar._id === this.owner.bar._id);
        loading.dismiss();
      },
      error => {
        loading.dismiss();
      }
    );
  }
}
