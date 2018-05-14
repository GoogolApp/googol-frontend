import { Component, Input } from '@angular/core';

@Component({
  selector: 'googol-card',
  templateUrl: 'googol-card.html'
})
/**
 * Action types
 * ADD_EVENT
 * CONFIRM_PRESENCE
 * NONE
 */
export class GoogolCardComponent {

  @Input() match: any;
  @Input() action: string;

  currentDate = new Date();

  constructor() {
    console.log('Hello GoogolCardComponent Component');
  }
}
