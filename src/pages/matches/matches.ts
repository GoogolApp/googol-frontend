import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html'
})
export class MatchesPage {

  match = {
    league: "Brasileirão Série A",
    hour: "Agora",
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
