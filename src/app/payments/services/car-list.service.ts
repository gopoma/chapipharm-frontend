import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarListService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  baseUrl:string = "https://chapipharm.rj.r.appspot.com/api";

  addItem(idProduct:string, amount:number) {
    return this.httpClient.post<any>(`${this.baseUrl}/cart/add`,{
      idProduct,
      amount
    }, {withCredentials: true});
  }

  removeItem(idProduct:string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {
        idProduct
      },
      withCredentials: true
    }
    return this.httpClient.delete<any>(`${this.baseUrl}/cart/remove`,httpOptions);
  }

  getItems() {
    return this.httpClient.get<any>(`${this.baseUrl}/cart`, {withCredentials: true});
  }


  getClientSecret() {
    return this.httpClient.post<any>(`${this.baseUrl}/payments/createStripeIntent`,{}, {withCredentials: true});
  }

}
