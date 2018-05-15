import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../app/_services/auth';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SignInPage {

  user: string = "";
  pass: string = "";

  constructor(public navCtrl: NavController, public auth: AuthService) {
  }

  fakeAuth(){
    this.auth.fakeAuth(this.user, this.pass);
    this.navCtrl.push(HomePage, {}, {animate: false});
  }

}
