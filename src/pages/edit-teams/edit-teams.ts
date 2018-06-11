import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyTeamsPage } from './my-teams/my-teams';
import { AllTeamsPage } from './all-teams/all-teams';

@Component({
  selector: 'page-edit-teams',
  templateUrl: 'edit-teams.html',
})
export class EditTeamsPage {

  tab1 = MyTeamsPage;
  tab2 = AllTeamsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
