import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarService } from '../../../_services/bar';
import { Bar } from '../../../_models/bar';

@Component({
  selector: 'page-searched-bar',
  templateUrl: 'searched-bar.html',
})

export class SearchedBarPage {

  currentBar = new Bar();

  constructor(public navCtrl: NavController, public navParams: NavParams, private barService: BarService) {
    let id = JSON.parse(localStorage.getItem('searchedBar'));
    this.fetchBar(id);
  }

  fetchBar(id:string) {
    this.barService.getOne(id).subscribe(
      res => {
        this.currentBar = res;
      },
      err => {
        console.log(err);
      }
    );
  }

}
