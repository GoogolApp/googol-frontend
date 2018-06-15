import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController,LoadingController } from 'ionic-angular';
import { OwnerService } from '../../_services/owner';
import { Owner } from '../../_models/owner';
import { LocationModal } from '../signup/location-modal/location-modal';
import { Bar } from '../../_models/bar';

@Component({
  selector: 'my-bar',
  templateUrl: 'my-bar.html'
})
export class MyBarPage implements OnInit{

  owner: Owner;
  ownerId: string;
  place: any = {
    name: "",
    place_id: "",
    latitude: 0,
    longitude: 0,
    formatted_address: ""
  };

  constructor(
    public navCtrl: NavController,
    private ownerService: OwnerService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.owner = new Owner();
  }

  async ngOnInit(){
    await this.getUser(this.loading());
  }

  async getUser(loading){
    let ownerId = await JSON.parse(localStorage.getItem('authUser')).ownerId;
    this.ownerId = ownerId;
    await this.ownerService.getOne(ownerId).subscribe(
      owner => {
        this.owner = owner;
        loading.dismiss();
      }
    )
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

    this.ownerService.putBar(this.ownerId, bar).subscribe(
      data => {
        this.presentAlert("Bar Clamado com Sucesso!");
        this.getUser(loading);
      },
      error => {
        loading.dismiss();
        this.presentAlert(error.error.message);
      }
    )
  }

  presentAlert(message) {
    let alert = this.alertController.create({
      title: 'Erro',
      subTitle: message,
      buttons: ['Entendido']
    });
    alert.present();
  }

  loading(){
    let loading = this.loadingController.create({
      content: 'Por favor, aguarde...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }

}
