import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AllEventsTab } from './all-events/all-events';
import { MyEventsTab } from './my-events/my-events';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage{

  tab1 = AllEventsTab;
  tab2 = MyEventsTab;

  constructor(public navCtrl: NavController) {}

}
