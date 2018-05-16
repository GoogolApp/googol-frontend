import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FeedPage } from '../feed/feed';
import { ProfilePage } from '../profile/profile';
import { MatchesPage } from '../matches/matches';
import { EventsPage } from '../events/events';
import { SearchPage } from '../search/search';

import { AuthService } from '../../_services/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild(Nav) nav: Nav;

  rootPage: any = FeedPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public auth:AuthService, public app:App) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [ 
      { title: 'Feed', component: FeedPage },
      { title: 'Meu Perfil', component: ProfilePage },
      { title: 'Jogos', component: MatchesPage },
      { title: 'Eventos', component: EventsPage },
      { title: 'Buscar', component: SearchPage }
    ];

  }

  logout(){
    this.auth.signOut();
    this.app.getRootNav().popToRoot();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}