import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { EventsService } from '../../../../_services/events';

@Component({
    selector: 'page-create-event',
    templateUrl: 'create-event.html'
})
export class CreateEventPage {

    match: any;

    constructor(public navCtrl: NavController, private navParams: NavParams, public eventsService: EventsService) {
        console.log("EM CREATE EVENT === " + JSON.stringify(this.navParams.get('match'))); 
        this.match = this.navParams.get('match');
    }

    createEvent(){
        this.eventsService.create(this.match);
        this.navCtrl.pop();
    }
}