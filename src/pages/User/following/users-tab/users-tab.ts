import { Component } from "@angular/core";
import { NavParams, LoadingController } from "ionic-angular";
import { User } from "../../../../_models/user";
import { UsersService } from '../../../../_services/users';

@Component({
    selector: 'users-tab',
    templateUrl: 'users-tab.html'
})

export class UsersTab {

    private users: User[] = [];
    private showPageUser: Function;

    constructor(public navParams: NavParams, private userService: UsersService, private loadingController: LoadingController) {
        this.showPageUser = navParams.data.showPageUserCb;
    }

    async fetchUsers() {
        const loading = this.loading();
        const users = await this.userService.getFollowingUsers().toPromise();
        this.users = users;
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
        this.fetchUsers();
    }
    
}