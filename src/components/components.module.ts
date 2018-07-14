import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProfilePicGeneratorComponent } from './profile-pic-generator/profile-pic-generator';
import { GoogolCardComponent } from './googol-card/googol-card';
import { BarEventsCardComponent } from '../pages/Enterprise/bar-events/bar-events-card/bar-events-card'

@NgModule({
	declarations: [
	  ProfilePicGeneratorComponent,
    GoogolCardComponent,
    BarEventsCardComponent
  ],
	imports: [IonicModule],
	exports: [
	  ProfilePicGeneratorComponent,
    GoogolCardComponent,
    BarEventsCardComponent
  ]
})
export class ComponentsModule {}
