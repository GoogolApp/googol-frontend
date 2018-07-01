import { Component } from '@angular/core';
import {AlertController, NavParams, ViewController} from 'ionic-angular';
import { BarService } from "../../../../_services/bar";
import {Bar} from "../../../../_models/bar";

@Component({
    templateUrl: 'add-promotion-modal.html'
  })
  export class AddPromotionModal {

    constructor(
      public params: NavParams,
      public viewCtrl: ViewController,
      private barService: BarService,
      private alertCtrl: AlertController
    ) {}

    promoText = "";
    title = "";
    bar = {};

    ngOnInit(): void {
      let bar:Bar = this.params.get('bar');
      let title:string = this.params.get('title');
      this.bar = bar;
      this.promoText = bar.promo && bar.promo.content || "";
      this.title = title;
    }



    dismiss() {
        this.viewCtrl.dismiss();
    }

    addPromo (bar, promoText) {
      this.barService.editBarPromo(bar, promoText).subscribe(
        res => {
          this.bar = res;
          this.dismiss();
        },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Atenção',
            subTitle: err.error.message,
            buttons: ['Entendido']
          });
          alert.present();
        }
      );
    }

}