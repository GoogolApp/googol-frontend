import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
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
  place: any = {
    name: "",
    place_id: "",
    latitude: 0,
    longitude: 0,
    formatted_address: ""
  };

  constructor(
    public navCtrl: NavController,
    public ownerService: OwnerService,
    public modalCtrl: ModalController
  ) {
    this.owner = new Owner();
  }

  async ngOnInit(){
    let ownerId = await JSON.parse(localStorage.getItem('authUser')).ownerId;
    await this.ownerService.getOne(ownerId).subscribe(
      owner => {
        this.owner = owner;
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

    let bar = new Bar(
      this.place.place_id,
      this.place.name,
      this.place.latitude,
      this.place.longitude
    );

    console.log(bar);
  }

}
