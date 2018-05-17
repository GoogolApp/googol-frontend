import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AllEventsTab } from './all-events/all-events';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage{

  tab1 = AllEventsTab;

  constructor(public navCtrl: NavController) {}

}
