import { Component } from "@angular/core";
import { NavParams } from "ionic-angular/";

@Component({
    selector: 'tab-search-bar',
    templateUrl: 'search-bar.html'
})

export class SearchBarTab {

    public searchInput:string;

    constructor(navParams:NavParams) {
        if(navParams) {
            navParams.data.subscribe(
                searchResult => this.searchInput = searchResult
            );
        }
    }
}