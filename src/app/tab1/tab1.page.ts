import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {AuthenticationService} from '../services/authentication.service';
import {LocalSessionManagementService} from '../services/local-session-management.service';
import {CustomTosterService} from '../services/custom-toster.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  shopsList = [];
  constructor(private authService:AuthenticationService, 
              private localSession:LocalSessionManagementService,
              private router: Router,
              private toster:CustomTosterService) {
    this.localSession.checkToken();
    // this.getListOfShops();
  }

  getListOfShops(){
    this.authService.listShops().then(data=>{
      if(data){
        this.shopsList = data.map(e => {
          return {
            id: e.payload.doc.id,
            isEdit: false,
            name: e.payload.doc.data()['name'],
            address: e.payload.doc.data()['address'],
            image: e.payload.doc.data()['image']
          };
        });
      }
    });
  }

  ionViewWillEnter(){
    this.getListOfShops();
  }

  RemoveRecord(id:any){
    this.authService.deleteShop(id).then(data=>{
      this.getListOfShops();
      this.toster.presentToast('success',"Record has been deleted");
    },error=>{
      this.toster.presentToast('danger',"Something went wrong, Please try again later");
    })
  }

  EditRecord(id:any){
    this.router.navigateByUrl('/tabs/tab2/'+id);
  }
  
  goToAdd(){
    this.router.navigateByUrl('/tabs/tab2');
  }
}
