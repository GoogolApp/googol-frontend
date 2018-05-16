import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MatchesService } from '../../app/_services/matches';

@Component({
  selector: 'page-matches',
  templateUrl: 'matches.html'
})
export class MatchesPage implements OnInit{

  matches: any;

  constructor(public navCtrl: NavController, private matchesService: MatchesService) {}

  ngOnInit(){
    this.getMatches();
  }

  getMatches(){
    this.matches = this.matchesService.getAll();
  }

}
