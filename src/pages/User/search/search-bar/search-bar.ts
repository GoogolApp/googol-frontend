import { Component } from "@angular/core";
import { NavParams, LoadingController, NavController } from "ionic-angular/";
import { Bar } from "../../../../_models/bar";
import { BarService } from "../../../../_services/bar";
import { SearchedBarPage } from "../../searched-bar/searched-bar";

@Component({
    selector: 'tab-search-bar',
    templateUrl: 'search-bar.html'
})

export class SearchBarTab {

    public inputBar:string;
    private bars:Bar[] = [];
    showList: boolean = false;
    currentSearch: string;

    constructor(navParams:NavParams, public navCtrl: NavController, private barService: BarService, 
        private loadingController: LoadingController) {
        if(navParams) {
            navParams.data.subscribe(
                searchResult => {
                    this.inputBar = searchResult;
                    this.searchBar(this.inputBar);
                }
            );
        }
    }

    loading = this.loadingController.create({
        content: 'Buscando estabelecimento...',
        spinner: 'bubbles'
    });

    showPageBar(id: string) {
        localStorage.setItem('searchedBar', JSON.stringify(id));
        this.navCtrl.parent.parent.push(SearchedBarPage);
    }

    async searchBar(barname:string) {
        if(barname != undefined && this.currentSearch !== barname.trim()) {
            this.currentSearch = barname;
            if(barname !== undefined && barname.trim() != "") {
                await this.fetchBars(barname);
            } else {
                this.showList = false;
            }
        }
    }
    
    fetchBars(input:string) {
        this.loading.present();

        this.barService.getByName(input).subscribe(
            bars => {
                this.bars = [];
                this.bars = bars;
                this.showList = this.bars.length !== 0;
                this.loading.dismiss();
            },
            error => {
                this.loading.dismiss();
            }
        );
    }
}