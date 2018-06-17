import { Component } from "@angular/core";
import { NavParams } from "ionic-angular/";

@Component({
    selector: 'tab-search-user',
    templateUrl: 'search-user.html'
})

export class SearchUserTab {

    public searchInput:string;

    constructor(navParams:NavParams) {
        if(navParams) {
            navParams.data.subscribe(
                searchResult => this.searchInput = searchResult
            );
        }

    }
}