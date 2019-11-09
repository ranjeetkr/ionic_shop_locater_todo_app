import { Component } from '@angular/core';
import {  NavController, NavParams } from '@ionic/angular';
import {LocalSessionManagementService} from '../services/local-session-management.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private localSession: LocalSessionManagementService, public navCtrl: NavController,) {}
  async logout(){
    
    this.localSession.logout().then(data=>{
      this.navCtrl.navigateForward('/login');
    });
  }
}
