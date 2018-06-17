import { Component } from "@angular/core";
import { NavParams, LoadingController, NavController } from "ionic-angular/";
import { UsersService } from "../../../_services/users";
import { User } from "../../../_models/user";
import { SearchedProfilePage } from "../../searched-profile/searched-profile";

@Component({
    selector: 'tab-search-user',
    templateUrl: 'search-user.html'
})

export class SearchUserTab {

    public inputUser:string;
    private users:User[] = [];
    showList: boolean = false;
    currentSearch: string;

    constructor(navParams:NavParams, public navCtrl: NavController, private userService: UsersService, 
        private loadingController: LoadingController) {
        if(navParams) {
            navParams.data.subscribe(
                searchResult => {
                    this.inputUser = searchResult;
                    this.searchUser(this.inputUser);
                }
            );
        }
    }

    loading = this.loadingController.create({
        content: 'Buscando usuário...',
        spinner: 'bubbles'
    });

    showPageUser(id: string) {
        localStorage.setItem('searchedUser', JSON.stringify(id));
        this.navCtrl.parent.parent.push(SearchedProfilePage);
    }

    async searchUser(username:string) {
        if(username != undefined && this.currentSearch !== username.trim()) {
            this.currentSearch = username;
            if(username !== undefined && username.trim() != "") {
                await this.fetchUsers(username);
            } else {
                this.showList = false;
            }
        }
    }
    
    fetchUsers(input:string) {
        this.loading.present();

        this.userService.getByUsername(input).subscribe(
            users => {
                this.users = [];
                this.users = users;
                this.showList = this.users.length !== 0;
                this.loading.dismiss();
            },
            error => {
                this.loading.dismiss();
            }
        );
    }
}