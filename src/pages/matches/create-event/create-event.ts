import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'page-create-event',
    templateUrl: 'create-event.html'
})
export class CreateEventPage {

    match: any;

    constructor(public navCtrl: NavController, private navParams: NavParams) {
        console.log("EM CREATE EVENT === " + JSON.stringify(this.navParams.get('match'))); 
        this.match = this.navParams.get('match');
    }
}