import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { OwnerService } from '../../../_services/owner';

@Component({
  selector: 'my-events-owner',
  templateUrl: 'my-events-owner.html'
})
export class MyEventsOwnerPage implements OnInit{

  owner: any;
  events: any = [];

  constructor(
    public navCtrl: NavController,
    private ownerService: OwnerService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.owner = { bar: {}}
  }

  async ngOnInit(){
    await this.getOwner(this.loading());
  }

  getOwner(loading){
    let id = JSON.parse(localStorage.getItem('authUser')).ownerId;
    this.ownerService.getOne(id).subscribe( owner => {
        loading.dismiss();
        this.owner = owner;
      }
    );
  }

  openAddEvent(){
    this.presentAlert('Aviso!', 'Recurso ainda não implementado');
  }

  loading(){
    let loading = this.loadingController.create({
      content: 'Recuperando eventos, aguarde ...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }

  presentAlert(title, message) {
    let alert = this.alertController.create({
      title: title,
      subTitle: message,
      buttons: ['Entendido']
    });
    alert.present();
  }

}
