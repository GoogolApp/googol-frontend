import { Component, Input } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';

import { CreateEventPage } from '../../pages/matches/create-event/create-event'; 
import { MatchesPage } from '../../pages/matches/matches';

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

  @Input() match: any;
  @Input() action: string;

  currentDate = new Date();

  constructor(public navCtrl:NavController, public actionSheetCtrl:ActionSheetController) {
    console.log('Hello GoogolCardComponent Component');
  }

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
