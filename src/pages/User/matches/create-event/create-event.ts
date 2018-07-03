import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Searchbar, AlertController } from 'ionic-angular';
import { EventsService } from '../../../../_services/events';
import { SearchBarTab } from '../../search/search-bar/search-bar';
import { SearchPage } from '../../search/search';
import { SearchBarEventPage } from './search-bar-event/search-bar-event';
import { User } from '../../../../_models/user';
import { UsersService } from '../../../../_services/users';

@Component({
    selector: 'page-create-event',
    templateUrl: 'create-event.html'
})
export class CreateEventPage {

    match: any;
    place: any;
    placeName: string = '';
    public idEventBar: string;
    user = new User();
    private events = {};

    constructor(
        public navCtrl: NavController,
        private navParams: NavParams,
        private eventsService: EventsService,
        private modalCtrl: ModalController,
        private userService: UsersService,
        private alert: AlertController
    ) {
        this.match = this.navParams.get('match');
        this.initPlace();
        this.fetchEvents();
    }

    initPlace() {
        this.placeName = '';
    }

    fetchEvents(){
        this.eventsService.getAll().subscribe(data=> {
            this.events = data;
            console.log(this.events);
          },
          err =>{
            console.log(err);
          })
    }

    

    createEvent() {
        this.eventsService.create(this.match._id, this.idEventBar).subscribe(
            data => {
                this.editedUserAlert('Evento cadastrado com sucesso!');
            },
            err => {
                this.presentAlert(err.error.message);
            }
        );
        this.navCtrl.pop();
    }

    editedUserAlert(message) {
        let alert = this.alert.create({
          title: 'Sucesso!',
          subTitle: message,
          buttons: ['OK']
        });
        alert.present();
      }

      presentAlert(message) {
        let alert = this.alert.create({
          title: 'Atenção',
          subTitle: message,
          buttons: ['Entendido']
        });
        alert.present();
      }

    addLocationModal() {
        let modal = this.modalCtrl.create(SearchBarEventPage);
        modal.onDidDismiss(place => {
            this.place = place;
            this.placeName = place.name;
            this.idEventBar = place._id;
        })
        modal.present();
    }
}
