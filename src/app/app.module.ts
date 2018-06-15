import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';

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
import { LocationModal } from '../pages/signup/location-modal/location-modal'; 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../_services/auth';
import { MatchesService } from '../_services/matches';
import { EventsService } from '../_services/events';
import { UsersService } from '../_services/users';
import { Maps } from '../_config/maps.config';
import { BarService } from '../_services/bar';
import { OwnerService } from '../_services/owner';
import { OwnerHomePage } from '../pages/home-owner/owner-home';
import { SearchedProfilePage } from '../pages/searched-profile/searched-profile';
import {TokenInterceptor} from "../_providers/auth.interceptor";
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { MyBarPage } from '../pages/my-bar/my-bar';
import { EditTeamsPage } from '../pages/edit-teams/edit-teams';
import { MyTeamsPage } from '../pages/edit-teams/my-teams/my-teams';
import { AllTeamsPage } from '../pages/edit-teams/all-teams/all-teams';
import { TeamService } from '../_services/team';
import { FollowingPage } from '../pages/following/following';
import { FollowersPage } from '../pages/followers/followers';
import { PromotionsPage } from '../pages/promotions/promotions';


@NgModule({
  declarations: [
    MyApp,
    FeedPage,
    ProfilePage,
    FollowingPage,
    FollowersPage,
    MatchesPage,
    CreateEventPage,
    EventsPage,
    AllEventsTab,
    MyEventsTab,
    SearchPage,
    SearchedProfilePage,
    EditProfilePage,
    EditTeamsPage,
    MyTeamsPage,
    AllTeamsPage,
    SignInPage,
    SignUpPage,
    LocationModal,
    HomePage,
    OwnerHomePage,
    MyBarPage,
    PromotionsPage
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: Maps.apiKey,
      libraries: ["places"]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FeedPage,
    ProfilePage,
    FollowingPage,
    FollowersPage,
    MatchesPage,
    CreateEventPage,
    EventsPage,
    AllEventsTab,
    MyEventsTab,
    SearchPage,
    SearchedProfilePage,
    EditProfilePage,
    EditTeamsPage,
    MyTeamsPage,
    AllTeamsPage,
    SignInPage,
    SignUpPage,
    LocationModal,
    HomePage,
    OwnerHomePage,
    MyBarPage,
    PromotionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    MatchesService,
    EventsService,
    UsersService,
    TeamService,
    BarService,
    OwnerService,
    {provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true}
  ]
})
export class AppModule {}
