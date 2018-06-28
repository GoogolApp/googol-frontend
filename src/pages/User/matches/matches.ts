import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { MatchesService } from '../../../_services/matches';

import { Match } from '../../../_models/match';
import { FilterMatchesModal } from './filter-matches/filter-matches';
import _ from 'lodash';

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html'
})
export class MatchesPage implements OnInit{

  matches: Match[] = [];
  filteredMatches: Match[] = [];

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private matchesService: MatchesService, 
    private loadingController: LoadingController) {}

  async ngOnInit(){
    await this.fetchMatches();
  }

  loading = this.loadingController.create({
    content: 'Buscando partidas...',
    spinner: 'bubbles'
  });

  openFilterModal() {
    let modal = this.modalCtrl.create(FilterMatchesModal, {'matches': this.matches});
    modal.present();

    modal.onDidDismiss(data => {
      this.filterMatches(data);
    });
  }

  filterMatches(filterOptions) {
    if(filterOptions !== undefined) {
      if(_.isEqual(filterOptions,{})) {
        this.filteredMatches = this.matches;
      } else if(filterOptions.favorites !== false) {
        this.filteredMatches = _.filter(this.matches, function(match) {
          return _.includes(filterOptions.favorites, match.homeTeam) || _.includes(filterOptions.favorites, match.awayTeam);
        });
      } else {
        this.filteredMatches = _.filter(this.matches, function(match) {
          return _.includes(filterOptions.leagues, match.league) 
          || _.includes(filterOptions.teams, match.homeTeam) || _.includes(filterOptions.teams, match.awayTeam);
        });
      }
    }
  }

  fetchMatches(){
    this.loading.present();

    this.matchesService.getAll().subscribe(
      matches => {
        this.matches = [];
        this.matches = matches.map(function (match) {
          const currDate = new Date();
          const date = new Date(match.matchDate);

          date.setTime(date.getTime() + date.getTimezoneOffset()*60*1000);
          match.matchDate = date;

          let timeDiff = currDate.getTime() - date.getTime();
          if(timeDiff/3600000 <= 2.5) {
            return match;
          }
        });
        this.matches = this.matches.filter(match => match !== undefined);
        this.filteredMatches = this.matches;
        this.loading.dismiss();
      },error => {
        this.loading.dismiss();
        console.log(error);
      }
    );
  }

}
