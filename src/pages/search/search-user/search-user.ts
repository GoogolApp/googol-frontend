import { Component, OnInit } from "@angular/core";
import { NavParams, LoadingController, NavController } from "ionic-angular/";
import { UsersService } from "../../../_services/users";
import { User } from "../../../_models/user";
import { SearchedProfilePage } from "../../searched-profile/searched-profile";

@Component({
    selector: 'tab-search-user',
    templateUrl: 'search-user.html'
})

export class SearchUserTab implements OnInit{
    ngOnInit(): void {
        console.log("iniciou search-user");
    }

    public inputUser:string;

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

    private users:User[] = [];
    showList: boolean = false;
    currentSearch: string;

    loading = this.loadingController.create({
        content: 'Buscando usuário...',
        spinner: 'bubbles'
    });

    showPageUser(id: string) {
        localStorage.setItem('searchedUser', JSON.stringify(id));
        this.navCtrl.push(SearchedProfilePage);
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