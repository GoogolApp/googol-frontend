import { Component } from "@angular/core";
import { NavParams, LoadingController } from "ionic-angular";
import { Bar } from "../../../../_models/bar";
import { UsersService } from '../../../../_services/users';

@Component({
    selector: 'bars-tab',
    templateUrl: 'bars-tab.html'
})

export class BarsTab {

    private bars: Bar[] = [];
    private showPageBar: Function;

    constructor(public navParams: NavParams, private userService: UsersService, private loadingController: LoadingController){
        this.showPageBar = navParams.data.showPageBarCb;
    }

    async fetchBars() {
        const loading = this.loading();
        const bars = await this.userService.getFollowingBars().toPromise();
        this.bars = bars;
        console.log(this.bars)
        loading.dismiss();
    }

    loading(){
        let loading = this.loadingController.create({
          content: 'Por favor, aguarde...',
          spinner: 'bubbles'
        });
    
        loading.present();
        return loading;
    }

    ionViewWillEnter() {
        this.fetchBars();
    }
}