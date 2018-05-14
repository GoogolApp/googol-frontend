import { Component } from '@angular/core';

/**
 * Generated class for the GoogolCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'googol-card',
  templateUrl: 'googol-card.html'
})
export class GoogolCardComponent {

  text: string;

  constructor() {
    console.log('Hello GoogolCardComponent Component');
    this.text = 'Hello World';
  }

}
