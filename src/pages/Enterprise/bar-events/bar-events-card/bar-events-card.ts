import { Component, Input } from '@angular/core';
import { NavController, ActionSheetController, ModalController, ViewController } from 'ionic-angular';

import { Event } from '../../../../_models/event';

import { EventStates} from "../../../../_models/eventStates";
import { UsersEventsPage } from '../../users-events/users-events';
import { User } from '../../../../_models/user';
import { EventsService } from '../../../../_services/events';

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
    public actionSheetCtrl:ActionSheetController,
    public viewCtrl: ViewController,
    public modalController: ModalController
    
  ) {

  }
  gotoUsersEvent(id: string){
    const modal = this.modalController.create(UsersEventsPage, {id:id});
    modal.present();
  }
}
