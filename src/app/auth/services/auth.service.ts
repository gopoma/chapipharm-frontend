import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { AddProductComponent } from 'src/app/admin/pages/Products/add-product/add-product.component';
import { Session } from 'src/app/models/session.interface';
import { User } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = "https://chapipharm.rj.r.appspot.com/api/auth";
  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn: boolean = false;
  user: User = null!;
  role: string = null!;
  roles:any = {
    "REGULAR": 1,
    "STOREKEEPER": 25,
    "ADMIN": 125
  };

  login(email:string, password: string){
    return this.http.post<Session>(`${this.url}/login`, {email: email, password: password}, {withCredentials:true})
      .subscribe(
        (resp:Session) => {
          this.isLoggedIn = resp.success;
          this.user = resp.user;
          this.role = resp.user.role!;
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  register(firstName:string, lastName:string, email:string ,password: string) {
    return this.http.post<any>(`${this.url}/signup`,{firstName,lastName,email,password},{withCredentials: true});
  }

  // refrescar el usuario
  validateSession() {
    const url = `${this.url}/validate`;
    return this.http.get<Session>(url, {withCredentials:true})
      .pipe(
        map(resp => {
          this.isLoggedIn = resp.success;
          this.user = resp.user;
          this.role = resp.user.role!;
          return resp.success;
        }),
        catchError(() => {
          return of(false);
        })
      )
  }

  // refrescar el usuario
  validateRole(minimumRole:string) {
    const url = `${this.url}/validate`;
    return this.http.get<Session>(url, {withCredentials:true})
      .pipe(
        map((resp:any) => {
          this.isLoggedIn = resp.success;
          this.user = resp.user;
          this.role = resp.user.role!;
          return this.roles[resp.user.role] >= this.roles[minimumRole];
        }),
        catchError(() => {
          return of(false);
        })
      )
  }

  hasMinimumRole(minimumRole: string): boolean {
    if(!this.role) {
      return false;
    }
    return this.roles[this.role] >= this.roles[minimumRole];
  }

  isValid() {
    return this.isLoggedIn;
  }

  logout() {
    return this.http.post<any>(`${this.url}/logout`, {}, {withCredentials:true})
      .subscribe(resp => {
        this.isLoggedIn = false;
        this.user = undefined!;
        this.role = null!;
        this.router.navigate(['/auth/login']);
      }, error => {
        console.log(error);
      })
  }
}
