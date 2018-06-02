import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ComponentsModule } from '../components/components.module';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';

import { FeedPage } from '../pages/feed/feed';
import { ProfilePage } from '../pages/profile/profile';
import { MatchesPage } from '../pages/matches/matches';
import { CreateEventPage } from '../pages/matches/create-event/create-event';
import { EventsPage } from '../pages/events/events';
import { AllEventsTab } from '../pages/events/all-events/all-events';
import { MyEventsTab } from '../pages/events/my-events/my-events';
import { SearchPage } from '../pages/search/search';
import { SignInPage } from '../pages/signin/signin';
import { SignUpPage } from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../_services/auth';
import { MatchesService } from '../_services/matches';
import { EventsService } from '../_services/events';
import { UsersService } from '../_services/users';
import { SearchedProfilePage } from '../pages/searched-profile/searched-profile';
import {TokenInterceptor} from "../_providers/auth.interceptor";
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

@NgModule({
  declarations: [
    MyApp,
    FeedPage,
    ProfilePage,
    MatchesPage,
    CreateEventPage,
    EventsPage,
    AllEventsTab,
    MyEventsTab,
    SearchPage,
    SearchedProfilePage,
    EditProfilePage,
    SignInPage,
    SignUpPage,
    HomePage
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FeedPage,
    ProfilePage,
    MatchesPage,
    CreateEventPage,
    EventsPage,
    AllEventsTab,
    MyEventsTab,
    SearchPage,
    SearchedProfilePage,
    EditProfilePage,
    SignInPage,
    SignUpPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    MatchesService,
    EventsService,
    UsersService,
    {provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true}
  ]
})
export class AppModule {}
