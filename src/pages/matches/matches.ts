import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { MatchesService } from '../../_services/matches';

import { Match } from '../../_models/match';

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html'
})
export class MatchesPage implements OnInit{

  matches: Match[] = [];

  constructor(public navCtrl: NavController, private matchesService: MatchesService, private loadingController: LoadingController) {}

  async ngOnInit(){
    await this.fetchMatches();
  }

  loading = this.loadingController.create({
    content: 'Buscando partidas...',
    spinner: 'bubbles'
  });

  fetchMatches(){
    this.loading.present();

    this.matchesService.getAll().subscribe(
      matches => {
        this.matches = [];
        this.matches = matches.map(function (match) {
         const date = new Date(match.matchDate);
         date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000);
         match.matchDate = date;
         return match;
        });
        this.loading.dismiss();
      },error => {
        this.loading.dismiss();
        console.log(error);
      }
    );
  }

}
