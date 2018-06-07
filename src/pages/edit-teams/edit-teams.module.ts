import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTeamsPage } from './edit-teams';

@NgModule({
  declarations: [
    EditTeamsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTeamsPage),
  ],
})
export class EditTeamsPageModule {}
