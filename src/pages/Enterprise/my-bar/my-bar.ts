import { Component, OnInit } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
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
    private loadingController: LoadingController
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

  loading(){
    let loading = this.loadingController.create({
      content: 'Por favor, aguarde...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }

}
