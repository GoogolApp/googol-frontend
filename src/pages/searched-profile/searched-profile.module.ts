import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchedProfilePage } from './searched-profile';

@NgModule({
  declarations: [
    SearchedProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchedProfilePage),
  ],
})
export class SearchedProfilePageModule {}
