import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
    templateUrl: 'add-promotion-modal.html'
  })
  export class AddPromotionModal {
  
    constructor(
      public params: NavParams,
      public viewCtrl: ViewController,
    ) {}

    dismiss(){
        this.viewCtrl.dismiss();
    }

}