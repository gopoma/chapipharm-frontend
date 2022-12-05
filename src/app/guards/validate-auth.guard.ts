import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateAuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(): Observable<boolean> | boolean{
    this.authService.getProducts();
    return this.authService.validateRole("STOREKEEPER")
      .pipe(
        tap((valid) => {
          if(!valid) {
            this.router.navigateByUrl("/");
          }
        })
      );
  }
  canLoad(): Observable<boolean> | boolean {
    this.authService.getProducts();
    return this.authService.validateRole("STOREKEEPER")
      .pipe(
        tap((valid) => {
          if(!valid) {
            this.router.navigateByUrl("/");
          }
        })
      );
  }
}
