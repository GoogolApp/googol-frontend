import { Component, Input } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';

import { CreateEventPage } from '../../pages/User/matches/create-event/create-event';
import { Match } from '../../_models/match';
import { Event } from '../../_models/event';

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
  @Input() promotion: string;
  @Input() place: string;
  @Input() action: string;

  currentDate = new Date();

  constructor(public navCtrl:NavController, public actionSheetCtrl:ActionSheetController) {}

  confirmPresence() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Tem certeza que deseja confirmar presença?',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Confirmado');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  createEvent(){
    console.log(this.navCtrl.getViews());
    this.navCtrl.push(CreateEventPage, { match: this.match });
  }
}
