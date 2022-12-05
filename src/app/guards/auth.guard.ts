import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router:Router){
  }

  canActivate(): Observable<boolean> | boolean {
    return this.authService.validateSession()
      .pipe(
        tap((valid) => {
          if(valid) {
            this.router.navigateByUrl("/home");
          }
        }),
        map((valid) => !valid)
      );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.validateSession()
      .pipe(
        tap((valid) => {
          if(valid) {
            this.router.navigateByUrl("/home");
          }
        }),
        map((valid) => !valid)
      );
  }
}
