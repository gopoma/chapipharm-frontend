import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateAuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService){}

  canActivate(): Observable<boolean> | boolean{
    this.authService.isValid()
    return true;
  }
  canLoad(): Observable<boolean> | boolean {
    console.log("This is canLoad");
    return true;
  }
}
