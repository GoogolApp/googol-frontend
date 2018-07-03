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
        name: "",
        promo: {
          content:""
        }
      }
    }
  }

  async ngOnInit(){
    await this.getData(this.loading());
  }

  async getData(loading) {
    let ownerId = JSON.parse(localStorage.getItem('authUser')).ownerId;
    await this.ownerService.getOne(ownerId).subscribe(owner => {
      this.owner = owner
    });
    loading.dismiss();
  }

  openAddPromotionModal () {
    const title = 'Adicionar Promoção';
    this._openPromotionModal(title);
  }

  openEditPromotionModal () {
    const title = 'Editar Promoção';
    this._openPromotionModal(title);
  }

  private _openPromotionModal (title) {
    let modal = this.modalCtrl.create(AddPromotionModal, {
      'bar': this.owner.bar,
      'title': title
    });
    modal.onDidDismiss(obj => {
      this.getData(this.loading());
    });
    modal.present();
  }

  getPromoContent () {
    const promo = this.owner.bar.promo;
    return promo ?  promo : "";
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
