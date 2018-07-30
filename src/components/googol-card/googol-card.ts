import { Component, Input } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';

import { CreateEventPage } from '../../pages/User/matches/create-event/create-event';
import { Match } from '../../_models/match';
import { Event } from '../../_models/event';
import { EventsService } from '../../_services/events';

@Component({
  selector: 'googol-card',
  templateUrl: 'googol-card.html'
})
/**
 * Action types
 * ADD_EVENT
 * CONFIRM_PRESENCE
 * SHOW
 * NONE
 */
export class GoogolCardComponent {

  @Input() match: Match;
  @Input() event: Event;
  @Input() myEvent: Event;
  @Input() promotion: string;
  @Input() place: string;
  @Input() action: string;
  @Input() addEventFn: Function;
  @Input() reloadView: Function;
  @Input() address: string;
  @Input() phone: string;
  @Input() updateAllEventsFn: Function;

  currentDate = new Date();
  currentUser = JSON.parse(localStorage.getItem('authUser'));

  constructor(
    public navCtrl:NavController,
    public actionSheetCtrl:ActionSheetController,
    public eventsService: EventsService
  ) {}

  isPresenceConfirmed(){
    let res: boolean = false
    
    this.event.attendants.forEach( user => {
      if(user._id === this.currentUser.userId){
        res =  true;
      }
    });

    return res;
  }

  confirmPresence() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Tem certeza que deseja confirmar presença?',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            this.eventsService.confirmPresence(this.event._id).subscribe(
              data => {
                this.updateAllEventsFn();
              }
            );
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    actionSheet.present();
  }

  unconfirmPresence() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Tem certeza que deseja desconfirmar presença?',
      buttons: [
        {
          text: 'Desconfirmar',
          handler: () => {
            this.eventsService.unconfirmPresence(this.event._id).subscribe(
              data => {
                this.updateAllEventsFn();
              }
            );
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    actionSheet.present();
  }


  createEvent(){
    console.log(this.navCtrl.getViews());
    this.navCtrl.push(CreateEventPage, { match: this.match });
  }

  deleteEvent() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Tem certeza que deseja remover o evento?',
      buttons: [
        {
          text: 'Remover',
          role: 'confirm',
          handler: () => {
            this.eventsService.remove(this.myEvent._id).subscribe(
              removedEvent => {
                console.log('Evento removido');
                console.log(removedEvent);
                this.reloadView();
              },
              error => {
                console.log("Erro ao remover evento!")
              }
            );
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Remoção cancelada');
          }
        }
      ]
    });

    actionSheet.present();
  }

}
