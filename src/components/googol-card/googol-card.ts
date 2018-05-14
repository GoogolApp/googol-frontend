import { Component, Input } from '@angular/core';

@Component({
  selector: 'googol-card',
  templateUrl: 'googol-card.html'
})
export class GoogolCardComponent {

  @Input() match: any;

  constructor() {
    console.log('Hello GoogolCardComponent Component');
  }

}
