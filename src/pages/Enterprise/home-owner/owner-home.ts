import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../../../_services/auth';

import { MyBarPage } from '../my-bar/my-bar';
import { PromotionsPage } from '../promotions/promotions';
import { ClaimBarPage } from '../claim-bar/claim-bar';

@Component({
  selector: 'owner-home',
  templateUrl: 'owner-home.html'
})
export class OwnerHomePage {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyBarPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public auth:AuthService, public app:App) {
    this.pages = [ 
      { title: 'Meu Bar', component: MyBarPage },
      { title: 'Minhas Promoções', component: PromotionsPage },
      { title: 'ClaimBarTest', component: ClaimBarPage }
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
