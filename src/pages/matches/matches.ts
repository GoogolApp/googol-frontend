import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html'
})
export class MatchesPage {

  match = {
    league: "Brasileirão Série A",
    hour: new Date(2018, 4, 16, 11, 0, 0, 0),
    home: {
      name: "Botafogo",
      logo: "https://ssl.gstatic.com/onebox/media/sports/logos/KLDWYp-H8CAOT9H_JgizRg_96x96.png"
    },
    away: {
      name: "Fluminense",
      logo: "https://ssl.gstatic.com/onebox/media/sports/logos/fCMxMMDF2AZPU7LzYKSlig_96x96.png"
    }
  }

  match2 = {
    league: "Champions League",
    hour: new Date(2018, 4, 26, 15, 45, 0, 0),
    home: {
      name: "Real Madrid",
      logo: "https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZeCJWRcKoLW7koA_96x96.png"
    },
    away: {
      name: "Liverpool",
      logo: "https://ssl.gstatic.com/onebox/media/sports/logos/0iShHhASp5q1SL4JhtwJiw_96x96.png"
    }
  }

  constructor(public navCtrl: NavController) {

  } 

}
