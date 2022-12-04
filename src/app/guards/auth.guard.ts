import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router:Router){

  }

  canActivate(): Observable<boolean> | boolean {
    let aux: boolean = true;
    if(localStorage.getItem('success')){
      aux = false;
      this.router.navigateByUrl('/home');
    }else {
      aux = true;
    }
    return aux;
  }
  canLoad(): Observable<boolean> | boolean {
    let aux: boolean = true;
    if(localStorage.getItem('success')){
      aux = false;
      this.router.navigate(['']);
    }else {
      aux = true;
    }
    return aux;
  }
}
