import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FeedPage } from '../pages/feed/feed';
import { ProfilePage } from '../pages/profile/profile';
import { MatchesPage } from '../pages/matches/matches';
import { EventsPage } from '../pages/events/events';
import { SearchPage } from '../pages/search/search';
import { SignInPage } from '../pages/signin/signin';  

import { AuthService } from './_services/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public auth:AuthService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [ 
      { title: 'Feed', component: FeedPage },
      { title: 'Meu Perfil', component: ProfilePage },
      { title: 'Jogos', component: MatchesPage },
      { title: 'Eventos', component: EventsPage },
      { title: 'Buscar', component: SearchPage }
    ];

    if(this.auth.isAuthenticated()) {
      this.rootPage = MatchesPage;
    } else {
      this.rootPage = SignInPage;
    }

  }

  logout(){
    this.auth.signOut();
    this.nav.push(SignInPage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
