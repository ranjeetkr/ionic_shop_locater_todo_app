import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class LocalSessionManagementService {
  authenticationState = new BehaviorSubject(false);
  constructor(private storage: Storage, private platform: Platform , private authService: AuthenticationService) { }

  isAuthenticated() {
    // return this.authenticationState.value;
    return new Promise( (resolve, reject) => {
      this.checkToken()
      .then( res => {
        resolve(this.authenticationState.value);
      })
      .catch( error => {
        reject(error);
      });
    });
  
  }

  manageToken(loginToken){
    return this.storage.set(TOKEN_KEY, 'Bearer ' + loginToken).then(() => {
      this.authenticationState.next(true);
    });
  }

  checkToken() {
    return new Promise( (resolve, reject) => {
      this.storage.get(TOKEN_KEY)
      .then(res => {
        if (res) {
          this.authenticationState.next(true);
        }
        resolve(res);
      })
      .catch( error => {
        reject(error);
      });
    });
  }

  async logout() {
    await this.authService.logoutUser();
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

}
