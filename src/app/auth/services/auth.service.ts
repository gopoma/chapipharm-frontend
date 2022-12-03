import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "https://chapipharm.rj.r.appspot.com/api/auth";
  constructor(private http: HttpClient) { }

  login(email:string, password: string){
    return this.http.post<any>(`${this.url}/login`,{
      email: email,
      password: password
    }, { withCredentials:true })
  }

  isValid() {
    return this.http.get<any>(`${this.url}/validate`, {withCredentials: true});
  }

  logout() {
    return this.http.post<any>(`${this.url}/logout`,{},{withCredentials:true});
  }
}
