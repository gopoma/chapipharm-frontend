import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  canActivate(): Observable<boolean> | boolean {
    console.log("This is authGuard");
    return true;
  }
  canLoad(): Observable<boolean> | boolean {
    console.log("This is authGuard");
    return true;
  }
}
