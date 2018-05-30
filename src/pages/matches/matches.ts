import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MatchesService } from '../../_services/matches';

import { Match } from '../../_models/match';

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html'
})
export class MatchesPage implements OnInit{

  matches: Match[] = [];
  /*matches: Match[] = [
    new Match(
        1,
        "Brasileirão Série A",
        new Date(2018, 4, 16, 13, 0, 0, 0),
        "Botafogo",
        "https://ssl.gstatic.com/onebox/media/sports/logos/KLDWYp-H8CAOT9H_JgizRg_96x96.png",
        "Fluminense",
        "https://ssl.gstatic.com/onebox/media/sports/logos/fCMxMMDF2AZPU7LzYKSlig_96x96.png"
    ),
    new Match(
        2,
        "Champions League",
        new Date(2018, 4, 26, 15, 45, 0, 0),
        "Real Madrid",
        "https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZeCJWRcKoLW7koA_96x96.png",
        "Liverpool",
        "https://ssl.gstatic.com/onebox/media/sports/logos/0iShHhASp5q1SL4JhtwJiw_96x96.png"
    )
];*/

  constructor(public navCtrl: NavController, private matchesService: MatchesService) {}

  async ngOnInit(){
    await this.fetchMatches();
  }

  fetchMatches(){
    this.matchesService.getAll().subscribe(
      matches => {
        this.matches = [];
        this.matches = matches.map(function (match) {
         const date = new Date(match.matchDate);
         date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000);
         match.matchDate = date;
         return match;
        })
      },error => {
        console.log(error);
      }
    );
  }

}
