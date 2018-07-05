import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { AllEventsTab } from './all-events/all-events';
import { MyEventsTab } from './my-events/my-events';

import { FilterEventsModal } from './filter-events/filter-events'

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage{

private filter: any = {};

  tab1 = AllEventsTab;
  tab2 = MyEventsTab;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {}

  openFilterModal() {
    let modal = this.modalCtrl.create(FilterEventsModal);
    modal.present();

    modal.onDidDismiss(data => this.filter = data);
  }

}
