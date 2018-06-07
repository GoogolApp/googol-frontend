import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllTeamsPage } from './all-teams';

@NgModule({
  declarations: [
    AllTeamsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllTeamsPage),
  ],
})
export class AllTeamsPageModule {}
