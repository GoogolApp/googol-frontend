import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SignInPage } from '../pages/signin/signin';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = SignInPage;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
    });
  }
}
