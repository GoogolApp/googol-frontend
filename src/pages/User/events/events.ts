import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { AllEventsTab } from './all-events/all-events';
import { MyEventsTab } from './my-events/my-events';

import { FilterEventsModal } from './filter-events/filter-events'
import { SharedServiceEvents } from './shared-service';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage{

private filter: any = {};
private info: any = {'bar':'tio lucio', 'times': ['brasil', 'belgica']};

  tab1 = AllEventsTab;
  tab2 = MyEventsTab;

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private sharedService: SharedServiceEvents) {
    sharedService.changeEmitted.subscribe(
      data => {
        console.log(data);
      }
    );
  }

  openFilterModal() {
    let modal = this.modalCtrl.create(FilterEventsModal, this.info);
    modal.present();

    modal.onDidDismiss(data => {
      this.filter = data;
      console.log(this.filter)
    });
  }

}
