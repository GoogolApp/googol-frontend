import { Component } from '@angular/core';
import { AlertController, LoadingController, NavParams, ViewController } from 'ionic-angular';

import { MatchesService } from "../../../../_services/matches";
import { EventsService } from "../../../../_services/events";

import { Bar } from "../../../../_models/bar";
import { Owner } from "../../../../_models/owner";

@Component({
  templateUrl: 'create-event-modal.html'
})
export class CreateEventModal {

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private matchesService: MatchesService,
    private loadingController: LoadingController,
    private eventService: EventsService
  ) {}

  createEventCallback: Function;
  matches = [];
  barEvents = [];
  bar:Bar;
  owner:Owner;

  ngOnInit(): void {
    this.createEventCallback = this.addEvent.bind(this);

    const owner:Owner = this.params.get('owner');
    const barEvents = this.params.get('barEvents');

    this.owner = owner;
    this.bar = owner.bar;
    this.barEvents = barEvents;

    this.fetchMatches();
  }

  loading () {
    let loading = this.loadingController.create({
      content: 'Por favor, aguarde...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  _showCreateEventConfirmationAlert (successCb) {
    let alert = this.alertCtrl.create({
      title: "Atenção",
      subTitle: 'Tem certeza que deseja criar o evento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: successCb
        }
      ]
    });
    alert.present();
  }

  addEvent (match) {
    const successCb = async () => {
      console.log("eventService.create");
      await this.eventService.create(match._id, this.bar._id, this.owner._id).toPromise();
      this.matches = this.matches.filter(m => m._id !== match._id);
    };
    console.log(match);
    console.log("add event");
    this._showCreateEventConfirmationAlert(successCb);
  }

  async fetchMatches () {
    const loading = this.loading();
    const matches = await this.matchesService.getAll().toPromise();
    this.matches = matches
      .map((match) => {
        const currDate = new Date();
        const date = new Date(match.matchDate);

        date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000);
        match.matchDate = date;

        let timeDiff = currDate.getTime() - date.getTime();
        if(timeDiff/3600000 <= 2.5) {
          return match;
        }
      })
      .filter(match => {
        if (!match) return false;

        let isOnBarEvents = false;

        this.barEvents.forEach(event => {
          if (event.match._id === match._id) {
            isOnBarEvents = true;
          }
        });

        return !isOnBarEvents;
      });

    loading.dismiss();
  }

}
