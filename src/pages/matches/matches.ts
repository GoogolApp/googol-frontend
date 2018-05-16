import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MatchesService } from '../../_services/matches';

import { Match } from '../../_models/match';

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html'
})
export class MatchesPage implements OnInit{

  matches: Match[];

  constructor(public navCtrl: NavController, private matchesService: MatchesService) {}

  ngOnInit(){
    this.fetchMatches();
  }

  fetchMatches(){
    this.matches = this.matchesService.getAll();
  }

}
