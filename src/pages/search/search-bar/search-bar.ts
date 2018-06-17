import { Component, OnInit } from "@angular/core";
import { NavParams } from "ionic-angular/";

@Component({
    selector: 'tab-search-bar',
    templateUrl: 'search-bar.html'
})

export class SearchBarTab implements OnInit{
    ngOnInit(): void {
        console.log("iniciou search-bar");
    }

    public searchInput:string;

    constructor(navParams:NavParams) {
        if(navParams) {
            navParams.data.subscribe(
                searchResult => this.searchInput = searchResult
            );
        }
    }
}