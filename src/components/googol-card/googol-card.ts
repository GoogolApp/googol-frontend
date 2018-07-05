import { Component, Input } from '@angular/core';
import { NavController, ActionSheetController, AlertController } from 'ionic-angular';

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
  @Input() promotion: any;
  @Input() address: string;
  @Input() phone: string;
  @Input() place: string;
  @Input() action: string;

  currentDate = new Date();

  constructor(public navCtrl:NavController, public actionSheetCtrl:ActionSheetController, public alertCtrl: AlertController) {}

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

  navigateToPlace(){
    this.presentAlert('Aviso!', 'Recurso ainda não implementado');
  }

  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Entendido']
    });
    alert.present();
  }
}
