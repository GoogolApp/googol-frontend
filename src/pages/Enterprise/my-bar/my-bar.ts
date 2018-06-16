import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController,LoadingController } from 'ionic-angular';
import { OwnerService } from '../../../_services/owner';
import { Owner } from '../../../_models/owner';
import { LocationModal } from '../../Common/location-modal/location-modal';
import { Bar } from '../../../_models/bar';
import { MapsAPILoader } from '@agm/core';
import { Maps } from '../../../_config/maps.config';

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

  pp: any = {}

  constructor(
    public navCtrl: NavController,
    private ownerService: OwnerService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private mapsAPILoader: MapsAPILoader,
  ) {
    this.owner = new Owner();
  }

  async ngOnInit(){
    await this.getData(this.loading());
  }

  async getData(loading){
    let ownerId = JSON.parse(localStorage.getItem('authUser')).ownerId;
    this.ownerId = ownerId;
    this.ownerService.getOne(ownerId).subscribe(
      async owner => {
        this.owner = await owner;
        (owner.bar) ? this.getPlace(loading, owner) : loading.dismiss();
      }
    )
  }

  async getUser(loading){
    let ownerId = JSON.parse(localStorage.getItem('authUser')).ownerId;
    this.ownerId = ownerId;
    this.ownerService.getOne(ownerId).subscribe(
      async owner => {
        this.owner = await owner;
        loading.dismiss();
      }
    )
  }

  async getPlace(loading, owner){
    this.mapsAPILoader.load().then( () => {  
      
      var request = {
        placeId: owner.bar.placeId
      };

      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: owner.bar.location.coordinates[1], lng: owner.bar.location.coordinates[0]},
        zoom: 15
      });
    
      
        let service = new google.maps.places.PlacesService(map);
        service.getDetails(request, callback);
      
       function callback(place, status) {
        
        loading.dismiss();
        this.place = place;
        console.log(JSON.stringify(place.formatted_address));

        if (status == google.maps.places.PlacesServiceStatus.OK) {
          
        }else{
          console.log('DEU RUIM')
        }
      }
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
