import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router:Router){}

  canActivate(): Observable<boolean> | boolean {
    let aux: string = '';
    let bool: boolean = false;
    if( localStorage.getItem('success') ){
      aux = JSON.parse(localStorage.getItem('success')!).user.role;
      console.log(aux);
      if(aux === 'ADMIN'){
        bool = true;
      }else{
        this.router.navigate(['/']);
      }
    }else{
      this.router.navigate(['/auth/login']);
    }
    return bool;
  }
  canLoad(): Observable<boolean> | boolean {
    let aux: string = '';
    let bool: boolean = false;
    if( localStorage.getItem('success') ){
      aux = JSON.parse(localStorage.getItem('success')!).user.role;
      console.log(aux);
      if(aux === 'ADMIN'){
        bool = true;
      }else{
        this.router.navigate(['/']);
      }
    }else{
      this.router.navigate(['/auth/login']);
    }
    return bool;
  }
}
