import { Component, Input } from '@angular/core';
import { ActionSheetController } from 'ionic-angular'

@Component({
  selector: 'googol-card',
  templateUrl: 'googol-card.html'
})
/**
 * Action types
 * ADD_EVENT
 * CONFIRM_PRESENCE
 * NONE
 */
export class GoogolCardComponent {

  @Input() match: any;
  @Input() action: string;

  currentDate = new Date();

  constructor(public actionSheetCtrl:ActionSheetController) {
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
}
