import { Component } from "@angular/core";
import { NavController, ViewController, NavParams } from "ionic-angular/";

@Component({
    selector: 'filter-matches',
    templateUrl: 'filter-matches.html'
})
export class FilterMatchesModal {
    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
    }
    
    dismiss() {
        this.viewCtrl.dismiss();
    }
}