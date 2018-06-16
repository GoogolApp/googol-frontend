//Modules
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AgmCoreModule } from '@agm/core';
import { ComponentsModule } from '../components/components.module';

//Providers
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../_services/auth';
import { MatchesService } from '../_services/matches';
import { EventsService } from '../_services/events';
import { UsersService } from '../_services/users';
import { Maps } from '../_config/maps.config';
import { BarService } from '../_services/bar';
import { OwnerService } from '../_services/owner';
import {TokenInterceptor} from "../_providers/auth.interceptor";
import { TeamService } from '../_services/team';

//App
import { MyApp } from './app.component';

//User
import { HomePage } from '../pages/User/home/home';
import { FeedPage } from '../pages/User/feed/feed';
import { ProfilePage } from '../pages/User/profile/profile';
import { MatchesPage } from '../pages/User/matches/matches';
import { CreateEventPage } from '../pages/User/matches/create-event/create-event';
import { EventsPage } from '../pages/User/events/events';
import { AllEventsTab } from '../pages/User/events/all-events/all-events';
import { MyEventsTab } from '../pages/User/events/my-events/my-events';
import { SearchPage } from '../pages/User/search/search';
import { SearchedProfilePage } from '../pages/User/searched-profile/searched-profile';
import { EditProfilePage } from '../pages/User/edit-profile/edit-profile';
import { EditTeamsPage } from '../pages/User/edit-teams/edit-teams';
import { MyTeamsPage } from '../pages/User/edit-teams/my-teams/my-teams';
import { AllTeamsPage } from '../pages/User/edit-teams/all-teams/all-teams';
import { FollowingPage } from '../pages/User/following/following';
import { FollowersPage } from '../pages/User/followers/followers';

//Enterprise
import { OwnerHomePage } from '../pages/Enterprise/home-owner/owner-home';
import { MyBarPage } from '../pages/Enterprise/my-bar/my-bar';
import { PromotionsPage } from '../pages/Enterprise/promotions/promotions';

//Public
import { SignInPage } from '../pages/Public/signin/signin';
import { SignUpPage } from '../pages/Public/signup/signup';
import { LocationModal } from '../pages/Public/signup/location-modal/location-modal'; 

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
