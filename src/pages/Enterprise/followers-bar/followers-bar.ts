import { Component} from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { User } from '../../../_models/user';
import { UsersService } from '../../../_services/users';

@Component({
  selector: 'page-followers-bar',
  templateUrl: 'followers-bar.html',
})
export class FollowersBarPage{
  
  followers:string[] = [];
  users:User[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingController: LoadingController,
    private userService: UsersService
  ) {
  }

  async ngOnInit(){
    this.followers = this.navParams.get("followers");
    console.log(this.navParams.get("followers"));
    await this.fecthUser();
  }

  loading(){
    let loading = this.loadingController.create({
      content: 'Por favor, aguarde...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }

  fecthUser(){
    this.followers.forEach(element => {
      this.userService.getOne(element).subscribe(
        data=> {
          console.log(data);
          this.users.push(data);
        },
        err =>{
          console.log(err);
        }
      )
      
    });
  }

}
