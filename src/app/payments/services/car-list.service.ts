import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarListService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  baseUrl:string = "https://chapipharm.rj.r.appspot.com/api/cart";

  addItem(idProduct:string, amount:number) {
    return this.httpClient.post<any>(`${this.baseUrl}/add`,{
      idProduct,
      amount
    }, {withCredentials: true});
  }

  removeItem(idProduct:string) {
    return this.httpClient.delete<any>(`${this.baseUrl}/remove`);
  }

  getItems() {
    return this.httpClient.get<any>(`${this.baseUrl}`, {withCredentials: true});
  }

}
