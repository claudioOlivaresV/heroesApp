import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements  CanLoad, CanActivate {

  constructor(private authServices:AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

       if (this.authServices.auth.id) {
        return true;
      }
    return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> |  Promise<boolean> |  boolean {
      console.log(route);
      console.log(segments);
      if (this.authServices.auth.id) {
        return true;
      }
    return false;
  }
}
