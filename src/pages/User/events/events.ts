import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { AllEventsTab } from './all-events/all-events';
import { MyEventsTab } from './my-events/my-events';

import { FilterEventsModal } from './filter-events/filter-events'
import { SharedServiceEvents } from './shared-service';

import { Event } from '../../../_models/event';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage{

private filter: any = {};
private events: Array<Event> = [];
private info: any = {'bar':'tio lucio', 'times': ['brasil', 'belgica']};

tab1 = AllEventsTab;
tab2 = MyEventsTab;

constructor(public navCtrl: NavController, private modalCtrl: ModalController, private sharedService: SharedServiceEvents) {
  sharedService.changeEmitted.subscribe(
    data => {
      this.events = data;
    }
  );
}

openFilterModal() {
  let modal = this.modalCtrl.create(FilterEventsModal, {'events': this.events});
  modal.present();

  modal.onDidDismiss(data => {
    this.filter = data;
    console.log(this.filter)
  });
}

}
