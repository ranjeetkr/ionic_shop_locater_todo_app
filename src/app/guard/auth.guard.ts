import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LocalSessionManagementService} from "../services/local-session-management.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{
  constructor(public localSession: LocalSessionManagementService, public router: Router) {}
 
  // canActivate(): boolean {
  //   return this.localSession.isAuthenticated();
  // }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise( (resolve, reject) => {
      this.localSession.isAuthenticated()
      .then( isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['login']);
        }
        resolve(true);
      })
      .catch( error => {
        return (false);
      });
    });
  }

}
