import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarlistGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router:Router){
}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.validateSession()
      .pipe(
        tap((valid) => {
          if(!valid) {
            this.router.navigateByUrl("/auth/login");
          }
        }),
        map((valid) => valid)
      );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.validateSession()
      .pipe(
        tap((valid) => {
          if(!valid) {
            this.router.navigateByUrl("/auth/login");
          }
        }),
        map((valid) => valid)
      );
  }
}
