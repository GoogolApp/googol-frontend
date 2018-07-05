import { Component, OnInit } from "@angular/core";
import { NavParams, NavController, ViewController } from "ionic-angular/";

@Component({
    selector: 'filter-events',
    templateUrl: 'filter-events.html'
})

export class FilterEventsModal implements OnInit {
    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    }

    ngOnInit(): void {
        
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}