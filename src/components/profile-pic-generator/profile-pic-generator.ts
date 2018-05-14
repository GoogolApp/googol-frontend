import { Component, Input } from '@angular/core';

/**
 * Generated class for the ProfilePicGeneratorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-pic-generator',
  templateUrl: 'profile-pic-generator.html'
})
export class ProfilePicGeneratorComponent {
  
  @Input() word: string;
  @Input() color: string;

  constructor() {}

}
