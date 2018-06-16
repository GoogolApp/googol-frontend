import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { Maps } from '../../../../_config/maps.config';

@Component({
    templateUrl: 'location-modal.html'
  })
  export class LocationModal {

    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;
    public place: any = {
        name: "",
        place_id: "",
        latitude: 0,
        longitude: 0,
        formatted_address: ""
    };

    public styles = Maps.styles;

    @ViewChild("search")
    public searchElementRef;
  
    constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController,
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone
    ) {
      this.zoom = 15;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

      //create search FormControl
      this.searchControl = new FormControl();

      //set current position
      this.setCurrentPosition();
    }


  ionViewDidLoad() {
      //set google maps defaults
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

      //create search FormControl
      this.searchControl = new FormControl();

      //set current position
      this.setCurrentPosition();

      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
          let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
          let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
              types: []
          });
          autocomplete.addListener("place_changed", () => {
              this.ngZone.run(() => {
                  //get the place result
                  let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                  //verify result
                  if (place.geometry === undefined || place.geometry === null) {
                      return;
                  }

                  //set latitude, longitude and zoom
                  this.latitude = place.geometry.location.lat();
                  this.longitude = place.geometry.location.lng();
                  this.zoom = 15;

                  this.place.name = place.name;
                  this.place.place_id = place.place_id;
                  this.place.latitude = place.geometry.location.lat();
                  this.place.longitude = place.geometry.location.lng();
                  this.place.formatted_address = place.formatted_address;
                  
              });
          });
      });
  }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 15;
            });
        }
    }

    dismiss(){
        this.viewCtrl.dismiss(this.place);
    }

  }