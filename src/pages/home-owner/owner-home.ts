import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Owner } from '../../_models/owner';
import { OwnerService } from '../../_services/owner';

@Component({
  selector: 'owner-home',
  templateUrl: 'owner-home.html'
})
export class OwnerHomePage implements OnInit{

  owner: Owner = new Owner();

  constructor(
    public navCtrl: NavController,
    public ownerService: OwnerService
  ) { }

  async ngOnInit(){
    let id = await JSON.parse(localStorage.getItem('authUser')).ownerId;
    this.ownerService.getOne(id).subscribe(
      owner => {
        this.owner = owner;
      },
      err => {
        console.log(err);
      }
    )
  }
}
