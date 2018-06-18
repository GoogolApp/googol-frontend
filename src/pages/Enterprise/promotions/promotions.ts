import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { AddPromotionModal } from './add-promotion-modal/add-promotion-modal';
import { OwnerService } from '../../../_services/owner';

@Component({
  selector: 'page-promotions',
  templateUrl: 'promotions.html'
})
export class PromotionsPage implements OnInit{

  owner: any;

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private ownerService: OwnerService,
    private loadingCtrl: LoadingController
  ) {
    this.owner = {
      bar:{
        name: ""
      }
    }
  }

  async ngOnInit(){
    await this.getData(this.loading());
  }

  async getData(loading){
    let ownerId = JSON.parse(localStorage.getItem('authUser')).ownerId;
    this.ownerService.getOne(ownerId).subscribe(async owner => {
      this.owner = await owner;
      loading.dismiss();
    })
  }


  openAddPromotionModal(){
    let modal = this.modalCtrl.create(AddPromotionModal);
    modal.onDidDismiss(obj => {
      console.log("dismissed");
    })
    modal.present();
  }

  loading(){
    let loading = this.loadingCtrl.create({
      content: 'Por favor, aguarde...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }
}
