import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  match = {
    league: "Brasileirão Série A",
    location: "Bar do Agostini, Campina Grande",
    hour: new Date(2018, 4, 14, 20, 0, 0, 0),
    home: {
      name: "Botafogo",
      logo: "https://ssl.gstatic.com/onebox/media/sports/logos/KLDWYp-H8CAOT9H_JgizRg_96x96.png"
    },
    away: {
      name: "Fluminense",
      logo: "https://ssl.gstatic.com/onebox/media/sports/logos/fCMxMMDF2AZPU7LzYKSlig_96x96.png"
    }
  }

  constructor(public navCtrl: NavController) {

  }

}
