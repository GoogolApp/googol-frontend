import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../../../_services/auth';

import { MyBarPage } from '../my-bar/my-bar';
import { PromotionsPage } from '../promotions/promotions';
import { ClaimBarPage } from '../claim-bar/claim-bar';
import { OwnerService } from '../../../_services/owner';
import {BarEvents} from "../bar-events/bar-events";

@Component({
  selector: 'owner-home',
  templateUrl: 'owner-home.html'
})
export class OwnerHomePage {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{title: string, component: any}>;
  owner: any = {bar: {}};

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth:AuthService,
    public app:App,
    public ownerService: OwnerService,
    public events: Events
  ) {

    let id = JSON.parse(localStorage.getItem('authUser')).ownerId;
    this.ownerService.getOne(id).subscribe(owner => {
      this.owner = owner;
      this.dynamicMenu();
    });

    events.subscribe("owner:hasBar", () => {
      this.ownerWithBarMenu();
    })

  }

  dynamicMenu(){
    if(this.owner.bar){
      this.ownerWithBarMenu();
    }else{
      this.ownerWithoutBarMenu();
    }
  }

  ownerWithBarMenu(){
    this.rootPage = MyBarPage;
    this.pages = [
      { title: 'Bar', component: MyBarPage },
      { title: 'Eventos', component: BarEvents },
      { title: 'Promoções', component: PromotionsPage }
    ];
  }

  ownerWithoutBarMenu(){
    this.rootPage = ClaimBarPage
    this.pages = [
      { title: 'Reivindicar Bar', component: ClaimBarPage }
    ];
  }

  logout(){
    this.auth.signOut();
    this.app.getRootNav().popToRoot();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
