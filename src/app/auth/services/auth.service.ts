import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { AddProductComponent } from 'src/app/admin/pages/Products/add-product/add-product.component';
import { Session } from 'src/app/models/session.interface';
import { User } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "https://chapipharm.rj.r.appspot.com/api/auth";
  constructor(private http: HttpClient, private router: Router) {
    console.log('recarga');
  }

  valid: boolean = false;
  user: User = null!;

  showPanelUsers: boolean = false;
  showPanelProducts: boolean = false;

  get Validate() {
    return this.valid;
  }

  login(email:string, password: string){
    return this.http.post<Session>(`${this.url}/login`,{
      email: email,
      password: password
    }, { withCredentials:true })
      .subscribe(resp => {
        this.valid = resp.success;
        this.user = resp.user;
        localStorage.setItem('success', JSON.stringify(resp));
        console.log("Login Correcto");
        this.router.navigate(['/home']);
      }, err => {
        console.log(err);
      });
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
    return this.http.post<any>(`${this.url}/logout`,{},{withCredentials:true})
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
