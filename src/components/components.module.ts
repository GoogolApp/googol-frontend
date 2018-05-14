import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProfilePicGeneratorComponent } from './profile-pic-generator/profile-pic-generator';
import { GoogolCardComponent } from './googol-card/googol-card';

@NgModule({
	declarations: [ProfilePicGeneratorComponent,
    GoogolCardComponent],
	imports: [IonicModule],
	exports: [ProfilePicGeneratorComponent,
    GoogolCardComponent]
})
export class ComponentsModule {}
