import { Component, Input } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';

import { Event } from '../../../../_models/event';

import { EventStates} from "../../../../_models/eventStates";

@Component({
  selector: 'bar-events-card',
  templateUrl: 'bar-events-card.html'
})

export class BarEventsCardComponent {

  @Input() event: Event;
  @Input() confirmEventCb: Function;
  @Input() removeEventCb: Function;

  confirmedByUserEventState = EventStates.CREATED_BY_USER;
  deletedByUserEventState = EventStates.DELETED_BY_USER;
  unconfirmedByOwnerEventState = EventStates.UNCONFIMED_BY_OWNER;

  constructor(
    public navCtrl:NavController,
    public actionSheetCtrl:ActionSheetController
  ) {
  }

}
