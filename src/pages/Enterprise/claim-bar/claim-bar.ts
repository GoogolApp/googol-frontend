import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController, AlertController, Events } from 'ionic-angular';
import { OwnerService } from '../../../_services/owner';
import { LocationModal } from '../../Common/location-modal/location-modal';
import { Bar } from '../../../_models/bar';

@Component({
  selector: 'page-claim-bar',
  templateUrl: 'claim-bar.html'
})
export class ClaimBarPage implements OnInit{

  owner: any;
  place: any;

  constructor(
    public navCtrl: NavController,
    public events: Events,
    private ownerService: OwnerService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {
    this.owner = { bar: { } };
    this.initPlace();
  }

  initPlace(){
    this.place = { name: "" };
  }

  async ngOnInit(){
    await this.getOwner(this.loading());
  }

  getOwner(loading){
    let id = JSON.parse(localStorage.getItem('authUser')).ownerId;
    this.ownerService.getOne(id).subscribe(owner => {
      loading.dismiss();
      this.owner = owner;
    })
  }

  addLocationModal(){
    let modal = this.modalCtrl.create(LocationModal);
    modal.onDidDismiss(place => {
      this.place = place;
    })
    modal.present();
  }

  associateBar(){

    let loading = this.loading();

    let bar = new Bar(
      this.place.place_id,
      this.place.name,
      this.place.latitude,
      this.place.longitude
    );

    this.ownerService.putBar(this.owner._id, bar).subscribe(
      data => {
        this.presentAlert("Pronto!", "Bar reivindicado com sucesso.");
        this.events.publish("owner:hasBar");
        loading.dismiss();
      },
      error => {
        loading.dismiss();
        this.presentAlert("Erro!", error.error.message);
      }
    )
  }

  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Entendido']
    });
    alert.present();
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
