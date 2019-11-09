import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;
@Component({
  selector: 'app-shop-map',
  templateUrl: './shop-map.page.html',
  styleUrls: ['./shop-map.page.scss'],
})
export class ShopMapPage implements OnInit { 

  map:any;
  shopsList = [];

  geocoder:any;
  markers:any;
  selfLatitude=22.572645;
  selfLongitude=88.363892;

  constructor(private authService:AuthenticationService,
    private geolocation: Geolocation
    ) { 
    this.geocoder = new google.maps.Geocoder;
    this.markers = [];
  }

  ngOnInit() {
  }

  getListOfShops(){
    this.authService.listShops().then(data=>{
      if(data){
       var gSizeIns= new google.maps.Size(30, 20);
        data.map(e => {
          let marker = new google.maps.Marker({
            position: {
                      lat: e.payload.doc.data()['lat'],
                      lng:e.payload.doc.data()['lng']
                    },
            map: this.map,
            title:e.payload.doc.data()['name'],
            icon:{url:e.payload.doc.data()['image'],scaledSize:gSizeIns}
          });
          this.markers.push(marker);
          this.map.setCenter({ lat:this.selfLongitude,
            lng:this.selfLongitude});

        });
      }
    });
  }
  
  getSelfLocationDetail(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.selfLatitude= resp.coords.latitude;
      this.selfLongitude = resp.coords.longitude;
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  
  async ionViewDidEnter(){
   await this.getSelfLocationDetail();
    //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: this.selfLatitude, lng: this.selfLongitude },
      zoom: 15
    });

    this.getListOfShops();
  }

}
