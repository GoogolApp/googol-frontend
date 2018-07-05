import { Component, OnInit } from '@angular/core';
import { NavController,LoadingController, AlertController } from 'ionic-angular';
import { OwnerService } from '../../../_services/owner';

@Component({
  selector: 'my-bar',
  templateUrl: 'my-bar.html'
})
export class MyBarPage implements OnInit{

  owner: any;

  constructor(
    public navCtrl: NavController,
    private ownerService: OwnerService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.owner = { bar: { promo: { }}}
  }

  async ngOnInit(){
    await this.getOwner(this.loading());
  }

  getOwner(loading){
    let id = JSON.parse(localStorage.getItem('authUser')).ownerId;
    this.ownerService.getOne(id).subscribe( owner => {
        loading.dismiss();
        this.owner = owner;
        console.log(owner);
      }
    );
  }

  loading(){
    let loading = this.loadingController.create({
      content: 'Por favor, aguarde...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }

  openFollowers(){
    this.presentAlert('Aviso!', 'Recurso ainda não implementado');
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
