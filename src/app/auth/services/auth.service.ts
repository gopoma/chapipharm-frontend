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

  valid: boolean = false;
  user: User = null!;

  showPanelUsers: boolean = false;
  showPanelProducts: boolean = false;

  roles:any = {
    "REGULAR": 1,
    "STOREKEEPER": 25,
    "ADMIN": 125
  };

  get Validate() {
    return this.valid;
  }

  login(email:string, password: string){
    return this.http.post<Session>(`${this.url}/login`, {email: email, password: password}, {withCredentials:true})
      .subscribe(
        (resp:Session) => {
          console.log("pasí")
          this.valid = resp.success;
          this.user = resp.user;
          localStorage.setItem('success', JSON.stringify(resp));
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

  validateSession() {
    const url = `${this.url}/validate`;
    return this.http.get<Session>(url, {withCredentials:true})
      .pipe(
        map(resp => {
          return resp.success;
        }),
        catchError(() => {
          return of(false);
        })
      )
  }

  validateRole(minimumRole:string) {
    const url = `${this.url}/validate`;
    return this.http.get<Session>(url, {withCredentials:true})
      .pipe(
        map((resp:any) => {
          return this.roles[resp.user.role] >= this.roles[minimumRole];
        }),
        catchError(() => {
          return of(false);
        })
      )
  }

  getRole(): boolean[] {
    if(localStorage.getItem('success') !== null){
      let aux:string = JSON.parse( localStorage.getItem('success')! ).user.role;
      if(aux === 'ADMIN'){
        this.showPanelProducts = true;
        this.showPanelUsers = true;
        return [true,true];
      }else if(aux === 'STOREKEEPER'){
        this.showPanelProducts = true;
        this.showPanelUsers = false;
        return [true,false];
      }
    }
    return [false,false];
  }


  isValid() {
    if(localStorage.getItem('success') !== null){
      return true;
    }
    return false;
  }

  logout() {
    return this.http.post<any>(`${this.url}/logout`, {}, {withCredentials:true})
      .subscribe(resp => {
        this.valid = false;
        this.showPanelProducts = false;
        this.showPanelUsers = false;
        this.user = undefined!;
        localStorage.removeItem('success');
        this.router.navigate(['/auth/login']);
      }, error => {
        console.log(error);
      })
  }
}
